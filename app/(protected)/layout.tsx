"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [userData, setUserData] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserData(parsedUser);
      } catch (err) {
        console.error("Failed to parse user data:", err);
      }
    } else {
      router.push("/login");
    }
    setIsChecking(false);
  }, [router]);

  const onLogOut = () => {
    localStorage.removeItem("user");
    setUserData(null);
    router.push("/login");
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header email={userData?.email || null} onLogOut={onLogOut} />
        {isChecking ? <div>Loading...</div> : <div>{children}</div>}
      </body>
    </html>
  );
}
