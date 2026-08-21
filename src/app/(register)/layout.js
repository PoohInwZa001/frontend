import { Prompt } from "next/font/google";
import "../globals.css";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-prompt",
});

export const metadata = {
  title: "วันนี้ซื้ออะไร",
  description: "Panda Shop",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="th"
      className={`${prompt.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}