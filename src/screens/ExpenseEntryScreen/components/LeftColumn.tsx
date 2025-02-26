import React from 'react';

interface LeftColumnProps {
  description: string;
  setDescription: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
  isSubmitting: boolean;
  handleAddExpense: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isConnectingCard: boolean;
  isCardConnected: boolean;
  handleConnectCard: () => void;
}

const LeftColumn = ({
  description,
  setDescription,
  amount,
  setAmount,
  isSubmitting,
  handleAddExpense,
  isConnectingCard,
  isCardConnected,
  handleConnectCard
}: LeftColumnProps) => {
  return (
    <div className="flex-1 flex flex-col items-start">
      <form onSubmit={handleAddExpense} className="w-full space-y-4">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded text-black"
        />
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 rounded text-black"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-blue-600 rounded hover:bg-blue-700"
        >
          Add Expense
        </button>
      </form>
      <button
        onClick={handleConnectCard}
        disabled={isConnectingCard || isCardConnected}
        className="mt-4 w-full py-2 px-4 bg-green-600 rounded hover:bg-green-700"
      >
        {isCardConnected ? 'Card Connected' : 'Connect Card'}
      </button>
    </div>
  );
};

export default LeftColumn;