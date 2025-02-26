import React from 'react';

interface ExpenseFormProps {
  description: string;
  setDescription: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
  isSubmitting: boolean;
  handleAddExpense: (e: React.FormEvent) => void;
}

const ExpenseForm = ({
  description,
  setDescription,
  amount,
  setAmount,
  isSubmitting,
  handleAddExpense
}: ExpenseFormProps) => {
  return (
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
  );
};

export default ExpenseForm;