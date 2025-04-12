'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { checkAuth } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Login failed");

      await checkAuth();
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <div>
        <Label>Email</Label>
        <Input name="email" type="email" onChange={handleChange} />
      </div>
      <div>
        <Label>Password</Label>
        <Input name="password" type="password" onChange={handleChange} />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}
