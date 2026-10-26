import {
  ArrowDownward,
  ArrowUpward,
  TrendingUp,
} from "@mui/icons-material";

import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

import type { KPI } from "../../types/dashboard";

interface Props {
  data: KPI;
}

export default function KPICard({ data }: Props) {
  const positive = data.trend === "up";

  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        height: "100%",
        transition: "all 0.25s ease",

        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "rgba(25,210,124,0.35)",
          boxShadow:
            "0 15px 45px rgba(25,210,124,0.10)",
        },
      }}
    >
      {/* Green glow */}
      <Box
        sx={{
          position: "absolute",
          right: -35,
          top: -35,
          width: 110,
          height: 110,
          borderRadius: "50%",
          background:
            "rgba(25,210,124,0.08)",
          filter: "blur(12px)",
        }}
      />

      <CardContent
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {data.title}
          </Typography>

          <Box
            sx={{
              width: 38,
              height: 38,
              display: "grid",
              placeItems: "center",
              borderRadius: 2,
              background:
                "rgba(25,210,124,0.10)",
              color: "primary.main",
            }}
          >
            <TrendingUp fontSize="small" />
          </Box>
        </Box>

        {/* Value */}
        <Typography
          variant="h4"
          sx={{
            mb: 1,
            fontWeight: 750,
            letterSpacing: "-0.03em",
          }}
        >
          {data.value}
        </Typography>

        {/* Change */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Chip
            size="small"
            icon={
              positive ? (
                <ArrowUpward />
              ) : (
                <ArrowDownward />
              )
            }
            label={data.change}
            sx={{
              color: "primary.main",
              background:
                "rgba(25,210,124,0.10)",
              fontWeight: 600,

              "& .MuiChip-icon": {
                color: "inherit",
              },
            }}
          />

          <Typography
            variant="caption"
            color="text.secondary"
          >
            {data.description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}