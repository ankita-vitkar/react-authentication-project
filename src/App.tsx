import { useState } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppErrorBoundary from "./components/ui/AppErrorBoundary";
import { NotificationProvider } from "./components/ui/NotificationProvider";
import Dashboard from "./pages/Dashboard";
import EmployeeManagementPage from "./pages/EmployeeManagementPage";
import Login from "./pages/Login.tsx";

function App() {
  const [authenticated, setAuthenticated] = useState(() => Boolean(localStorage.getItem("accessToken")));

  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const handleLogin = () => setAuthenticated(true);
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAuthenticated(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <AppErrorBoundary>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={authenticated ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />} />
              <Route path="/" element={authenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
              <Route path="/dashboard" element={authenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
              <Route path="/employees" element={authenticated ? <EmployeeManagementPage onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to={authenticated ? "/dashboard" : "/login"} replace />} />
            </Routes>
          </BrowserRouter>
        </AppErrorBoundary>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;