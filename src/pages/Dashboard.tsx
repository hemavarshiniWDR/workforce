import { useMemo, useState } from "react";

import {
  Box,
  Container,
  Typography,
} from "@mui/material";

import Sidebar from "../components/layout/Sidebar";
import TopNavigation from "../components/layout/TopNavigation";

import KPICard from "../components/dashboard/KPICard";
import AttendanceChart from "../components/dashboard/AttendanceChart";
import DepartmentChart from "../components/dashboard/DepartmentChart";
import WorkforceDonut from "../components/dashboard/WorkforceDonut";
import ActivityPanel from "../components/dashboard/ActivityPanel";
import FilterBar from "../components/dashboard/FilterBar";

import {
  employees,
  kpis,
} from "../data/dashboard";

export default function Dashboard() {
  const [department, setDepartment] =
    useState("All");

  const [location, setLocation] =
    useState("All");

  const [status, setStatus] =
    useState("All");

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const departmentMatch =
        department === "All" ||
        employee.department === department;

      const locationMatch =
        location === "All" ||
        employee.location === location;

      const statusMatch =
        status === "All" ||
        employee.status === status;

      return (
        departmentMatch &&
        locationMatch &&
        statusMatch
      );
    });
  }, [department, location, status]);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "#07130F",
      }}
    >
      <Sidebar />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <TopNavigation />

        <Container
          maxWidth="xl"
          sx={{
            py: {
              xs: 2,
              md: 4,
            },
          }}
        >
          <Box
            sx={{
              mb: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: {
                xs: "flex-start",
                md: "center",
              },
              flexDirection: {
                xs: "column",
                md: "row",
              },
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{ mb: 0.7 }}
              >
                Workforce Overview
              </Typography>

              <Typography
                color="text.secondary"
              >
                Real-time workforce intelligence
                at a glance.
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{
                px: 2,
                py: 1,
                borderRadius: 3,
                background:
                  "rgba(25,210,124,.08)",
                color: "primary.main",
              }}
            >
              ● System operational
            </Typography>
          </Box>

          <FilterBar
            department={department}
            location={location}
            status={status}
            setDepartment={setDepartment}
            setLocation={setLocation}
            setStatus={setStatus}
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(5, 1fr)",
              },
              gap: 2,
              mb: 2,
            }}
          >
            {kpis.map((kpi) => (
              <KPICard
                key={kpi.title}
                data={kpi}
              />
            ))}
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "2fr 1fr",
              },
              gap: 2,
              mb: 2,
            }}
          >
            <AttendanceChart />

            <WorkforceDonut />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "1.3fr 1fr",
              },
              gap: 2,
            }}
          >
            <DepartmentChart />

            <ActivityPanel />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Showing {filteredEmployees.length}{" "}
              matching employees
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}