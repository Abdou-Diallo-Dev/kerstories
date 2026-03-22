// src/components/SceneIllustration.tsx
"use client";

import { useEffect, useState } from "react";
import { Scene, StoryFormData } from "@/lib/types";

interface SceneIllustrationProps {
  scene:  Scene;
  meta:   StoryFormData;
  index:  number;
}

export default function SceneIllustration({ scene, meta, index }: SceneIllustrationProps) {
  const [svg,     setSvg]     = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  const sceneBg = [
    "linear-gradient(135deg, #C4622D 0%, #E8A855 100%)",
    "linear-gradient(135deg, #2D5016 0%, #5a8a2a 100%)",
    "linear-gradient(135deg, #D4900A 0%, #C4622D 100%)",
    "linear-gradient(135deg, #1A4A6B 0%, #2D7AB5 100%)",
  ];

  const sceneEmoji = ["🌅", "🦁", "⭐", "🌺"];

  useEffect(() => {
    let cancelled = false;

    async function fetchIllustration() {
      setLoading(true);
      setError(false);
      setSvg("");

      try {
        const res = await fetch("/api/generate-illustration", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sceneTitle:   scene.titre,
            sceneContent: scene.contenu,
            imagePrompt:  scene.imagePrompt || "",
            pays:         meta.pays,
            prenom:       meta.prenom,
          }),
        });

        const data = await res.json();
        if (!cancelled) {
          if (data.success && data.svg) {
            setSvg(data.svg);
          } else {
            setError(true);
          }
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchIllustration();
    return () => { cancelled = true; };
  }, [scene.titre, meta.pays, meta.prenom]);

  // Loading
  if (loading) {
    return (
      <div className="w-full rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-3"
        style={{ height: "260px", background: sceneBg[index % 4] }}>
        <div className="relative">
          <div className="w-12 h-12 border-3 border-white border-t-transparent rounded-full animate-spin"
            style={{ borderWidth: "3px", borderColor: "rgba(255,255,255,0.3)", borderTopColor: "white" }} />
          <div className="absolute inset-0 flex items-center justify-center text-xl">
            {sceneEmoji[index % 4]}
          </div>
        </div>
        <p className="text-sm font-medium text-white opacity-80">Illustration en cours...</p>
        <p className="text-xs text-white opacity-50">L'IA dessine la scène</p>
      </div>
    );
  }

  // Erreur / fallback
  if (error || !svg) {
    return (
      <div className="w-full rounded-2xl overflow-hidden flex items-center justify-center relative"
        style={{ height: "260px", background: sceneBg[index % 4] }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="text-center relative z-10">
          <div className="text-5xl mb-2">{sceneEmoji[index % 4]}</div>
          <p className="text-white text-sm font-medium opacity-80 px-4">{scene.titre}</p>
        </div>
      </div>
    );
  }

  // SVG généré
  return (
    <div className="w-full rounded-2xl overflow-hidden relative"
      style={{ height: "260px", background: sceneBg[index % 4] }}>
      <div
        className="w-full h-full"
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        dangerouslySetInnerHTML={{ __html: svg
          .replace(/width="[^"]*"/, 'width="100%"')
          .replace(/height="[^"]*"/, 'height="100%"')
          .replace(/<svg/, '<svg preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%"')
        }}
      />
      {/* Légende */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-2"
        style={{ background: "linear-gradient(to top, rgba(26,10,0,0.6), transparent)" }}>
        <p className="text-xs font-medium" style={{ color: "rgba(232,201,138,0.9)" }}>
          🎨 {scene.titre}
        </p>
      </div>
    </div>
  );
}
