import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sri Venkateshwara Infra Tech | Premium Construction & Infrastructure",
  description:
    "Sri Venkateshwara Infra Tech — Building excellence for over two decades. Premium construction, infrastructure development, layout planning, and commercial building projects in Hyderabad.",
  keywords: [
    "construction company Hyderabad",
    "infrastructure development",
    "layout development",
    "building construction",
    "Sri Venkateshwara Infra Tech",
  ],
  openGraph: {
    title: "Sri Venkateshwara Infra Tech | Premium Construction & Infrastructure",
    description:
      "Building excellence for over two decades. Premium construction and infrastructure development in Hyderabad.",
    type: "website",
    locale: "en_IN",
    siteName: "Sri Venkateshwara Infra Tech",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
