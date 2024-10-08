import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";

import { Jersey_10 } from "next/font/google";
import ClientLoader from "./ClientLoader";

const jersey10 = Jersey_10({
  weight: ["400",],
  subsets: ["latin"],
});

export const metadata = {
  title: "R&M Universe",
  description: "Generated by create next app",
  icons: {
    icon: '/icon3.png',
    shortcut: '/icon3.png',
    apple: '/icon3.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/icon3.png',
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
      <body className={jersey10.className}>
        <ClientLoader>
          <NavBar />
          <div>{children}</div>
        </ClientLoader>
      </body>
    </html>
  );
}
