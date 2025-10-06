import { Category } from "@/features/finance/types/category.type";
export interface Transaction {
  id: number;
  type: TransactionType;
  category: Category;
  amount: number | null;
  date: string | null;
  description?: string;
  recurring?: boolean;
  recurringInterval?: RecurringInterval | null;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionForm {
  amount: number | null;
  categoryId: number | null;
  date: null;
  description: string;
  type: TransactionType;
  recurring: Boolean;
  recurringInterval: RecurringInterval | null;
}

export type TransactionType = "income" | "expense";

export type IncomeCategory =
  | "salary"
  | "freelance"
  | "business"
  | "investment"
  | "rental_income"
  | "gift"
  | "refund"
  | "other_income";

export type ExpenseCategory =
  | "food_groceries"
  | "food_dining"
  | "housing_rent"
  | "housing_mortgage"
  | "utilities"
  | "transportation"
  | "health_medical"
  | "education"
  | "entertainment"
  | "shopping"
  | "travel"
  | "personal_care"
  | "insurance"
  | "debt_repayment"
  | "savings_investments"
  | "charity_donation"
  | "other_expense";

export type RecurringInterval = "daily" | "weekly" | "monthly" | "yearly";
export const transactionTypes: TransactionType[] = ["income", "expense"];

export const incomeCategoriesList: IncomeCategory[] = [
  "salary",
  "freelance",
  "business",
  "investment",
  "rental_income",
  "gift",
  "refund",
  "other_income",
];

export const expenseCategoriesList: ExpenseCategory[] = [
  "food_groceries",
  "food_dining",
  "housing_rent",
  "housing_mortgage",
  "utilities",
  "transportation",
  "health_medical",
  "education",
  "entertainment",
  "shopping",
  "travel",
  "personal_care",
  "insurance",
  "debt_repayment",
  "savings_investments",
  "charity_donation",
  "other_expense",
];

export const recurringIntervals: RecurringInterval[] = [
  "daily",
  "weekly",
  "monthly",
  "yearly",
];
export type GenerateReportType = {
  startDate: string; // ISO date string, e.g., '2025-10-07'
  endDate?: string; // optional ISO date string
  detailLevel: "daily" | "monthly" | "yearly" | "detailed";
};

export type TransactionItem = {
  categoryId: number | null;
  amount: number | null;
};

export type BulkTransactionPayload = {
  date: string; // ISO date string
  type: TransactionType;
  transactions: TransactionItem[];
};

export interface FindTransactionsParams {
  type?: TransactionType;
  categoryId?: Category;
  startDate?: string; // ISO 8601 format
  endDate?: string; // ISO 8601 format
  page?: number;
  limit?: number;
}

export interface TransactionsState {
  transactionList: Transaction[] | [];
  transaction: Transaction | null;
  loading: boolean;
  error: string | null;

  setTransactionList: (list: Transaction[]) => void;
  setTransaction: (transaction: Transaction | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
