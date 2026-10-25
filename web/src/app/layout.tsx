
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avenza | Urban Mobility",
  description:
    "Explore urban routes, pedestrian accessibility, infrastructure, public transport, and safety information with Avenza.",
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
