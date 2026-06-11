export function unwrapResponse<T>(response: { data?: T }): T {
  return response.data as T;
}

export function isSuccessResponse(status: number): boolean {
  return status >= 200 && status < 300;
}
