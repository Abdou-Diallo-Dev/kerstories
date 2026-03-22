// src/components/LoadingState.tsx
"use client";

import { useEffect, useState } from "react";
import { LOADING_MESSAGES } from "@/lib/constants";

export default function LoadingState() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-12">
      {/* Spinner cercle animé */}
      <svg width="72" height="72" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="36" cy="36" r="28"
          fill="none"
          stroke="rgba(196,98,45,0.15)"
          strokeWidth="3"
        />
        <circle
          cx="36" cy="36" r="28"
          fill="none"
          stroke="var(--terracotta)"
          strokeWidth="3"
          strokeDasharray="36 140"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 36 36"
            to="360 36 36"
            dur="1.1s"
            repeatCount="indefinite"
          />
        </circle>
        <text x="36" y="42" textAnchor="middle" fontSize="20">📖</text>
      </svg>

      {/* Dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-2.5 h-2.5 rounded-full"
            style={{
              background:      i === 0 ? "var(--terracotta)" : i === 1 ? "var(--gold)" : "var(--savanna)",
              animation:       `dotBounce 1.2s infinite ${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Message rotatif */}
      <p
        key={msgIndex}
        className="text-sm italic text-center animate-fade-in"
        style={{ color: "#7a6652", maxWidth: "240px" }}
      >
        {LOADING_MESSAGES[msgIndex]}
      </p>
    </div>
  );
}
