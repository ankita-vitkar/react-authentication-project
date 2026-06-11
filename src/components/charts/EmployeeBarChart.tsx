import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { employees } from "../../services/mockApi";

const data = ["IT", "HR", "Finance"].map((department) => ({
  name: department,
  count: employees.filter((employee) => employee.department === department).length,
}));

export default function EmployeeBarChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#4caf50" />
      </BarChart>
    </ResponsiveContainer>
  );
}