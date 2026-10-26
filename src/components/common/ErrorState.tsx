import {
  Alert,
  Box,
  Button,
} from "@mui/material";

interface Props {
  onRetry: () => void;
}

export default function ErrorState({
  onRetry,
}: Props) {
  return (
    <Box sx={{ p: 3 }}>
      <Alert
        severity="error"
        action={
          <Button
            color="inherit"
            size="small"
            onClick={onRetry}
          >
            Retry
          </Button>
        }
      >
        Unable to load workforce data.
      </Alert>
    </Box>
  );
}