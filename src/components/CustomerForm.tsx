import React, { useState } from 'react';
import { MapPin, Plus } from 'lucide-react';
import { useCustomerStore } from '../store/useCustomerStore';
import { searchAddress } from '../utils/geocoding';

export function CustomerForm() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const addCustomer = useCustomerStore((state) => state.addCustomer);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const location = await searchAddress(address);
      
      if (location) {
        addCustomer({
          id: crypto.randomUUID(),
          name,
          address,
          latitude: location.lat,
          longitude: location.lon
        });

        setName('');
        setAddress('');
      } else {
        setError('Could not find the address. Please try a different one.');
      }
    } catch (error) {
      setError('Error finding address. Please try again.');
      console.error('Error geocoding address:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Customer Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400"
          required
        />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Address
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 text-gray-500 dark:text-gray-400">
            <MapPin className="h-4 w-4" />
          </span>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400"
            required
          />
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Customer
      </button>
    </form>
  );
}