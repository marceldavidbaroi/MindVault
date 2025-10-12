import { API_BASE_URL } from "@/config/api";

/**
 * 🔹 Universal Fetch Wrapper (Client + SSR)
 *
 * - Automatically attaches `credentials: "include"` for cookie-based auth
 * - Forwards cookies from `req` during SSR
 * - Centralizes all API calls in one place
 *
 * ✅ Client Usage:
 *    await fetcher("/auth/me");
 *
 * ✅ SSR Usage:
 *    export async function getServerSideProps({ req }) {
 *      const user = await fetcher("/auth/me", { method: "GET" }, req);
 *      return { props: { user } };
 *    }
 */

export async function fetcher<T>(
  url: string,
  options: RequestInit = {},
  req?: any // SSR request object
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  // Forward cookies for SSR
  if (req?.headers?.cookie) {
    headers["cookie"] = req.headers.cookie;
  }

  const res = await fetch(API_BASE_URL + url, {
    ...options,
    headers,
    credentials: "include", // send cookies automatically in client-side requests
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
