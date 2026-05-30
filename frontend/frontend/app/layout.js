import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-dm-sans",
});

export const metadata = {
  title: "Steel Defect Analyzer · Tata Steel",
  description: "AI-powered steel surface defect classification — Subrata Bhakat, BIT Mesra",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body style={{ fontFamily: "var(--font-dm-sans), sans-serif", margin: 0 }}>
        {children}
      </body>
    </html>
  );
} 