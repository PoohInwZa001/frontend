import { Prompt } from "next/font/google";
import "./globals.css";

import Navigation from "@/components/Navigation";
import Footersection from "@/components/Footersection";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-prompt",
});

export const metadata = {
  title: "Panda Shop",
  description: "Panda Shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" className={prompt.variable}>
      <body className="min-h-screen flex flex-col">
        <Navigation />

        <main className="flex-1">
          {children}
        </main>

        <Footersection />
      </body>
    </html>
  );
}