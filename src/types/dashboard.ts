export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  location: string;
  status: "Present" | "Absent" | "Late" | "Remote";
  avatar: string;
}

export interface KPI {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  description: string;
}

export interface AttendancePoint {
  day: string;
  present: number;
  absent: number;
  late: number;
}

export interface DepartmentData {
  name: string;
  employees: number;
}

export interface WorkforceStatus {
  name: string;
  value: number;
}