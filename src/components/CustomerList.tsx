import React from 'react';
import { Trash2 } from 'lucide-react';
import { useCustomerStore } from '../store/useCustomerStore';

export function CustomerList() {
  const { customers, removeCustomer } = useCustomerStore();

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customer List</h2>
      <div className="space-y-3">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg shadow"
          >
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">{customer.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">{customer.address}</p>
            </div>
            <button
              onClick={() => removeCustomer(customer.id)}
              className="p-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        {customers.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">No customers added yet</p>
        )}
      </div>
    </div>
  );
}