import {
  Assessment,
  Dashboard,
  Groups,
  Settings,
  EventAvailable,
  Insights,
  Logout,
} from "@mui/icons-material";

import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const menuItems = [
  {
    label: "Overview",
    icon: <Dashboard />,
  },
  {
    label: "Workforce",
    icon: <Groups />,
  },
  {
    label: "Attendance",
    icon: <EventAvailable />,
  },
  {
    label: "Analytics",
    icon: <Insights />,
  },
  {
    label: "Reports",
    icon: <Assessment />,
  },
];

export default function Sidebar() {
  return (
    <Box
      component="aside"
      sx={{
        width: 250,
        minHeight: "100vh",
        p: 2,
        background: "#081710",
        borderRight:
          "1px solid rgba(25,210,124,.10)",
        display: {
          xs: "none",
          md: "flex",
        },
        flexDirection: "column",
      }}
    >
      <Box sx={{ px: 2, py: 2.5, mb: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: "primary.main",
          }}
        >
          WORKFORCE
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          Intelligence Platform
        </Typography>
      </Box>

      <List sx={{ flex: 1 }}>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={item.label}
            selected={index === 0}
            sx={{
              mb: 0.7,
              borderRadius: 2,
              "&.Mui-selected": {
                background:
                  "linear-gradient(90deg, rgba(25,210,124,.18), rgba(25,210,124,.03))",
                color: "primary.main",
              },
              "&.Mui-selected .MuiListItemIcon-root":
                {
                  color: "primary.main",
                },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: "text.secondary",
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={item.label}
            />
          </ListItemButton>
        ))}
      </List>

      <List>
        <ListItemButton>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>

          <ListItemText primary="Settings" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>

          <ListItemText primary="Sign out" />
        </ListItemButton>
      </List>
    </Box>
  );
}