import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import type { SelectChangeEvent } from "@mui/material";

interface Props {
  department: string;
  location: string;
  status: string;
  setDepartment: (value: string) => void;
  setLocation: (value: string) => void;
  setStatus: (value: string) => void;
}

export default function FilterBar({
  department,
  location,
  status,
  setDepartment,
  setLocation,
  setStatus,
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        flexWrap: "wrap",
        mb: 3,
      }}
    >
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Department</InputLabel>

        <Select
          value={department}
          label="Department"
          onChange={(e: SelectChangeEvent) =>
            setDepartment(e.target.value)
          }
        >
          <MenuItem value="All">
            All Departments
          </MenuItem>
          <MenuItem value="Engineering">
            Engineering
          </MenuItem>
          <MenuItem value="Operations">
            Operations
          </MenuItem>
          <MenuItem value="Sales">
            Sales
          </MenuItem>
          <MenuItem value="HR">
            HR
          </MenuItem>
          <MenuItem value="Design">
            Design
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Location</InputLabel>

        <Select
          value={location}
          label="Location"
          onChange={(e: SelectChangeEvent) =>
            setLocation(e.target.value)
          }
        >
          <MenuItem value="All">All Locations</MenuItem>
          <MenuItem value="Chennai">Chennai</MenuItem>
          <MenuItem value="Bengaluru">
            Bengaluru
          </MenuItem>
          <MenuItem value="Hyderabad">
            Hyderabad
          </MenuItem>
          <MenuItem value="Kochi">Kochi</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Status</InputLabel>

        <Select
          value={status}
          label="Status"
          onChange={(e: SelectChangeEvent) =>
            setStatus(e.target.value)
          }
        >
          <MenuItem value="All">All Status</MenuItem>
          <MenuItem value="Present">Present</MenuItem>
          <MenuItem value="Remote">Remote</MenuItem>
          <MenuItem value="Late">Late</MenuItem>
          <MenuItem value="Absent">Absent</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}