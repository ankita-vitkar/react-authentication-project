import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { employees } from "../../services/mockApi";

const departmentSet = new Set(employees.map((employee) => employee.department));
const totalSalary = employees.reduce((sum, employee) => sum + employee.salary, 0);
const departmentSalaryTotals = employees.reduce<Record<string, number>>((acc, employee) => {
  acc[employee.department] = (acc[employee.department] ?? 0) + employee.salary;
  return acc;
}, {});

const cards = [
  { title: "Employees", value: employees.length.toString(), icon: <PeopleIcon fontSize="large" /> },
  { title: "Departments", value: departmentSet.size.toString(), icon: <BusinessIcon fontSize="large" /> },
  { title: "Payroll", value: `$${totalSalary.toLocaleString()}`, icon: <AttachMoneyIcon fontSize="large" /> },
  { title: "Growth", value: "+18%", icon: <TrendingUpIcon fontSize="large" /> },
];

export default function AnalyticsCards() {
  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      <Grid container spacing={3}>
        {cards.map((card) => (
        <Grid key={card.title}>
          <Card
            sx={{
              minWidth: 250,
              borderRadius: 3,
              boxShadow: 3,
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
              },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    {card.title}
                  </Typography>

                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {card.value}
                  </Typography>
                </Box>

                {card.icon}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        ))}
      </Grid>

      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Salary by department
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Current salary totals for every department.
          </Typography>
          <Stack spacing={1}>
            {Object.entries(departmentSalaryTotals)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([department, total]) => (
                <Box
                  key={department}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 1.25,
                    borderRadius: 2,
                    bgcolor: "grey.100",
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>{department}</Typography>
                  <Typography color="primary.main" sx={{ fontWeight: 700 }}>
                    ${total.toLocaleString()}
                  </Typography>
                </Box>
              ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}