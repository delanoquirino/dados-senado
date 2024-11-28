import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import "./globals.css";

const roboto = Roboto({ weight: ['300', '400', '500', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Gastos dos Senados Brasileiros",
  description: "Gráficos com dados sobre os gastos dos senadores brasileiros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-slate-100 min-h-screen text-slate-500 ${roboto.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
