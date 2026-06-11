import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { getStoredUserRole, isAuthenticated } from "../../auth/session";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "admin" | "user";
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && getStoredUserRole() !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
