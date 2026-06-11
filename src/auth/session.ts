export type UserRole = "admin" | "user";

export function getStoredUserRole(): UserRole {
  const role = localStorage.getItem("userRole");
  return role === "admin" ? "admin" : "user";
}

export function isAuthenticated(): boolean {
  return Boolean(localStorage.getItem("accessToken"));
}

export function saveSession(token: string, role: UserRole) {
  localStorage.setItem("accessToken", token);
  localStorage.setItem("userRole", role);
}

export function clearSession() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userRole");
}
