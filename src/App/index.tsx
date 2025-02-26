import { useState, useEffect } from 'react';
import * as Sentry from '@sentry/browser';
import './index.css';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

const App = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [isConnectingCard, setIsConnectingCard] = useState<boolean>(false);
  const [isCardConnected, setIsCardConnected] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    console.log('Finance Tracker rendered');
  }, []);

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;

  const handleConnectCard = () => {
    if (isConnectingCard || isCardConnected) return;
    
    setIsConnectingCard(true);
    console.log('Connecting card...');
    setTimeout(() => {
      try {
        setIsConnectingCard(false);
        setIsCardConnected(true);
        console.log('Card connected successfully');
      } catch (error) {
        Sentry.captureException(error);
        console.error('Error connecting card:', error);
        setIsConnectingCard(false);
      }
    }, 2000);
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      if (!description || !amount) {
        throw new Error('Description and amount are required');
      }
      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount)) {
        throw new Error('Amount must be a valid number');
      }
      const newExpense: Expense = {
        id: Date.now().toString(),
        description,
        amount: numericAmount,
        date: new Date(),
      };
      setExpenses([...expenses, newExpense]);
      setDescription('');
      setAmount('');
      console.log('Expense added:', newExpense);
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error adding expense:', error);
      alert(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-900 via-purple-800 to-purple-900 text-white">
      <header className="w-full py-8 text-center">
        <h1 className="text-5xl font-bold mb-2">Finance Tracker</h1>
        <p className="text-xl">Track every penny, control your finances</p>
      </header>

      <div className="container mx-auto px-4 pb-12 flex flex-col md:flex-row gap-8">
        <LeftColumn 
          description={description}
          setDescription={setDescription}
          amount={amount}
          setAmount={setAmount}
          isSubmitting={isSubmitting}
          handleAddExpense={handleAddExpense}
          isConnectingCard={isConnectingCard}
          isCardConnected={isCardConnected}
          handleConnectCard={handleConnectCard}
        />
        <RightColumn 
          expenses={expenses}
          totalExpenses={totalExpenses}
          averageExpense={averageExpense}
        />
      </div>

      <a 
        href="https://www.zapt.ai" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center space-x-1 hover:bg-gray-900 transition-colors"
      >
        <span>Made on</span>
        <span className="font-bold">ZAPT</span>
      </a>
    </div>
  );
};

export default App;