// src/app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets:  ["latin"],
  weight:   ["700", "900"],
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets:  ["latin"],
  weight:   ["300", "400", "500"],
  variable: "--font-dm",
});

export const metadata: Metadata = {
  title:       "KërStories — Contes africains personnalisés",
  description: "Génère des histoires africaines illustrées et personnalisées pour enfants grâce à l'intelligence artificielle.",
  keywords:    ["contes africains", "histoires enfants", "IA", "Sénégal", "Africa", "storytelling"],
  openGraph: {
    title:       "KërStories",
    description: "Histoires africaines personnalisées pour enfants",
    type:        "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
