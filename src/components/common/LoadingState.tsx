import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

export default function LoadingState() {
  return (
    <Box
      sx={{
        minHeight: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <CircularProgress
        size={32}
        thickness={4}
      />

      <Typography
        color="text.secondary"
        variant="body2"
      >
        Loading workforce data...
      </Typography>
    </Box>
  );
}