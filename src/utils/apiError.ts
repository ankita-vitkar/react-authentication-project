import type { AxiosError } from "axios";

export function getApiErrorMessage(error: unknown): string {
  const axiosError = error as AxiosError<{ message?: string }>;

  if (axiosError?.response?.data?.message) {
    return axiosError.response.data.message;
  }

  if (axiosError?.message) {
    return axiosError.message;
  }

  return "Something went wrong. Please try again.";
}

export function isUnauthorized(error: unknown): boolean {
  return (error as AxiosError)?.response?.status === 401;
}

export function isForbidden(error: unknown): boolean {
  return (error as AxiosError)?.response?.status === 403;
}

export function isServerError(error: unknown): boolean {
  return (error as AxiosError)?.response?.status === 500;
}
