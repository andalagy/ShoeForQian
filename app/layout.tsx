import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "THE LINE — QIANSHOES",
  description: "An interactive luxury shoe archive built around one rule: drag the line."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
