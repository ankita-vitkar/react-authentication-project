import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { employees } from "../../services/mockApi";

const data = ["IT", "HR", "Finance"].map((department) => ({
  name: department,
  value: employees.filter((employee) => employee.department === department).length,
}));

const colors = ["#1976d2", "#00bfa5", "#ff9800"];

export default function DepartmentPieChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" outerRadius={100} paddingAngle={2}>
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}