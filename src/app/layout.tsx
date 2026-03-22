// src/app/layout.tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets:  ["latin"],
  weight:   ["400", "600", "700"],
  variable: "--font-playfair",
  style:    ["normal", "italic"],
});

const outfit = Outfit({
  subsets:  ["latin"],
  weight:   ["300", "400", "500", "600"],
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
    <html lang="fr" className={`${cormorant.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
