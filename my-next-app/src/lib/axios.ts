// lib/api.ts
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import useAuthStore from "@/features/auth/store/authStore";
import useNotificationStore from "@/store/notificationStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ------------------ Axios Instance ------------------
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// ------------------ Refresh Control ------------------
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Add function to notify all waiting requests when token refreshes
function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

// Add function to queue requests while refreshing
function addSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

// ------------------ Request Interceptor ------------------
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window === "undefined") return config;

  const token = useAuthStore.getState().token;

  // Skip attaching token for refresh endpoint
  if (token && !config.url?.includes("/auth/refresh")) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

// ------------------ Response Interceptor ------------------
api.interceptors.response.use(
  (response) => {
    if (response.config.responseType === "blob") return response;

    const notify = useNotificationStore.getState().setNotification;
    const method = response.config.method?.toLowerCase();

    if (["post", "put", "patch", "delete"].includes(method || "")) {
      notify("Operation successful!", "success");
    }

    const data = response.data;

    if (
      data &&
      typeof data === "object" &&
      "success" in data &&
      "message" in data
    ) {
      return data;
    }

    return {
      success: true,
      message: "OK",
      data,
    };
  },

  async (
    error: AxiosError & {
      config?: InternalAxiosRequestConfig & { _retry?: boolean };
    }
  ) => {
    const notify = useNotificationStore.getState().setNotification;
    const authStore = useAuthStore.getState();
    const originalRequest = error.config;

    // Handle blob errors gracefully
    if (error.response?.data instanceof Blob) {
      const blob = error.response.data;
      const text = await blob.text();
      try {
        const json = JSON.parse(text);
        notify(json.message || error.message, "error");
      } catch {
        notify(error.message, "error");
      }
    } else {
      notify((error.response?.data as any)?.message || error.message, "error");
    }

    // ------------------ Token Refresh Logic ------------------
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // If already refreshing → wait for the new token
      if (isRefreshing) {
        return new Promise((resolve) => {
          addSubscriber((token: string) => {
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${token}`,
            };
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        // Use a separate instance to avoid interceptor recursion
        const refreshClient = axios.create({
          baseURL: API_URL,
          withCredentials: true,
        });

        const refreshResponse = await refreshClient.post("/auth/refresh", {});
        const newToken = refreshResponse.data?.accessToken;

        if (!newToken) throw new Error("No accessToken in refresh response");

        // Update store
        authStore.setToken(newToken);

        // Resume queued requests
        onRefreshed(newToken);

        // Retry the failed request
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newToken}`,
        };

        return api(originalRequest);
      } catch (refreshError) {
        authStore.clearAuth();
        notify("Session expired. Please log in again.", "error");
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Still 401 → logout
    if (error.response?.status === 401) {
      authStore.clearAuth();
    }

    return Promise.reject(error);
  }
);

export default api;
