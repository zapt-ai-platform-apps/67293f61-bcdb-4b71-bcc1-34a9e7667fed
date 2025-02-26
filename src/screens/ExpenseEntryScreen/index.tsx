import { useState } from 'react';
import { Expense } from '../../models/Expense';
import LeftColumn from './components/LeftColumn';
import RightColumn from './components/RightColumn';

interface ExpenseEntryScreenProps {
  expenses: Expense[];
  totalExpenses: number;
  averageExpense: number;
  isConnectingCard: boolean;
  isCardConnected: boolean;
  isSubmitting: boolean;
  onConnectCard: () => void;
  onAddExpense: (description: string, amount: string) => Promise<boolean>;
}

const ExpenseEntryScreen = ({
  expenses,
  totalExpenses,
  averageExpense,
  isConnectingCard,
  isCardConnected,
  isSubmitting,
  onConnectCard,
  onAddExpense
}: ExpenseEntryScreenProps) => {
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const handleAddExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const success = await onAddExpense(description, amount);
      if (success) {
        setDescription('');
        setAmount('');
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
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
          handleConnectCard={onConnectCard}
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

export default ExpenseEntryScreen;