
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardCards from '../components/DashboardCards';
import TransactionTable from '../components/TransactionTable';
import Charts from '../components/Charts';
import TransactionModal from '../components/TransactionModal';
import { mockDatabase, Transaction } from '../data/mockDatabase';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>(mockDatabase.transactions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDeleteTransaction = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleSaveTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    if (editingTransaction) {
      // Update existing transaction
      setTransactions(prev => prev.map(t => 
        t.id === editingTransaction.id 
          ? { ...transactionData, id: editingTransaction.id }
          : t
      ));
    } else {
      // Add new transaction
      const newTransaction: Transaction = {
        ...transactionData,
        id: Date.now().toString()
      };
      setTransactions(prev => [newTransaction, ...prev]);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <DashboardCards transactions={transactions} />
            <Charts transactions={transactions} />
            <TransactionTable
              transactions={transactions.slice(0, 10)} // Show only recent 10
              onAddTransaction={handleAddTransaction}
              onEditTransaction={handleEditTransaction}
              onDeleteTransaction={handleDeleteTransaction}
            />
          </div>
        );
      case 'transactions':
        return (
          <TransactionTable
            transactions={transactions}
            onAddTransaction={handleAddTransaction}
            onEditTransaction={handleEditTransaction}
            onDeleteTransaction={handleDeleteTransaction}
          />
        );
      case 'reports':
        return (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reports</h2>
            <p className="text-gray-600">Financial reports will be available here.</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Analytics</h2>
            <Charts transactions={transactions} />
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Settings</h2>
            <p className="text-gray-600">Application settings will be available here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      
      <div className="lg:ml-64 transition-all duration-300">
        <div className="p-6 lg:p-8">
          <div className="mb-8 pt-16 lg:pt-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h1>
            <p className="text-gray-600">
              {activeSection === 'dashboard' && 'Overview of your financial status'}
              {activeSection === 'transactions' && 'Manage your income and expenses'}
              {activeSection === 'reports' && 'Detailed financial reports and insights'}
              {activeSection === 'analytics' && 'Visual analytics of your finances'}
              {activeSection === 'settings' && 'Configure your application preferences'}
            </p>
          </div>
          
          {renderContent()}
        </div>
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransaction}
        transaction={editingTransaction}
      />
    </div>
  );
};

export default Index;
