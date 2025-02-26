import React from 'react';
import { Expense } from './index';

interface RightColumnProps {
  expenses: Expense[];
  totalExpenses: number;
  averageExpense: number;
}

const RightColumn: React.FC<RightColumnProps> = ({ expenses, totalExpenses, averageExpense }) => {
  return (
    <section className="w-full md:w-1/2 bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Financial Analytics</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/10 p-4 rounded-lg">
          <p className="text-sm opacity-80">Total Expenses</p>
          <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-white/10 p-4 rounded-lg">
          <p className="text-sm opacity-80">Average Expense</p>
          <p className="text-2xl font-bold">${averageExpense.toFixed(2)}</p>
        </div>
        <div className="bg-white/10 p-4 rounded-lg">
          <p className="text-sm opacity-80">Number of Entries</p>
          <p className="text-2xl font-bold">{expenses.length}</p>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-3">Expense History</h3>
      <div className="overflow-y-auto max-h-96">
        {expenses.length > 0 ? (
          <ul className="space-y-3">
            {expenses.map((expense) => (
              <li key={expense.id} className="bg-white/10 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">{expense.description}</p>
                  <p className="text-sm opacity-80">
                    {expense.date.toLocaleDateString()} · {expense.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <p className="font-bold">${expense.amount.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center p-6 opacity-70">
            <p>No expenses recorded yet</p>
            <p className="text-sm mt-1">Start tracking your spending by adding an expense</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RightColumn;