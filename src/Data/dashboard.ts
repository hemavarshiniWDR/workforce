import type {
  AttendancePoint,
  DepartmentData,
  Employee,
  KPI,
  WorkforceStatus,
} from "../types/dashboard";

export const kpis: KPI[] = [
  {
    title: "Total Workforce",
    value: "1,248",
    change: "+8.4%",
    trend: "up",
    description: "vs previous month",
  },
  {
    title: "Attendance Rate",
    value: "94.8%",
    change: "+2.1%",
    trend: "up",
    description: "vs last week",
  },
  {
    title: "Productivity",
    value: "87.6%",
    change: "+4.7%",
    trend: "up",
    description: "team average",
  },
  {
    title: "Remote Workforce",
    value: "286",
    change: "+12.3%",
    trend: "up",
    description: "currently remote",
  },
  {
    title: "Late Arrivals",
    value: "42",
    change: "-18.6%",
    trend: "up",
    description: "vs previous week",
  },
];

export const attendanceData: AttendancePoint[] = [
  {
    day: "Mon",
    present: 1120,
    absent: 62,
    late: 66,
  },
  {
    day: "Tue",
    present: 1165,
    absent: 38,
    late: 45,
  },
  {
    day: "Wed",
    present: 1148,
    absent: 45,
    late: 55,
  },
  {
    day: "Thu",
    present: 1182,
    absent: 31,
    late: 35,
  },
  {
    day: "Fri",
    present: 1174,
    absent: 36,
    late: 38,
  },
  {
    day: "Sat",
    present: 820,
    absent: 280,
    late: 148,
  },
  {
    day: "Sun",
    present: 640,
    absent: 440,
    late: 168,
  },
];

export const departmentData: DepartmentData[] = [
  {
    name: "Engineering",
    employees: 410,
  },
  {
    name: "Operations",
    employees: 260,
  },
  {
    name: "Sales",
    employees: 218,
  },
  {
    name: "Finance",
    employees: 170,
  },
  {
    name: "HR",
    employees: 90,
  },
  {
    name: "Design",
    employees: 100,
  },
];

export const workforceData: WorkforceStatus[] = [
  {
    name: "Present",
    value: 842,
  },
  {
    name: "Remote",
    value: 286,
  },
  {
    name: "Absent",
    value: 78,
  },
  {
    name: "Leave",
    value: 42,
  },
];

export const employees: Employee[] = [
  {
    id: 1,
    name: "Arun Kumar",
    role: "Senior Developer",
    department: "Engineering",
    location: "Chennai",
    status: "Present",
    avatar: "AK",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Product Manager",
    department: "Operations",
    location: "Bengaluru",
    status: "Remote",
    avatar: "PS",
  },
  {
    id: 3,
    name: "Rahul Menon",
    role: "UI Designer",
    department: "Design",
    location: "Hyderabad",
    status: "Late",
    avatar: "RM",
  },
  {
    id: 4,
    name: "Divya Raj",
    role: "HR Executive",
    department: "HR",
    location: "Chennai",
    status: "Present",
    avatar: "DR",
  },
  {
    id: 5,
    name: "Karthik S",
    role: "Sales Manager",
    department: "Sales",
    location: "Kochi",
    status: "Present",
    avatar: "KS",
  },
];