export type AttendanceStatus="Present"|"Absent"|"On Leave"|"Remote"|"Late";
export interface Employee{id:number;name:string;role:string;department:string;location:string;status:AttendanceStatus;avatar:string;email?:string}
export interface KPI{title:string;value:string;change:string;trend:"up"|"down";description:string}
export interface AttendancePoint{day:string;present:number;absent:number;late:number}
export interface DepartmentData{name:string;employees:number}
export interface WorkforceStatus{name:string;value:number}
