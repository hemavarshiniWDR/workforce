import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const activities = [
  {
    name: "Arun Kumar",
    action: "Checked in",
    time: "2 min ago",
    avatar: "AK",
  },
  {
    name: "Priya Sharma",
    action: "Started remote session",
    time: "8 min ago",
    avatar: "PS",
  },
  {
    name: "Rahul Menon",
    action: "Marked attendance",
    time: "14 min ago",
    avatar: "RM",
  },
  {
    name: "Divya Raj",
    action: "Approved leave request",
    time: "21 min ago",
    avatar: "DR",
  },
  {
    name: "Karthik S",
    action: "Completed sprint task",
    time: "34 min ago",
    avatar: "KS",
  },
];

export default function ActivityPanel() {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6">
          Recent Activity
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Latest workforce events
        </Typography>

        {activities.map((item, index) => (
          <Box
            key={item.name}
            sx={{
              display: "flex",
              gap: 2,
              mb: 2.5,
              position: "relative",
            }}
          >
            <Avatar
              sx={{
                width: 38,
                height: 38,
                fontSize: 12,
                background:
                  "rgba(25,210,124,.12)",
                color: "primary.main",
              }}
            >
              {item.avatar}
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                fontWeight={600}
              >
                {item.name}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                {item.action}
              </Typography>
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {item.time}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}