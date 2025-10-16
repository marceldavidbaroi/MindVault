export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const ENDPOINTS = {
  auth: {
    signin: "/auth/signin",
    logout: "/auth/logout",
    me: "/auth/me",
  },
  summary: {
    transactionDashboard: "/summary/transaction-dashboard",
  },
  transaction: {
    all: "transactions",
  },
};
