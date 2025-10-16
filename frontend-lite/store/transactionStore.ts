import { create } from "zustand";
import { transactionService } from "@/services/transactionService";

interface TransactionState {
  transactions: any;
  setTransactions: (user: any) => void;
  getAllTransaction: (req?: any) => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  setTransactions: (transactions) => set({ transactions }),

  getAllTransaction: async (params) => {
    try {
      await transactionService.getAll();
    } catch {}
  },
}));
