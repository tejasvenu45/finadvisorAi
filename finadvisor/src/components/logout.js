'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';

export default function LogoutButton() {
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    setUser(null);
    router.push('/login');
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
