import Navbar from "@/components/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/authContext"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog App",
  description: "Next 13 blog app for Applifting task",
};

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
