import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bean Brew Digest",
  description: "Your definitive guide to specialty coffee — brewing methods, bean origins, roasting craft, and café culture.",
  verification: {
    other: {
      "msvalidate.01": "C396E9907374E29FB46754412E4E3FB7",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}<Analytics /></body>
    </html>
  );
}
