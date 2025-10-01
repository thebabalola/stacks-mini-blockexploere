import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "../../components/navbar";

export const metadata: Metadata = {
  title: "Stacks Account History",
  description: "View your Stacks account history and transactions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="flex min-h-screen flex-col gap-8 w-full">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}