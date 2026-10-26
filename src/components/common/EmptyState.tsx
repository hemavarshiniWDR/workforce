import {
  Box,
  Typography,
} from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

export default function EmptyState() {
  return (
    <Box
      sx={{
        minHeight: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <SearchOffIcon
        sx={{
          fontSize: 42,
          color: "text.secondary",
        }}
      />

      <Typography fontWeight={600}>
        No workforce data found
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
      >
        Try changing your filters.
      </Typography>
    </Box>
  );
}