import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { WorkforceStatus } from "../../types/dashboard";
interface Props { data: WorkforceStatus[]; }

const COLORS = [
  "#19D27C",
  "#42E89A",
  "#FFC857",
  "#FF6B6B",
];

export default function WorkforceDonut({ data }: Props) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6">
          Workforce Status
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Current workforce distribution
        </Typography>

        <Box
          sx={{
            height: 270,
            position: "relative",
          }}
        >
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={75}
                outerRadius={105}
                paddingAngle={4}
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <Typography variant="h4">
              {data.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Employees
            </Typography>
          </Box>
        </Box>

        <Box>
          {data.map((item, index) => (
            <Box
              key={item.name}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: COLORS[index],
                  }}
                />

                <Typography variant="body2">
                  {item.name}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                fontWeight={600}
              >
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}