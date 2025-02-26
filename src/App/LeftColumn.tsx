import React from 'react';

interface LeftColumnProps {
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

const LeftColumn: React.FC<LeftColumnProps> = ({
  description,
  setDescription,
  amount,
  setAmount,
  isSubmitting,
  handleAddExpense,
  isConnectingCard,
  isCardConnected,
  handleConnectCard
}) => {
  return (
    <div className="w-full md:w-1/2 flex flex-col gap-8">
      <section className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Connect Your Card</h2>
        <p className="mb-4">Link your card to automatically import transactions</p>
        <button 
          onClick={handleConnectCard}
          disabled={isConnectingCard || isCardConnected}
          className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg font-medium shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isConnectingCard ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Connecting...
            </>
          ) : isCardConnected ? (
            'Card Connected ✓'
          ) : (
            'Connect Card'
          )}
        </button>
      </section>

      <section className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Record Expense</h2>
        <form onSubmit={handleAddExpense} className="flex flex-col gap-4">
          <div>
            <label htmlFor="description" className="block mb-1">Description</label>
            <input 
              type="text" 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="box-border w-full p-3 rounded-lg bg-white/20 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              placeholder="What did you spend on?"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block mb-1">Amount ($)</label>
            <input 
              type="number" 
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="box-border w-full p-3 rounded-lg bg-white/20 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 rounded-lg font-medium shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 inline-block"></div>
                Adding...
              </>
            ) : 'Add Expense'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default LeftColumn;