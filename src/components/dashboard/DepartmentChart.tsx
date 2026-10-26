import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { departmentData } from "../../data/dashboard";

export default function DepartmentChart() {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6">
          Department Distribution
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Employees across business units
        </Typography>

        <Box sx={{ height: 330, mt: 2 }}>
          <ResponsiveContainer>
            <BarChart data={departmentData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,.05)"
              />

              <XAxis
                dataKey="name"
                stroke="#5C7568"
                tick={{ fontSize: 11 }}
              />

              <YAxis
                stroke="#5C7568"
              />

              <Tooltip />

              <Bar
                dataKey="employees"
                fill="#19D27C"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}