'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from 'next/image';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', age: '', occupation: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Registration failed");
      router.push('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Illustration Panel */}
      <div className="hidden lg:flex items-center justify-center bg-indigo-600">
        <Image
          src="/register.avif"
          alt="Register illustration"
          width={700}
          height={700}
          className="object-contain"
        />
      </div>

      {/* Form Panel */}
      <div className="flex items-center justify-center bg-gray-50 p-6 sm:p-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8 space-y-5">
          <h2 className="text-3xl font-bold text-center text-indigo-600">Create Your Account</h2>

          <div className="space-y-4">
            {['name', 'email', 'password', 'age', 'occupation'].map((field) => (
              <div key={field}>
                <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                <Input
                  id={field}
                  name={field}
                  type={field === 'password' ? 'password' : field === 'age' ? 'number' : 'text'}
                  onChange={handleChange}
                  placeholder={`Enter your ${field}`}
                />
              </div>
            ))}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button className="w-full" onClick={handleSubmit}>Register</Button>
          </div>

          <p className="text-center text-sm text-gray-500">
            Already have an account? <a href="/login" className="text-green-600 hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
