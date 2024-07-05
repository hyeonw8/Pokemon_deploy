import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "./QueryProvider";
import { dehydrate } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "포켓몬 도감 ✨",
  description: "앗! 야생의 포켓몬이 나타났다...!",
  icons: {
    icon: "/pokemon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-blue-400 text-white`}>
        <QueryProvider>
          <header className="flex justify-center items-center font-bold text-3xl font-dalmoori p-5 bg-black">
            ✨ 포켓몬 도감 ✨
          </header>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
