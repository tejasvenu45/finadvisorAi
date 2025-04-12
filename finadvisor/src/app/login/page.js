'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

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
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Illustration Section */}
      <div className="hidden lg:flex items-center justify-center bg-indigo-600">
        <Image
          src="/login.avif"
          alt="Financial login"
          width={800}
          height={800}
          className="object-contain"
        />
      </div>

      {/* Login Form Section */}
      <div className="flex items-center justify-center bg-gray-50 p-6 sm:p-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8 space-y-5">
          <h2 className="text-3xl font-bold text-center text-indigo-600">Login to FinAdvisor</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" onChange={handleChange} placeholder="you@example.com" />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" onChange={handleChange} placeholder="••••••••" />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button className="w-full" onClick={handleLogin}>Login</Button>
          </div>

          <p className="text-center text-sm text-gray-500">
            Don’t have an account? <a href="/register" className="text-indigo-600 hover:underline">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}
