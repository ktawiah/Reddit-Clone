import { cn } from "@/lib/utils";
import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/navbar/navbar";
import { Toaster } from "@/components/ui/toaster";
import ReduxProvider from "./store/provider";
import ReactQueryProvider from "./providers/react-query";
import NextAuthProvider from "./providers/next-auth-session";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reddit Clone",
  description: "Reddit clone built with Next js and Typescript",
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("bg-white text-slate-900 antialiased light")}>
      <body className="min-h-screen pt-12 bg-slate-50 antialiased">
        <ReactQueryProvider>
          <NextAuthProvider>
            <ReduxProvider>
              <div className="container max-w-7xl p-12">
                <Navbar />
                {children}
                {authModal}
              </div>
              <Toaster />
            </ReduxProvider>
          </NextAuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
