import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import EmployeeManagement from "./EmployeeManagement";

interface Props {
  onLogout: () => void;
}

export default function EmployeeManagementPage({ onLogout }: Props) {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderRadius: 3, mb: 3 }}>
        <Toolbar sx={{ gap: 1, flexWrap: "wrap" }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Employee Hub
          </Typography>
          <Button component={RouterLink} to="/dashboard" variant="outlined">
            Dashboard
          </Button>
          <Button component={RouterLink} to="/employees" variant="contained">
            Employees
          </Button>
          <Button color="error" variant="contained" onClick={onLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <EmployeeManagement />
    </Container>
  );
}
