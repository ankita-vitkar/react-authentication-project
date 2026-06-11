import { type FormEvent, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNotification } from "../components/ui/NotificationProvider";
import api from "../services/api";
import { saveSession } from "../auth/session";
import { getApiErrorMessage } from "../utils/apiError";

interface Props {
  onLogin: () => void;
}

export default function Login({ onLogin }: Props) {
  const { showNotification } = useNotification();
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState("");

  const isDemoLogin = useMemo(
    () => email.trim().toLowerCase() === "eve.holt@reqres.in" && password === "cityslicka",
    [email, password]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setError("");

      if (isDemoLogin) {
        saveSession("demo-session-token", "admin");
        showNotification({ message: "Signed in successfully", severity: "success" });
        onLogin();
        return;
      }

      const response = await api.post("/login", { email, password });
      const token = response.data?.token;

      if (!token) {
        throw new Error("No authentication token returned by the server.");
      }

      saveSession(token, email.toLowerCase().includes("admin") ? "admin" : "user");
      showNotification({ message: "Signed in successfully", severity: "success" });
      onLogin();
    } catch (err) {
      const message = getApiErrorMessage(err);
      setError(message);
      showNotification({ message, severity: "error" });
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Paper sx={{ width: "100%", p: 4, borderRadius: 3, boxShadow: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Welcome back
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 1 }}>
          Sign in to view the employee dashboard.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Demo credentials: eve.holt@reqres.in / cityslicka
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
            margin="normal"
            autoComplete="email"
            slotProps={{ htmlInput: { "aria-label": "Email address" } }}
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
            margin="normal"
            autoComplete="current-password"
            slotProps={{ htmlInput: { "aria-label": "Password" } }}
          />

          {error ? (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          ) : null}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, py: 1.5 }}
          >
            Sign in
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
