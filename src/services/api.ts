import type { Employee,AttendancePoint,DepartmentData } from "../types/dashboard";
const API_BASE=import.meta.env.VITE_API_URL??"/api";
async function request<T>(path:string):Promise<T>{const response=await fetch(`${API_BASE}${path}`);if(!response.ok)throw new Error(`API request failed (${response.status})`);return response.json() as Promise<T>}
export const api={employees:()=>request<Employee[]>("/employees"),attendance:()=>request<AttendancePoint[]>("/attendance"),departments:()=>request<DepartmentData[]>("/departments")};
