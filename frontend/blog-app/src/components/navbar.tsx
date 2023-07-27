"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/authContext";

export default function Navbar() {
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <nav className="flex justify-around h-10 bg-slate-300 items-center w-full">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            width={30}
            height={30}
            alt="Logo"
            className="inline mx-5"
          />
        </Link>

        <Link href="/articles" className="mx-5">
          Recent articles
        </Link>

        <Link href="/about" className="mx-5">
          About
        </Link>
      </div>

      {user ? (
        <Link href="/" onClick={handleLogout} className="mx-5 text-blue-500">
          Logout
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 inline mx-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </Link>
      ) : (
        <Link href="/login" className="mx-5 text-blue-500">
          Log in
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 inline mx-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </Link>
      )}
    </nav>
  );
}
