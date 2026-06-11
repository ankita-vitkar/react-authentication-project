import { Alert, Button, Paper } from "@mui/material";
import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("AppErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Paper sx={{ p: 4, m: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            Something went wrong. Please refresh the page.
          </Alert>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Reload app
          </Button>
        </Paper>
      );
    }

    return this.props.children;
  }
}
