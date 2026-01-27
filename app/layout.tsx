import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Federico Tafur – Data Scientist & ML Engineer",
  description: "Portfolio of Federico Tafur, Data Scientist & ML Engineer. Specializing in machine learning, data science, and full-stack development.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
