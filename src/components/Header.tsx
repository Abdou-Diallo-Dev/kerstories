// src/components/Header.tsx
"use client";

export default function Header() {
  return (
    <>
      <div className="kente-bar" />
      <header
        className="relative overflow-hidden flex items-center justify-between px-8 py-4"
        style={{ background: "var(--deep)" }}
      >
        {/* Grille décorative en arrière-plan */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(196,98,45,0.07) 40px, rgba(196,98,45,0.07) 41px)",
          }}
        />

        {/* Logo */}
        <div className="relative">
          <h1
            className="text-3xl font-black leading-none"
            style={{ fontFamily: "var(--font-playfair), serif", color: "var(--sand)" }}
          >
            Kër<span style={{ color: "var(--terracotta)" }}>Stories</span>
          </h1>
          <p
            className="text-xs font-light tracking-widest mt-0.5"
            style={{ color: "rgba(232,201,138,0.45)", letterSpacing: "0.25em" }}
          >
            CONTES AFRICAINS · IA
          </p>
        </div>

        {/* Badge */}
        <span
          className="text-xs font-medium px-4 py-1.5 rounded-full"
          style={{
            background:  "rgba(196,98,45,0.18)",
            border:      "1px solid rgba(196,98,45,0.35)",
            color:       "var(--sand)",
            letterSpacing: "0.08em",
          }}
        >
          MVP Beta
        </span>
      </header>
    </>
  );
}
