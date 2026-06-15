import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = { title: "THE OBJECT", description: "A private exhibition for one leather boot." };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
