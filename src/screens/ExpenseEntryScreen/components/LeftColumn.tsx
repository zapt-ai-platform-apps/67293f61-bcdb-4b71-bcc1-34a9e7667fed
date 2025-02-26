import React from 'react';
import { CardConnectionSection, ExpenseForm } from './LeftColumn';

export interface LeftColumnProps {
  description: string;
  setDescription: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
  isSubmitting: boolean;
  handleAddExpense: (e: React.FormEvent) => void;
  isConnectingCard: boolean;
  isCardConnected: boolean;
  handleConnectCard: () => void;
}

function LeftColumn({
  description,
  setDescription,
  amount,
  setAmount,
  isSubmitting,
  handleAddExpense,
  isConnectingCard,
  isCardConnected,
  handleConnectCard
}: LeftColumnProps) {
  return (
    <div className="w-full md:w-1/2 flex flex-col gap-8">
      <CardConnectionSection 
        isConnectingCard={isConnectingCard}
        isCardConnected={isCardConnected}
        handleConnectCard={handleConnectCard}
      />
      <ExpenseForm 
        description={description}
        setDescription={setDescription}
        amount={amount}
        setAmount={setAmount}
        isSubmitting={isSubmitting}
        handleAddExpense={handleAddExpense}
      />
    </div>
  );
}

export default LeftColumn;