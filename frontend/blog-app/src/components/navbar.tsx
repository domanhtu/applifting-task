"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/authContext";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  const isActiveLink = (href: string) => {
    return pathname === href;
  };

  const handleToggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden lg:flex justify-around items-center h-10 bg-slate-300 p-2 w-full">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              width={30}
              height={30}
              alt="Logo"
              className="inline mx-2"
            />
          </Link>

          <Link
            href="/articles"
            className={`mx-2 ${
              isActiveLink("/articles") ? "text-blue-500 font-medium" : ""
            }`}
          >
            Recent articles
          </Link>

          <Link
            href="/"
            className={`mx-2 ${
              isActiveLink("/") ? "text-blue-500 font-medium" : ""
            }`}
          >
            About
          </Link>
        </div>

        {user ? (
          <div className="flex items-center">
            <Link
              href="/articles/my"
              className={`mx-2 ${
                isActiveLink("/articles/my") ? "text-blue-500 font-medium" : ""
              }`}
            >
              My Articles
            </Link>

            <Link
              href="/articles/create"
              className={`mx-2 ${
                isActiveLink("/articles/create")
                  ? "text-blue-500 font-medium"
                  : ""
              }`}
            >
              Create Article
            </Link>

            <Link
              href="/"
              onClick={handleLogout}
              className="mx-2 text-blue-500 font-medium"
            >
              Logout
            </Link>
          </div>
        ) : (
          <Link href="/login" className="mx-2 text-blue-500">
            Log in
          </Link>
        )}
      </nav>

      {/* Hamburger Icon and Mobile Menu */}
      <nav className="lg:hidden bg-slate-300 p-2 w-full">
        <div className="flex justify-end">
          <button onClick={handleToggleMenu}>
            <svg
              className="w-6 h-6 text-black cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <div
          className={`flex flex-col items-end mt-2 space-y-2 ${
            isMenuOpen ? "" : "hidden"
          }`}
          ref={menuRef}
        >
          <Link
            href="/articles"
            className={`mx-2 ${
              isActiveLink("/articles") ? "text-blue-500 font-medium" : ""
            }`}
          >
            Recent articles
          </Link>

          <Link
            href="/"
            className={`mx-2 ${
              isActiveLink("/") ? "text-blue-500 font-medium" : ""
            }`}
          >
            About
          </Link>

          {user && (
            <>
              <Link
                href="/articles/my"
                className={`${
                  isActiveLink("/articles/my") ? "text-blue-500 font-medium" : ""
                }`}
              >
                My Articles
              </Link>

              <Link
                href="/articles/create"
                className={` ${
                  isActiveLink("/articles/create") ? "text-blue-500 font-medium" : ""
                }`}
              >
                Create Article
              </Link>

              <Link
                href="/"
                onClick={handleLogout}
                className="text-blue-500 font-medium"
              >
                Logout
              </Link>
            </>
          )}

          {!user && (
            <div className="flex flex-col items-end mt-2">
              <Link href="/login" className="text-blue-500">
                Log in
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
