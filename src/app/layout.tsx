import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Jesse the Oracle",
    description: "A fast, fun way to challenge friends in real time.",
    other: {
      'fc:miniapp': JSON.stringify({
          version: 'next',
          imageUrl: 'https://jesse-the-oracle.vercel.app/oraclee.png',
          button: {
              title: `Launch Jesse the Oracle`,
              action: {
                  type: 'launch_miniapp',
                  name: 'Jesse the Oracle',
                  url: 'https://jesse-the-oracle.vercel.app',
                  splashImageUrl: 'https://jesse-the-oracle.vercel.app/oraclee.png',
                  splashBackgroundColor: '#000000',
              },
          },
      }),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
