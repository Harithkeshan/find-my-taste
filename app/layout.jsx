import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  weight: ["600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-outfit",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
});

export const metadata = {
  title: "Find My Taste 🎯",
  description: "Discover your unique taste archetype with AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${plusJakarta.variable} ${plusJakarta.className} antialiased text-base font-normal`}>
        {children}
      </body>
    </html>
  );
}
