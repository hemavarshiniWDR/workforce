import { useState } from 'react';
import { Alert,Box,Button,Typography } from '@mui/material';
import { useAuth,AuthProvider } from './auth/AuthContext';
import Dashboard from './pages/Dashboard';
import EmployeeHome from './pages/EmployeeHome';
import Login from './pages/auth/Login';
import AccessDenied from './pages/auth/AccessDenied';
import MfaSettings from './components/auth/MfaSettings';
import AdminTools from './components/auth/AdminTools';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SessionManager from './components/auth/SessionManager';
function AppContent(){const {user,logout,ready}=useAuth();const [showAdmin,setShowAdmin]=useState(false);if(!ready)return <Box sx={{p:5}}>Loading session…</Box>;if(!user)return <Login/>;if(user.role==='Employee')return <><Box sx={{display:'flex',justifyContent:'flex-end',alignItems:'center',gap:2,p:2}}><Typography>{user.email} · Employee</Typography><MfaSettings/><SessionManager/><Button onClick={()=>void logout()}>Logout</Button></Box><EmployeeHome/></>;if(!['Admin','HR','Manager','TeamLead'].includes(user.role))return <AccessDenied/>;return <><Box sx={{display:'flex',justifyContent:'flex-end',alignItems:'center',gap:2,px:3,py:1,flexWrap:'wrap'}}><Typography>{user.email} · {user.role}</Typography><MfaSettings/><SessionManager/>{user.role==='Admin'&&<Button size="small" onClick={()=>setShowAdmin(v=>!v)}>Admin tools</Button>}<Button size="small" onClick={()=>void logout()}>Logout</Button></Box>{showAdmin&&user.role==='Admin'&&<AdminTools/>}{showAdmin&&user.role!=='Admin'&&<Alert severity="warning" sx={{mx:3,mb:2}}>Admin-only tools are not available for your role.</Alert>}<ProtectedRoute roles={['Admin','HR','Manager','TeamLead']}><Dashboard/></ProtectedRoute></>;}
export default function App(){return <AuthProvider><AppContent/></AuthProvider>;}
