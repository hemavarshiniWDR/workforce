import type { ReactNode } from 'react';
import { useAuth, type Role } from '../../auth/AuthContext';
import AccessDenied from '../../pages/auth/AccessDenied';
export default function ProtectedRoute({children,roles}:{children:ReactNode;roles?:Role[]}){const {user,ready}=useAuth();if(!ready)return null;if(!user)return null;if(roles&&!roles.includes(user.role))return <AccessDenied/>;return <>{children}</>}
