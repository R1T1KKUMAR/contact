import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Particles from "@/components/Particles";
import Footer from "@/components/Footer";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ritik Kumar | Software Engineer & AI Developer",
  description:
    "Building intelligent applications with modern web technologies, AI, and cloud infrastructure.",
  openGraph: {
    title: "Ritik Kumar | Software Engineer & AI Developer",
    description:
      "Building intelligent applications with modern web technologies, AI, and cloud infrastructure.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <Navbar />
        <Particles />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
