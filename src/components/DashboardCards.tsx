
import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Transaction } from '../data/mockDatabase';

interface DashboardCardsProps {
  transactions: Transaction[];
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ transactions }) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpenses;

  const cards = [
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Expenses',
      amount: totalExpenses,
      icon: TrendingDown,
      color: 'from-red-500 to-rose-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Net Profit',
      amount: netProfit,
      icon: DollarSign,
      color: netProfit >= 0 ? 'from-blue-500 to-cyan-500' : 'from-orange-500 to-yellow-500',
      textColor: netProfit >= 0 ? 'text-blue-600' : 'text-orange-600',
      bgColor: netProfit >= 0 ? 'bg-blue-50' : 'bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={card.title}
          className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <card.icon className={`w-6 h-6 ${card.textColor}`} />
              </div>
              <div className={`h-1 w-12 bg-gradient-to-r ${card.color} rounded-full opacity-60`} />
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">{card.title}</h3>
            <p className={`text-3xl font-bold ${card.textColor} group-hover:scale-105 transition-transform duration-200`}>
              ${card.amount.toLocaleString()}
            </p>
          </div>
          <div className={`h-1 bg-gradient-to-r ${card.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
