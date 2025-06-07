
import React from 'react';
import { Transaction } from '../data/mockDatabase';

interface PrintableStatementProps {
  transactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
}

const PrintableStatement: React.FC<PrintableStatementProps> = ({
  transactions,
  totalIncome,
  totalExpenses,
  netProfit
}) => {
  return (
    <div className="print:block hidden">
      <div className="max-w-4xl mx-auto p-8 bg-white">
        {/* Header */}
        <div className="text-center mb-8 border-b-2 border-gray-300 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Transaction Statement</h1>
          <p className="text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-6 mb-8 text-center">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-600 mb-2">Total Income</h3>
            <p className="text-2xl font-bold">${totalIncome.toLocaleString()}</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-600 mb-2">Total Expenses</h3>
            <p className="text-2xl font-bold">${totalExpenses.toLocaleString()}</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className={`text-lg font-semibold mb-2 ${netProfit >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
              Net Profit
            </h3>
            <p className="text-2xl font-bold">${netProfit.toLocaleString()}</p>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction Details</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.category}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 capitalize">
                    {transaction.type}
                  </td>
                  <td className={`border border-gray-300 px-4 py-2 text-right font-medium ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm border-t pt-4">
          <p>This statement contains {transactions.length} transactions</p>
        </div>
      </div>
    </div>
  );
};

export default PrintableStatement;
