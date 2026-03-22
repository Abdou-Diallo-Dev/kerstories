// src/app/page.tsx
"use client";

import { useState } from "react";
import Header      from "@/components/Header";
import StoryForm   from "@/components/StoryForm";
import StoryPanel  from "@/components/StoryPanel";
import { Story, StoryFormData, GenerateResponse } from "@/lib/types";

export default function Home() {
  const [story,   setStory]   = useState<Story | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  async function handleGenerate(data: StoryFormData) {
    setLoading(true);
    setError("");
    setStory(null);

    try {
      const res  = await fetch("/api/generate-story", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });

      const json: GenerateResponse = await res.json();

      if (!json.success || !json.story) {
        throw new Error(json.error ?? "Erreur inconnue");
      }

      setStory(json.story);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur de génération.";
      setError(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleNew() {
    setStory(null);
    setError("");
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />

      {/* Bandeau erreur global */}
      {error && (
        <div
          className="px-6 py-3 text-sm flex items-center gap-2"
          style={{
            background: "rgba(196,98,45,0.12)",
            color:      "var(--terracotta)",
            borderBottom: "1px solid rgba(196,98,45,0.2)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error} — Vérifie ta clé API ou réessaie.
        </div>
      )}

      {/* Layout principal */}
      <div className="flex flex-1 overflow-hidden">
        <StoryForm onGenerate={handleGenerate} loading={loading} />
        <StoryPanel story={story} loading={loading} onNew={handleNew} />
      </div>
    </div>
  );
}
