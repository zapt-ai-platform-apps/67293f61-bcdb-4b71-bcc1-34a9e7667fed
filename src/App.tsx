import { useState, useEffect } from 'react';
import * as Sentry from '@sentry/browser';
import { 
  Expense, 
  createExpense, 
  calculateTotalExpenses, 
  calculateAverageExpense 
} from './models/Expense';
import { connectCard } from './services/cardService';
import ExpenseEntryScreen from './screens/ExpenseEntryScreen';

const App = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isConnectingCard, setIsConnectingCard] = useState<boolean>(false);
  const [isCardConnected, setIsCardConnected] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    console.log('Finance Tracker rendered');
  }, []);

  const handleConnectCard = async () => {
    if (isConnectingCard || isCardConnected) return;
    
    setIsConnectingCard(true);
    
    try {
      await connectCard(
        // Success callback
        () => {
          setIsCardConnected(true);
        },
        // Error callback
        (error) => {
          Sentry.captureException(error);
          console.error('Error connecting card:', error);
        }
      );
    } finally {
      setIsConnectingCard(false);
    }
  };

  const handleAddExpense = async (description: string, amount: string) => {
    if (isSubmitting) return false;
    setIsSubmitting(true);
    
    try {
      const newExpense = createExpense(description, amount);
      setExpenses([...expenses, newExpense]);
      console.log('Expense added:', newExpense);
      return true;
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error adding expense:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalExpenses = calculateTotalExpenses(expenses);
  const averageExpense = calculateAverageExpense(expenses);

  return (
    <ExpenseEntryScreen
      expenses={expenses}
      totalExpenses={totalExpenses}
      averageExpense={averageExpense}
      isConnectingCard={isConnectingCard}
      isCardConnected={isCardConnected}
      isSubmitting={isSubmitting}
      onConnectCard={handleConnectCard}
      onAddExpense={handleAddExpense}
    />
  );
};

export default App;