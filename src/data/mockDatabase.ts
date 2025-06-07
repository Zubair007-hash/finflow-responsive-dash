
export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
}

export const mockDatabase = {
  transactions: [
    {
      id: '1',
      date: '2024-06-01',
      description: 'Salary Payment',
      category: 'Salary',
      type: 'income' as const,
      amount: 5000
    },
    {
      id: '2',
      date: '2024-06-02',
      description: 'Grocery Shopping',
      category: 'Food',
      type: 'expense' as const,
      amount: 250
    },
    {
      id: '3',
      date: '2024-06-03',
      description: 'Freelance Project',
      category: 'Freelance',
      type: 'income' as const,
      amount: 1200
    },
    {
      id: '4',
      date: '2024-06-04',
      description: 'Rent Payment',
      category: 'Housing',
      type: 'expense' as const,
      amount: 1200
    },
    {
      id: '5',
      date: '2024-06-05',
      description: 'Utility Bills',
      category: 'Utilities',
      type: 'expense' as const,
      amount: 300
    },
    {
      id: '6',
      date: '2024-06-06',
      description: 'Investment Dividend',
      category: 'Investment',
      type: 'income' as const,
      amount: 450
    },
    {
      id: '7',
      date: '2024-06-07',
      description: 'Transportation',
      category: 'Transport',
      type: 'expense' as const,
      amount: 120
    }
  ]
};
