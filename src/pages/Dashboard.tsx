import {
  AppBar,
  Button,
  Container,
  Paper,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import AnalyticsCards from "../components/charts/AnalyticsCards";
import EmployeeDataGrid from "../components/datagrid/EmployeeDataGrid";
import DepartmentPieChart from "../components/charts/DepartmentPieChart";
import EmployeeBarChart from "../components/charts/EmployeeBarChart";
import NotificationPanel from "../components/notifications/NotificationPanel";
import DatePickerField from "../components/pickers/DatePickerField";
import TimePickerField from "../components/pickers/TimePickerField";
import EmployeeManagement from "./EmployeeManagement";

interface Props {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: Props) {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderRadius: 3, mb: 3 }}>
        <Toolbar sx={{ gap: 1, flexWrap: "wrap" }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Employee Management System
          </Typography>
          <Button component={RouterLink} to="/dashboard" variant="contained">
            Dashboard
          </Button>
          <Button component={RouterLink} to="/employees" variant="outlined">
            Employees
          </Button>
          <Button variant="contained" color="error" onClick={onLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Employee Management System 📊
        </Typography>
        <Typography color="text.secondary">
          Manage staff records, review analytics, and keep departmental activity in one place.
        </Typography>
      </Box>

      <Box sx={{ display: "grid", gap: 3 }}>
        <Paper sx={{ p: 3 }}>
          <AnalyticsCards />
        </Paper>

        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "1fr",
              lg: "320px minmax(0, 1fr)",
            },
          }}
        >
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Live notifications
            </Typography>
            <NotificationPanel />
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Schedule overview
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              <DatePickerField />
              <TimePickerField />
            </Box>
          </Paper>
        </Box>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Employee data grid
          </Typography>
          <EmployeeDataGrid />
        </Paper>

        <EmployeeManagement />

        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "1fr",
              lg: "1fr 1fr",
            },
          }}
        >
          <Paper sx={{ p: 3, minHeight: 440 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Department distribution
            </Typography>
            <DepartmentPieChart />
          </Paper>

          <Paper sx={{ p: 3, minHeight: 440 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Employee statistics
            </Typography>
            <EmployeeBarChart />
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}