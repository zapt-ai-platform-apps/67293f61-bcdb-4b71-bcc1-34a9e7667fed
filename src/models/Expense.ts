/**
 * Represents an expense entry in the finance tracker
 * @typedef {Object} Expense
 * @property {string} id - Unique identifier for the expense
 * @property {string} description - Description of what the expense was for
 * @property {number} amount - Amount spent in dollars
 * @property {Date} date - When the expense was recorded
 */
export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

/**
 * Validates expense data before creation
 * @param description - Description of the expense
 * @param amount - Amount as a string
 * @returns An object with validation result and optional error message
 */
export function validateExpenseData(description: string, amount: string): { isValid: boolean; errorMessage?: string } {
  if (!description) {
    return { isValid: false, errorMessage: 'Description is required' };
  }
  
  if (!amount) {
    return { isValid: false, errorMessage: 'Amount is required' };
  }
  
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) {
    return { isValid: false, errorMessage: 'Amount must be a valid number' };
  }
  
  if (numericAmount <= 0) {
    return { isValid: false, errorMessage: 'Amount must be greater than zero' };
  }
  
  return { isValid: true };
}

/**
 * Creates a new expense with validation
 * @param description - Description of the expense
 * @param amount - Amount as a string (will be converted to number)
 * @returns A new Expense object
 * @throws Error if validation fails
 */
export function createExpense(description: string, amount: string): Expense {
  const validation = validateExpenseData(description, amount);
  
  if (!validation.isValid) {
    throw new Error(validation.errorMessage);
  }
  
  return {
    id: Date.now().toString(),
    description,
    amount: parseFloat(amount),
    date: new Date(),
  };
}

/**
 * Calculates the total amount of all expenses
 * @param expenses - Array of expenses
 * @returns Total amount
 */
export function calculateTotalExpenses(expenses: Expense[]): number {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

/**
 * Calculates the average expense amount
 * @param expenses - Array of expenses
 * @returns Average amount or 0 if no expenses
 */
export function calculateAverageExpense(expenses: Expense[]): number {
  return expenses.length > 0 ? calculateTotalExpenses(expenses) / expenses.length : 0;
}