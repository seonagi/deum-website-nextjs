import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Remove Filler Words from Video - AI Video Editor | deum.video",
  description: "AI-powered video editor that automatically removes filler words like 'um', 'uh', 'like' from podcasts and videos. 10x faster than manual editing. Try 1 video free.",
  keywords: ["remove filler words", "ai video editor", "podcast editing", "video editing software", "filler word removal", "um uh er", "automatic video editing"],
  authors: [{ name: "Deum" }],
  creator: "Deum",
  publisher: "Deum",
  robots: "index, follow",
  alternates: {
    canonical: "https://deum.video",
  },
  openGraph: {
    type: "website",
    url: "https://deum.video",
    title: "Remove Filler Words from Video - AI Editor",
    description: "AI removes 'um', 'uh', 'like' from your videos automatically. 10x faster than manual editing. Try free.",
    siteName: "deum.video",
    images: [
      {
        url: "https://deum.video/og-image.png",
        width: 1200,
        height: 630,
        alt: "deum.video - AI Video Filler Remover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@deumvideo",
    title: "Remove Filler Words from Video - AI Editor",
    description: "AI removes 'um', 'uh', 'like' from your videos automatically. 10x faster than manual editing. Try free.",
    images: ["https://deum.video/og-image.png"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "deum.video",
              description: "AI-powered video editor that removes filler words automatically",
              url: "https://deum.video",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                name: "Free Plan",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.7",
                reviewCount: "3",
              },
              creator: {
                "@type": "Organization",
                name: "Deum",
                url: "https://deum.video",
              },
              featureList: [
                "AI-powered filler word detection",
                "Automatic video editing",
                "97% accuracy rate",
                "Up to 4K quality support",
                "10-minute processing time",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
