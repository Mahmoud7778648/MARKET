"use client";
import { Roboto } from "next/font/google";
import "../globals.css";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "../../providers/AuthProvider";

const inter = Roboto({ subsets: ["latin"], weight: "700" });

const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}