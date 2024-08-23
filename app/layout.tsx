import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "R&M Universe",
  description: "Generated by create next app",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/icon3.png',
    apple: '/icon1.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/icon1.png',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
