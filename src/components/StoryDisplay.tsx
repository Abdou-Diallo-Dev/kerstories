// src/components/StoryDisplay.tsx
"use client";

import { Story } from "@/lib/types";
import { FLAG_MAP } from "@/lib/constants";

interface StoryDisplayProps {
  story:      Story;
  onNew:      () => void;
}

export default function StoryDisplay({ story, onNew }: StoryDisplayProps) {
  const { meta, scenes, morale } = story;
  const flag = FLAG_MAP[meta.pays] ?? "🌍";

  const btnStyle: React.CSSProperties = {
    background:   "white",
    border:       "1.5px solid rgba(139,69,19,0.2)",
    borderRadius: "10px",
    padding:      "10px 20px",
    fontFamily:   "var(--font-dm), sans-serif",
    fontSize:     "13px",
    fontWeight:   500,
    color:        "#5a3e28",
    cursor:       "pointer",
    display:      "flex",
    alignItems:   "center",
    gap:          "8px",
    transition:   "all 0.15s",
  };

  return (
    <div
      className="animate-fade-in px-12 py-10 overflow-y-auto"
      style={{ maxWidth: "720px", margin: "0 auto" }}
    >
      {/* En-tête */}
      <div
        className="mb-8 pb-6"
        style={{ borderBottom: "2px solid rgba(139,69,19,0.12)" }}
      >
        <span
          className="inline-block text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full mb-3"
          style={{
            background: "rgba(196,98,45,0.1)",
            color:      "var(--terracotta)",
          }}
        >
          {flag} {meta.pays} · {meta.type}
        </span>

        <h2
          className="text-4xl font-black leading-tight mb-2"
          style={{
            fontFamily: "var(--font-playfair), serif",
            color:      "var(--earth)",
          }}
        >
          {story.titre}
        </h2>

        <div className="flex gap-4 text-sm" style={{ color: "#b09880" }}>
          {[
            meta.age === "3-5" ? "3 – 5 ans" : meta.age === "6-8" ? "6 – 8 ans" : "9 – 12 ans",
            meta.langue,
            meta.valeur,
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <span style={{ color: "var(--sand)" }}>·</span>}
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Scènes */}
      <div className="flex flex-col gap-8">
        {scenes.map((scene, idx) => (
          <div
            key={scene.num}
            className="pl-5 transition-all duration-200"
            style={{ borderLeft: "3px solid rgba(196,98,45,0.15)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderLeftColor = "rgba(196,98,45,0.45)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderLeftColor = "rgba(196,98,45,0.15)")
            }
          >
            <span
              className="block text-xs font-medium tracking-widest uppercase mb-1"
              style={{ color: "var(--sand)" }}
            >
              Scène {scene.num}
            </span>
            <h3
              className="text-lg font-bold mb-3"
              style={{
                fontFamily: "var(--font-playfair), serif",
                color:      "var(--earth)",
              }}
            >
              {scene.titre}
            </h3>
            <p
              className={`text-base leading-loose ${idx === 0 ? "first-scene" : ""}`}
              style={{ color: "#2d1a0a" }}
            >
              {scene.contenu}
            </p>
          </div>
        ))}
      </div>

      {/* Morale */}
      {morale && (
        <div
          className="mt-10 rounded-2xl px-8 py-7 relative overflow-hidden"
          style={{ background: "var(--deep)" }}
        >
          {/* Guillemet décoratif */}
          <span
            className="absolute top-0 left-5 select-none pointer-events-none"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize:   "130px",
              color:      "rgba(232,201,138,0.06)",
              lineHeight: 1,
            }}
          >
            "
          </span>
          <p
            className="text-xs font-medium tracking-widest uppercase mb-3 relative z-10"
            style={{ color: "var(--sand)" }}
          >
            Morale
          </p>
          <p
            className="text-xl font-bold leading-relaxed relative z-10"
            style={{
              fontFamily: "var(--font-playfair), serif",
              color:      "var(--sand)",
            }}
          >
            {morale}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mt-8 no-print">
        <button style={btnStyle} onClick={onNew}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M1 4v6h6M23 20v-6h-6"/>
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
          </svg>
          Nouvelle histoire
        </button>
        <button style={btnStyle} onClick={() => window.print()}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 6 2 18 2 18 9"/>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
          </svg>
          Imprimer
        </button>
        <button
          style={btnStyle}
          onClick={() => {
            const texte = scenes.map(s => `— ${s.titre} —\n${s.contenu}`).join("\n\n")
              + (morale ? `\n\nMorale : ${morale}` : "");
            navigator.clipboard.writeText(texte);
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          Copier le texte
        </button>
      </div>
    </div>
  );
}
