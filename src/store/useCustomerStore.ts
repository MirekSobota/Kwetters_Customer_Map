import { create } from 'zustand';
import { Customer } from '../types/customer';

interface CustomerState {
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  removeCustomer: (id: string) => void;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  customers: [],
  addCustomer: (customer) =>
    set((state) => ({
      customers: [...state.customers, customer],
    })),
  removeCustomer: (id) =>
    set((state) => ({
      customers: state.customers.filter((customer) => customer.id !== id),
    })),
}));