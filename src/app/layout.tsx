import type { Metadata } from "next";
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
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-95PY8PSZ0Y"></script>
        <script dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-95PY8PSZ0Y');" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
