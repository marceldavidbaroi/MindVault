import { fetcher } from "@/lib/fetcher";
import { ENDPOINTS } from "@/config/api";

export const transactionService = {
  getAll: () =>
    fetcher<any>(ENDPOINTS.transaction.all, {
      method: "GET",
    }),

  //   me: (req?: any) => fetcher<any>(ENDPOINTS.auth.me, { method: "GET" }, req),
};
