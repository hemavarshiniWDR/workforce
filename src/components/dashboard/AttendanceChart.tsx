import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { attendanceData } from "../../data/dashboard";

export default function AttendanceChart() {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h6">
              Attendance Pulse
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Workforce attendance over the last 7 days
            </Typography>
          </Box>

          <Typography
            sx={{
              color: "primary.main",
              fontWeight: 700,
            }}
          >
            94.8%
          </Typography>
        </Box>

        <Box sx={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <AreaChart data={attendanceData}>
              <defs>
                <linearGradient
                  id="attendanceGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#19D27C"
                    stopOpacity={0.35}
                  />
                  <stop
                    offset="100%"
                    stopColor="#19D27C"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,.05)"
              />

              <XAxis
                dataKey="day"
                stroke="#5C7568"
              />

              <YAxis
                stroke="#5C7568"
              />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="present"
                stroke="#19D27C"
                strokeWidth={3}
                fill="url(#attendanceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}