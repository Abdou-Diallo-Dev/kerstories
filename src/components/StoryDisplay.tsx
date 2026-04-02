// src/components/StoryDisplay.tsx
"use client";

import { useState } from "react";
import { Story } from "@/lib/types";
import PdfExport from "./PdfExport";
import ShareButtons from "./ShareButtons";
import { FLAG_MAP } from "@/lib/constants";
import { toResponsiveSvg } from "@/lib/sanitizeSvg";

interface StoryDisplayProps {
  story: Story;
  storyId?: string | null;
  onNew: () => void;
}

export default function StoryDisplay({ story, storyId, onNew }: StoryDisplayProps) {
  const { meta, scenes, morale } = story;
  const flag = FLAG_MAP[meta.pays] ?? "🌍";
  const [currentScene, setCurrentScene] = useState(0);
  const [readingScene, setReadingScene] = useState<number | null>(null);

  const totalScenes = scenes.length;
  const scene       = scenes[currentScene];
  const isFirst     = currentScene === 0;
  const isLast      = currentScene === totalScenes - 1;
  const showMorale  = currentScene >= totalScenes;
  const ageLabel    = meta.age === "3-5" ? "3–5 ans" : meta.age === "6-8" ? "6–8 ans" : "9–12 ans";

  // Morale de secours si vide
  const moraleText = morale || `${meta.valeur.charAt(0).toUpperCase() + meta.valeur.slice(1)} est la plus grande force qui soit.`;

  const fallbackSvgs = [
    `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="sky0" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#87CEEB"/><stop offset="100%" stop-color="#FFB347"/></linearGradient></defs>
      <rect width="800" height="500" fill="url(#sky0)"/>
      <rect y="340" width="800" height="160" fill="#8B6914"/>
      <rect y="360" width="800" height="140" fill="#A0522D" opacity="0.5"/>
      <rect x="100" y="180" width="40" height="160" fill="#5D4037"/>
      <ellipse cx="120" cy="170" rx="80" ry="60" fill="#2D5016"/>
      <ellipse cx="80" cy="190" rx="50" ry="40" fill="#388E3C"/>
      <ellipse cx="160" cy="185" rx="55" ry="42" fill="#2E7D32"/>
      <circle cx="650" cy="80" r="55" fill="#FFD700" opacity="0.9"/>
      <circle cx="650" cy="80" r="45" fill="#FFC107"/>
      <rect x="450" y="280" width="120" height="90" fill="#D2691E"/>
      <polygon points="440,280 510,220 580,280" fill="#8B0000"/>
      <rect x="490" y="320" width="30" height="50" fill="#4E342E"/>
      <ellipse cx="320" cy="300" rx="20" ry="25" fill="#5D4037"/>
      <circle cx="320" cy="268" r="18" fill="#795548"/>
      <rect x="308" y="295" width="8" height="35" fill="#1565C0"/>
      <rect x="324" y="295" width="8" height="35" fill="#1565C0"/>
      <ellipse cx="200" cy="360" rx="120" ry="20" fill="#558B2F" opacity="0.7"/>
      <ellipse cx="550" cy="355" rx="100" ry="18" fill="#558B2F" opacity="0.6"/>
    </svg>`,
    `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1565C0"/><stop offset="60%" stop-color="#42A5F5"/><stop offset="100%" stop-color="#FFE082"/></linearGradient></defs>
      <rect width="800" height="500" fill="url(#sky1)"/>
      <rect y="360" width="800" height="140" fill="#4E342E"/>
      <ellipse cx="400" cy="410" rx="300" ry="40" fill="#1E88E5" opacity="0.7"/>
      <ellipse cx="400" cy="395" rx="100" ry="20" fill="#8D6E63"/>
      <rect x="380" y="360" width="10" height="35" fill="#5D4037"/>
      <polygon points="390,360 430,375 390,390" fill="#E8C98A"/>
      <circle cx="370" cy="355" r="16" fill="#795548"/>
      <rect x="360" y="370" width="12" height="25" fill="#E65100"/>
      <circle cx="420" cy="352" r="18" fill="#5D4037"/>
      <rect x="410" y="368" width="14" height="28" fill="#1B5E20"/>
      <ellipse cx="250" cy="420" rx="25" ry="12" fill="#26C6DA"/>
      <ellipse cx="550" cy="415" rx="20" ry="10" fill="#FF7043"/>
      <ellipse cx="80" cy="365" rx="60" ry="45" fill="#2E7D32"/>
      <ellipse cx="700" cy="370" rx="55" ry="40" fill="#388E3C"/>
    </svg>`,
    `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0D47A1"/><stop offset="100%" stop-color="#7B1FA2"/></linearGradient></defs>
      <rect width="800" height="500" fill="url(#sky2)"/>
      <rect y="380" width="800" height="120" fill="#3E2723"/>
      <circle cx="100" cy="60" r="3" fill="white" opacity="0.9"/>
      <circle cx="250" cy="40" r="2" fill="white"/>
      <circle cx="400" cy="70" r="4" fill="#FFD700"/>
      <circle cx="550" cy="35" r="2" fill="white"/>
      <circle cx="700" cy="55" r="3" fill="white"/>
      <circle cx="660" cy="90" r="45" fill="#FFE082"/>
      <circle cx="678" cy="78" r="38" fill="#1A237E"/>
      <ellipse cx="380" cy="400" rx="50" ry="12" fill="#212121"/>
      <polygon points="360,400 380,330 400,400" fill="#FF6F00"/>
      <polygon points="365,400 382,345 398,400" fill="#FFB300"/>
      <polygon points="370,400 380,355 392,400" fill="#FFEE58"/>
      <circle cx="290" cy="375" r="18" fill="#5D4037"/>
      <rect x="280" y="390" width="20" height="30" fill="#880E4F"/>
      <circle cx="470" cy="372" r="18" fill="#795548"/>
      <rect x="460" y="387" width="20" height="30" fill="#1A237E"/>
      <circle cx="380" cy="362" r="15" fill="#6D4C41"/>
      <rect x="372" y="376" width="16" height="25" fill="#E65100"/>
    </svg>`,
    `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="sky3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#E65100"/><stop offset="50%" stop-color="#FFB74D"/><stop offset="100%" stop-color="#FFF8E1"/></linearGradient></defs>
      <rect width="800" height="500" fill="url(#sky3)"/>
      <rect y="350" width="800" height="150" fill="#6D4C41"/>
      <rect x="80" y="290" width="100" height="80" fill="#D2691E"/>
      <polygon points="68,290 130,235 192,290" fill="#C62828"/>
      <rect x="580" y="295" width="95" height="75" fill="#BF7B3A"/>
      <polygon points="568,295 627,242 688,295" fill="#AD1457"/>
      <circle cx="280" cy="335" r="17" fill="#795548"/>
      <rect x="270" y="350" width="14" height="28" fill="#E91E63"/>
      <circle cx="340" cy="330" r="16" fill="#5D4037"/>
      <rect x="330" y="345" width="14" height="28" fill="#1565C0"/>
      <circle cx="400" cy="325" r="19" fill="#4E342E"/>
      <rect x="389" y="342" width="15" height="30" fill="#F57F17"/>
      <circle cx="460" cy="332" r="16" fill="#6D4C41"/>
      <rect x="450" y="347" width="14" height="28" fill="#2E7D32"/>
      <circle cx="400" cy="295" r="22" fill="#5D4037"/>
      <rect x="388" y="315" width="16" height="35" fill="#1565C0"/>
      <rect x="393" y="270" width="8" height="25" fill="#FFD700"/>
      <circle cx="397" cy="265" r="10" fill="#FFD700"/>
      <rect x="680" y="220" width="30" height="130" fill="#5D4037"/>
      <ellipse cx="695" cy="210" rx="65" ry="50" fill="#2E7D32"/>
    </svg>`,
  ];

  function readAloud(text: string, idx: number) {
    window.speechSynthesis.cancel();
    if (readingScene === idx) { setReadingScene(null); return; }
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang  = meta.langue === "English" ? "en-US" : "fr-FR";
    utter.rate  = 0.85;
    utter.pitch = 1.1;
    utter.onend = () => setReadingScene(null);
    setReadingScene(idx);
    window.speechSynthesis.speak(utter);
  }

  function stopReading() {
    window.speechSynthesis.cancel();
    setReadingScene(null);
  }

  const btnStyle: React.CSSProperties = {
    background: "white", border: "1.5px solid rgba(139,69,19,0.2)",
    borderRadius: "10px", padding: "10px 20px",
    fontFamily: "var(--font-dm), sans-serif", fontSize: "13px",
    fontWeight: 500, color: "#5a3e28", cursor: "pointer",
    display: "flex", alignItems: "center", gap: "8px",
  };

  function getIllustration(idx: number): string {
    return scenes[idx]?.svgIllustration || fallbackSvgs[idx % fallbackSvgs.length];
  }

  return (
    <div className="animate-fade-in flex flex-col h-full overflow-hidden">

      {/* ── Barre de progression ── */}
      <div className="story-progress-bar flex items-center gap-2 px-4 md:px-8 pt-4 pb-3 flex-shrink-0 no-print">
        {scenes.map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <button onClick={() => { stopReading(); setCurrentScene(i); }}
              className="rounded-full flex items-center justify-center font-bold transition-all duration-300"
              style={{
                width:      i === currentScene ? "34px" : "26px",
                height:     i === currentScene ? "34px" : "26px",
                background: i < currentScene ? "var(--savanna)" : i === currentScene ? "var(--terracotta)" : "rgba(139,69,19,0.12)",
                color:      i <= currentScene ? "white" : "#b09880",
                fontSize:   i === currentScene ? "13px" : "11px",
                border:     "none", cursor: "pointer",
              }}>
              {i < currentScene ? "✓" : i + 1}
            </button>
            {i < totalScenes - 1 && (
              <div className="h-0.5 w-6 rounded-full transition-all duration-500"
                style={{ background: i < currentScene ? "var(--savanna)" : "rgba(139,69,19,0.12)" }} />
            )}
          </div>
        ))}
        <div className="h-0.5 w-6 rounded-full"
          style={{ background: showMorale ? "var(--gold)" : "rgba(139,69,19,0.12)" }} />
        <button onClick={() => { stopReading(); setCurrentScene(totalScenes); }}
          className="rounded-full flex items-center justify-center text-sm transition-all duration-300"
          style={{
            width:      showMorale ? "34px" : "26px",
            height:     showMorale ? "34px" : "26px",
            background: showMorale ? "var(--gold)" : "rgba(139,69,19,0.12)",
            color:      showMorale ? "white" : "#b09880",
            border:     "none", cursor: "pointer",
          }}>★</button>
      </div>

      {/* ── Contenu scrollable ── */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-6">

        {/* ── Vue Scène ── */}
        {!showMorale && scene && (
          <div className="animate-fade-in">
            {currentScene === 0 && (
              <div className="mb-5 pb-4" style={{ borderBottom: "1px solid rgba(139,69,19,0.1)" }}>
                <span className="inline-block text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full mb-2"
                  style={{ background: "rgba(196,98,45,0.1)", color: "var(--terracotta)" }}>
                  {flag} {meta.pays} · {meta.type}
                </span>
                <h2 className="text-2xl font-black leading-tight mb-1"
                  style={{ fontFamily: "var(--font-playfair), serif", color: "var(--earth)" }}>
                  {story.titre}
                </h2>
                <div className="flex gap-3 text-xs" style={{ color: "#b09880" }}>
                  <span>{ageLabel}</span>
                  <span style={{ color: "var(--sand)" }}>·</span>
                  <span>{meta.langue}</span>
                  <span style={{ color: "var(--sand)" }}>·</span>
                  <span>{meta.valeur}</span>
                </div>
              </div>
            )}

            {/* Titre + Texte */}
            <div className="mb-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="block text-xs font-medium tracking-widest uppercase mb-1"
                    style={{ color: "var(--sand)" }}>Scène {scene.num}</span>
                  <h3 className="text-xl font-bold"
                    style={{ fontFamily: "var(--font-playfair), serif", color: "var(--earth)" }}>
                    {scene.titre}
                  </h3>
                </div>
                <button onClick={() => readAloud(scene.contenu, currentScene)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium flex-shrink-0 no-print"
                  style={{
                    background: readingScene === currentScene ? "var(--terracotta)" : "rgba(196,98,45,0.1)",
                    color:      readingScene === currentScene ? "white" : "var(--terracotta)",
                    border: "none", cursor: "pointer", marginLeft: "12px",
                  }}>
                  {readingScene === currentScene ? "⏹ Stop" : "🔊 Écouter"}
                </button>
              </div>
              <p className={`text-base leading-loose ${currentScene === 0 ? "first-scene" : ""}`}
                style={{ color: "#2d1a0a" }}>
                {scene.contenu}
              </p>
            </div>

            {/* Illustration SVG */}
            <div className="rounded-2xl overflow-hidden border"
              style={{ height: "260px", borderColor: "rgba(139,69,19,0.15)" }}>
              <div className="w-full h-full"
                dangerouslySetInnerHTML={{
                  __html: toResponsiveSvg(getIllustration(currentScene))
                }}
              />
            </div>
          </div>
        )}

        {/* ── Vue Morale — toujours affichée si showMorale ── */}
        {showMorale && (
          <div className="animate-fade-in pt-2">
            <div className="rounded-2xl px-8 py-10 relative overflow-hidden"
              style={{ background: "var(--deep)" }}>
              <span className="absolute top-0 left-5 select-none pointer-events-none"
                style={{ fontFamily: "var(--font-playfair), serif", fontSize: "130px", color: "rgba(232,201,138,0.06)", lineHeight: 1 }}>
                "
              </span>
              <p className="text-xs font-medium tracking-widest uppercase mb-4 relative z-10"
                style={{ color: "var(--sand)" }}>✨ La Morale</p>
              <p className="text-2xl font-bold leading-relaxed relative z-10"
                style={{ fontFamily: "var(--font-playfair), serif", color: "var(--sand)" }}>
                {moraleText}
              </p>
              <button onClick={() => readAloud(moraleText, -1)}
                className="mt-6 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium relative z-10 no-print"
                style={{
                  background: readingScene === -1 ? "rgba(232,201,138,0.3)" : "rgba(232,201,138,0.1)",
                  color: "var(--sand)", border: "1px solid rgba(232,201,138,0.2)", cursor: "pointer",
                }}>
                {readingScene === -1 ? "⏹ Stop" : "🔊 Écouter la morale"}
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mt-6 no-print">
              <button style={btnStyle} onClick={onNew}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M1 4v6h6M23 20v-6h-6"/>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                </svg>
                Nouvelle histoire
              </button>
              <PdfExport story={story} />
              <ShareButtons story={story} storyId={storyId} />
              <button style={btnStyle} onClick={() => { stopReading(); setCurrentScene(0); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                Recommencer
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Navigation ── */}
      {!showMorale && (
        <div className="story-nav-bar flex items-center justify-between px-4 md:px-8 py-4 flex-shrink-0 no-print"
          style={{ borderTop: "1px solid rgba(139,69,19,0.1)", background: "white" }}>
          <button
            onClick={() => { stopReading(); setCurrentScene((p) => Math.max(0, p - 1)); }}
            disabled={isFirst}
            style={{
              background: isFirst ? "rgba(139,69,19,0.04)" : "var(--cream)",
              border: "1.5px solid rgba(139,69,19,0.15)",
              color: isFirst ? "#c9b09a" : "var(--earth)",
              cursor: isFirst ? "not-allowed" : "pointer",
              borderRadius: "10px", padding: "10px 20px",
              fontFamily: "var(--font-dm), sans-serif", fontSize: "13px", fontWeight: 500,
            }}>
            ← Précédent
          </button>
          <span className="text-xs font-medium" style={{ color: "#b09880" }}>
            {currentScene + 1} / {totalScenes}
          </span>
          <button
            onClick={() => { stopReading(); setCurrentScene((p) => p + 1); }}
            style={{
              background: "var(--deep)", border: "1.5px solid var(--deep)",
              color: "var(--sand)", cursor: "pointer",
              borderRadius: "10px", padding: "10px 20px",
              fontFamily: "var(--font-dm), sans-serif", fontSize: "13px", fontWeight: 500,
            }}>
            {isLast ? "Voir la morale ★" : "Suivant →"}
          </button>
        </div>
      )}
    </div>
  );
}
