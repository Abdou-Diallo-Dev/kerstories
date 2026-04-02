// src/app/story/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import StoryDisplay from "@/components/StoryDisplay";
import { Story } from "@/lib/types";
import Link from "next/link";

export default function StoryPage() {
  const { id }   = useParams();
  const [story,  setStory]  = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");
  const supabase = createClient();

  useEffect(() => {
    async function fetchStory() {
      const { data, error } = await supabase
        .from("saved_stories")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) { setError("Histoire introuvable."); }
      else { setStory(data.content as Story); }
      setLoading(false);
    }
    if (id) fetchStory();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FDF6EC" }}>
        <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "var(--terracotta) transparent transparent transparent" }} />
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "#FDF6EC" }}>
        <p style={{ color: "var(--terracotta)", fontSize: "18px" }}>📭 {error || "Histoire introuvable."}</p>
        <Link href="/history" style={{ color: "var(--earth)", textDecoration: "underline" }}>← Retour à mes histoires</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="kente-bar" />
      <header className="flex items-center justify-between px-6 py-3 flex-shrink-0" style={{ background: "var(--deep)" }}>
        <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "22px", fontWeight: 900, color: "var(--sand)" }}>
          Kër<span style={{ color: "var(--terracotta)" }}>Stories</span>
        </h1>
        <Link href="/history" style={{ color: "rgba(232,201,138,0.7)", textDecoration: "none", fontSize: "14px" }}>
          ← Mes histoires
        </Link>
      </header>
      <div className="flex-1 overflow-hidden" style={{ background: "var(--cream)" }}>
        <StoryDisplay story={story} storyId={typeof id === "string" ? id : null} onNew={() => window.location.href = "/dashboard"} />
      </div>
    </div>
  );
}
