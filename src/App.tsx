import { Map } from './components/Map';
import { CustomerForm } from './components/CustomerForm';
import { CustomerList } from './components/CustomerList';
import { ThemeToggle } from './components/ThemeToggle';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <ThemeToggle />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Customer Location Tracker
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Map />
          </div>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Add New Customer
              </h2>
              <CustomerForm />
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <CustomerList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}