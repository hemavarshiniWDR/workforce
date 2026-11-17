import { useEffect, useState, type FormEvent } from 'react';
import { Alert, Box, Button, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { API, useAuth, type Role } from '../../auth/AuthContext';

type EmployeeOption = { id: number; name: string; department: string; teamName?: string };
export default function AdminTools() {
  const { accessToken } = useAuth();
  const [employees, setEmployees] = useState<EmployeeOption[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('Employee');
  const [employeeId, setEmployeeId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [audit, setAudit] = useState<{id:number;action:string;created_at:string;user_id:number|null}[]>([]);
  const headers = { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' };
  useEffect(() => {
    fetch(`${API}/employees`, { headers }).then(r => r.ok ? r.json() : []).then(setEmployees).catch(() => setEmployees([]));
    fetch(`${API}/audit-logs`, { headers }).then(r => r.ok ? r.json() : []).then(setAudit).catch(() => setAudit([]));
  }, [accessToken]);
  async function createUser(e: FormEvent) {
    e.preventDefault(); setError(''); setMessage('');
    const response = await fetch(`${API}/auth/users`, { method: 'POST', headers, body: JSON.stringify({ email, password, role, employeeId: Number(employeeId) }) });
    const data = await response.json();
    if (!response.ok) { setError(data.message || 'Could not create account'); return; }
    setMessage(`Created ${data.role} account for ${data.email}.`); setEmail(''); setPassword(''); setEmployeeId('');
  }
  return <Paper sx={{mx:3,mb:3,p:3}}>
    <Typography variant="h6" fontWeight={700} sx={{mb:2}}>Admin tools – create a user account</Typography>
    {message && <Alert severity="success" sx={{mb:2}}>{message}</Alert>}{error && <Alert severity="error" sx={{mb:2}}>{error}</Alert>}
    <Box component="form" onSubmit={createUser} sx={{display:'grid',gridTemplateColumns:{xs:'1fr',md:'repeat(2,1fr)'},gap:2}}>
      <TextField label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <TextField label="Temporary password (12+ characters)" type="password" value={password} onChange={e=>setPassword(e.target.value)} slotProps={{htmlInput:{minLength:12}}} required />
      <TextField select label="Role" value={role} onChange={e=>setRole(e.target.value as Role)}>{(['HR','Manager','TeamLead','Employee'] as Role[]).map(r=><MenuItem key={r} value={r}>{r}</MenuItem>)}</TextField>
      <TextField select label="Linked employee record" value={employeeId} onChange={e=>setEmployeeId(e.target.value)} required>{employees.map(e=><MenuItem key={e.id} value={e.id}>{e.name} – {e.department} – {e.teamName || 'General'} (#{e.id})</MenuItem>)}</TextField>
      <Button type="submit" variant="contained" sx={{gridColumn:{md:'1 / -1'}}}>Create account</Button>
    </Box>
    <Typography variant="caption" color="text.secondary" sx={{display:'block',mt:1}}>Manager scope is derived from the linked employee’s department. TeamLead scope is derived from the linked employee’s department and team. Assign real employee records only.</Typography>
    <Typography variant="h6" fontWeight={700} sx={{mt:3,mb:1}}>Recent audit events</Typography>
    <Stack spacing={1}>{audit.slice(0,10).map(row=><Box key={row.id} sx={{display:'flex',justifyContent:'space-between',gap:2,borderBottom:'1px solid',borderColor:'divider',pb:1}}><Typography variant="body2">{row.action} · user #{row.user_id ?? 'system'}</Typography><Typography variant="caption" color="text.secondary">{row.created_at}</Typography></Box>)}{audit.length===0&&<Typography variant="body2" color="text.secondary">No audit events loaded.</Typography>}</Stack>
  </Paper>;
}
