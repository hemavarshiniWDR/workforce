import Database from "better-sqlite3";
import fs from "node:fs"; import path from "node:path"; import {fileURLToPath} from "node:url";
const here=path.dirname(fileURLToPath(import.meta.url)); const dir=path.resolve(here,"../data"); fs.mkdirSync(dir,{recursive:true});
const db=new Database(path.join(dir,"workforce.sqlite")); db.pragma("journal_mode = WAL"); db.pragma("foreign_keys = ON");
db.exec(`CREATE TABLE IF NOT EXISTS departments(id INTEGER PRIMARY KEY,name TEXT NOT NULL UNIQUE);
CREATE TABLE IF NOT EXISTS employees(id INTEGER PRIMARY KEY,name TEXT NOT NULL,email TEXT NOT NULL UNIQUE,role TEXT NOT NULL,department_id INTEGER NOT NULL REFERENCES departments(id),location TEXT NOT NULL,status TEXT NOT NULL CHECK(status IN ('Present','Absent','On Leave','Remote','Late')),created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS attendance(id INTEGER PRIMARY KEY,employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,attendance_date TEXT NOT NULL,status TEXT NOT NULL,check_in TEXT,check_out TEXT,UNIQUE(employee_id,attendance_date));
CREATE INDEX IF NOT EXISTS idx_employees_department ON employees(department_id); CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(attendance_date);`);
if(db.prepare("SELECT COUNT(*) n FROM employees").get().n===0){
 const names=["Engineering","Operations","Sales","Finance","HR","Design"]; const dept=db.prepare("INSERT INTO departments(name) VALUES(?)"); names.forEach(n=>dept.run(n));
 const ids=Object.fromEntries(db.prepare("SELECT id,name FROM departments").all().map(x=>[x.name,x.id]));
 const insert=db.prepare("INSERT INTO employees(name,email,role,department_id,location,status) VALUES(?,?,?,?,?,?)");
 const seed=[["Arun Kumar","Senior Developer","Engineering","Chennai","Present"],["Priya Sharma","Product Manager","Operations","Bengaluru","Remote"],["Rahul Menon","UI Designer","Design","Hyderabad","Late"],["Divya Raj","HR Executive","HR","Chennai","Present"],["Karthik S","Sales Manager","Sales","Kochi","Present"],["Meera Nair","QA Engineer","Engineering","Chennai","On Leave"],["Vikram Rao","Accountant","Finance","Bengaluru","Absent"],["Sneha Iyer","Operations Analyst","Operations","Hyderabad","Present"],["Naveen Kumar","Backend Developer","Engineering","Visakhapatnam","Present"],["Ananya Das","UX Designer","Design","Kochi","Remote"],["Suresh Babu","Sales Executive","Sales","Chennai","Present"],["Pooja Reddy","HR Manager","HR","Bengaluru","Present"]];
 const tx=db.transaction(()=>{
  seed.forEach(e=>insert.run(e[0],`${e[0].toLowerCase().replaceAll(" ",".")}@example.com`,e[1],ids[e[2]],e[3],e[4]));
  const employeeIds=db.prepare("SELECT id,status FROM employees").all();
  const addAttendance=db.prepare("INSERT OR IGNORE INTO attendance(employee_id,attendance_date,status,check_in,check_out) VALUES(?,?,?,?,?)");
  for(let offset=29;offset>=0;offset--){const day=new Date();day.setDate(day.getDate()-offset);const date=day.toISOString().slice(0,10);
   employeeIds.forEach((emp,index)=>{const status=offset%11===0&&index%4===0?"Absent":offset%13===0&&index%5===0?"On Leave":emp.status;addAttendance.run(emp.id,date,status,status==="Present"?"09:00":null,status==="Present"?"18:00":null)});
  }
 }); tx();
}
export default db;
