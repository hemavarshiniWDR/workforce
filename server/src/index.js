import express from "express"; import cors from "cors"; import {employeeRepository} from "./repositories.js";
const app=express();const port=Number(process.env.PORT||4000);app.use(cors());app.use(express.json());
app.get("/api/health",(_q,s)=>s.json({status:"ok"}));
app.get("/api/employees",(q,s)=>{try{s.json(employeeRepository.list({department:q.query.department,location:q.query.location,status:q.query.status,search:q.query.search}))}catch{s.status(500).json({message:"Unable to load employees"})}});
app.get("/api/dashboard/summary",(_q,s)=>s.json(employeeRepository.summary()));
app.get("/api/departments",(_q,s)=>s.json(employeeRepository.departments()));
app.get("/api/attendance",(_q,s)=>s.json(employeeRepository.attendance()));
app.listen(port,()=>console.log(`WFA API listening at http://localhost:${port}`));
