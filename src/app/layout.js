import { Prompt } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navigation";
import Footersection from "@/components/Footersection";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["800"],
  variable: "--font-prompt",
});

export const metadata = {
  title: "วันนี้ซื้ออะไรร",
  description: "Pokemon",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${prompt.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footersection />
      </body>
    </html>
  );
}