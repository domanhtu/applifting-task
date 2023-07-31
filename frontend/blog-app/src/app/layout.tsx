'use client'

import Navbar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { metadata } from "@/components/metadata"
import { AuthProvider } from "@/contexts/authContext"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <AuthProvider>
        <Navbar/>
        {children}
      </AuthProvider>
      </body>
    </html>
  );
}
