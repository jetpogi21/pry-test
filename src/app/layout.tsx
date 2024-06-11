import "./globals.css";
import { Space_Mono as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const fontSans = FontSans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex max-w-screen-lg mx-auto py-20",
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
