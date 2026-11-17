import { useEffect, useState } from 'react';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import { api } from '../../services/api';
type Activity = { name:string; action:string; day:string; status:string };
export default function ActivityPanel() {
  const [activities,setActivities]=useState<Activity[]>([]);
  const [error,setError]=useState('');
  useEffect(()=>{api.recentActivity().then(setActivities).catch(()=>setError('Activity feed is unavailable.'));},[]);
  return <Card sx={{height:'100%'}}><CardContent><Typography variant="h6">Recent Attendance Activity</Typography><Typography variant="body2" color="text.secondary" sx={{mb:3}}>Latest records from the SQLite attendance database</Typography>{error&&<Typography variant="body2" color="error">{error}</Typography>}{activities.map((item,index)=><Box key={`${item.name}-${item.day}-${index}`} sx={{display:'flex',gap:2,mb:2.5,alignItems:'center'}}><Avatar sx={{width:38,height:38,fontSize:12,background:'rgba(25,210,124,.12)',color:'primary.main'}}>{item.name.split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase()}</Avatar><Box sx={{flex:1}}><Typography variant="body2" fontWeight={600}>{item.name}</Typography><Typography variant="caption" color="text.secondary">Attendance marked: {item.status}</Typography></Box><Typography variant="caption" color="text.secondary">{item.day}</Typography></Box>)}{!error&&activities.length===0&&<Typography variant="body2" color="text.secondary">No attendance activity available.</Typography>}</CardContent></Card>;
}
