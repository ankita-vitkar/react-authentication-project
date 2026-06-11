import { Suspense, lazy, useMemo, useState } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppErrorBoundary from "./components/ui/AppErrorBoundary";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { NotificationProvider } from "./components/ui/NotificationProvider";
import { clearSession, isAuthenticated } from "./auth/session";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const EmployeeManagementPage = lazy(() => import("./pages/EmployeeManagementPage"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  const [authenticated, setAuthenticated] = useState(() => isAuthenticated());

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode: "light" },
        shape: { borderRadius: 14 },
      }),
    []
  );

  const handleLogin = () => setAuthenticated(true);
  const handleLogout = () => {
    clearSession();
    setAuthenticated(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <AppErrorBoundary>
          <BrowserRouter>
            <Suspense fallback={<div role="status" aria-live="polite">Loading application…</div>}>
              <Routes>
                <Route
                  path="/login"
                  element={authenticated ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />}
                />
                <Route
                  path="/"
                  element={authenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard onLogout={handleLogout} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employees"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <EmployeeManagementPage onLogout={handleLogout} />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to={authenticated ? "/dashboard" : "/login"} replace />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AppErrorBoundary>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;