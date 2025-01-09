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
  const [isChecking, setSetChecking] = useState(true);
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/login");
    } else {
      setSetChecking(false);
    }
  }, [router, user]);

  const onLogOut = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header email={userData.email} onLogOut={onLogOut} />
        {isChecking ? <div>Loading</div> : <div>{children}</div>}
      </body>
    </html>
  );
}
