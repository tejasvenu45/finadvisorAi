'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LogoutButton from './logout';

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center border-b border-gray-200">
      <Link href="/" className="text-indigo-600 font-bold text-xl">
        FinAdvisor
      </Link>

      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <Link
              href="/dashboard"
              className="text-gray-800 hover:text-indigo-600 transition font-medium"
            >
              Dashboard
            </Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/login">
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">Login</button>
            </Link>
            <Link href="/register">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
