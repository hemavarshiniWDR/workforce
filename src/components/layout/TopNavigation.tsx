import {
  NotificationsNone,
  Search,
  DarkMode,
} from "@mui/icons-material";

import {
  Avatar,
  Box,
  IconButton,
  InputBase,
} from "@mui/material";

export default function TopNavigation() {
  return (
    <Box
      component="header"
      sx={{
        height: 72,
        px: {
          xs: 2,
          md: 3,
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom:
          "1px solid rgba(25,210,124,.08)",
        background:
          "rgba(7,19,15,.78)",
        backdropFilter: "blur(16px)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          width: {
            xs: 160,
            sm: 280,
          },
          px: 1.5,
          py: 0.7,
          borderRadius: 2,
          background: "rgba(255,255,255,.04)",
        }}
      >
        <Search
          fontSize="small"
          sx={{ color: "text.secondary" }}
        />

        <InputBase
          placeholder="Search workforce..."
          sx={{
            fontSize: 14,
            flex: 1,
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <IconButton>
          <DarkMode />
        </IconButton>

        <IconButton>
          <NotificationsNone />
        </IconButton>

        <Avatar
          sx={{
            width: 36,
            height: 36,
            background: "primary.main",
            color: "#07130F",
            fontWeight: 700,
          }}
        >
          HV
        </Avatar>
      </Box>
    </Box>
  );
}