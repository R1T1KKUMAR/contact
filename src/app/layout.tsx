import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SiteProvider } from "@/components/site-context";
import { getSiteContent } from "@/lib/site-data";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.iamritik.me"),
  title: "Ritik Kumar | Software Engineer & AI Developer",
  description:
    "Building intelligent applications with modern web technologies, AI, and cloud infrastructure.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Ritik Kumar | Software Engineer & AI Developer",
    description:
      "Building intelligent applications with modern web technologies, AI, and cloud infrastructure.",
    type: "website",
    url: "/",
    siteName: "Ritik Kumar",
  },
  twitter: {
    card: "summary",
    title: "Ritik Kumar | Software Engineer & AI Developer",
    description:
      "Building intelligent applications with modern web technologies, AI, and cloud infrastructure.",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSiteContent();

  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="antialiased">
        <SiteProvider site={site}>
          <Navbar />
          <main className="lg:pl-44">{children}</main>
          <div className="lg:pl-44">
            <Footer />
          </div>
        </SiteProvider>
      </body>
    </html>
  );
}
