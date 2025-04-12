'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Register</h2>
      {['name', 'email', 'password', 'age', 'occupation'].map((field) => (
        <div key={field}>
          <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
          <Input type={field === 'password' ? 'password' : 'text'} name={field} onChange={handleChange} />
        </div>
      ))}
      {error && <p className="text-red-500">{error}</p>}
      <Button onClick={handleSubmit}>Register</Button>
    </div>
  );
}
