import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { setAccessToken as storeAccessToken } from './tokenStore';
export type Role='Admin'|'HR'|'Manager'|'TeamLead'|'Employee';
export type User={id:number;email:string;role:Role;employeeId:number|null;mfaEnabled?:boolean};
type AuthValue={user:User|null;accessToken:string|null;ready:boolean;login:(email:string,password:string,otp?:string)=>Promise<void>;logout:()=>Promise<void>;refresh:()=>Promise<string|null>};
const AuthContext=createContext<AuthValue|null>(null);
export const API=import.meta.env.VITE_API_URL??'http://localhost:4000/api';
export function AuthProvider({children}:{children:ReactNode}){
 const [user,setUser]=useState<User|null>(null); const [accessToken,setAccessTokenState]=useState<string|null>(null); const [ready,setReady]=useState(false);
 const setAccessToken=(value:string|null)=>{setAccessTokenState(value);storeAccessToken(value);};
 const refresh=async()=>{const r=await fetch(`${API}/auth/refresh`,{method:'POST',credentials:'include'});if(!r.ok){setUser(null);setAccessToken(null);return null;}const data=await r.json();setUser(data.user);setAccessToken(data.accessToken);return data.accessToken as string;};
 useEffect(()=>{let active=true;fetch(`${API}/auth/refresh`,{method:'POST',credentials:'include'}).then(async r=>r.ok?r.json():null).then(data=>{if(active&&data){setUser(data.user);setAccessToken(data.accessToken);} }).catch(()=>{}).finally(()=>{if(active)setReady(true);});return()=>{active=false;};},[]);
 const value=useMemo<AuthValue>(()=>({user,accessToken,ready,refresh,login:async(email,password,otp)=>{const r=await fetch(`${API}/auth/login`,{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password,otp})});const data=await r.json();if(!r.ok)throw new Error(data.message||'Login failed');setUser(data.user);setAccessToken(data.accessToken);},logout:async()=>{await fetch(`${API}/auth/logout`,{method:'POST',credentials:'include',headers:accessToken?{Authorization:`Bearer ${accessToken}`}:{}});setUser(null);setAccessToken(null);}}),[user,accessToken,ready]);
 return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth(){const value=useContext(AuthContext);if(!value)throw new Error('useAuth must be used inside AuthProvider');return value;}
