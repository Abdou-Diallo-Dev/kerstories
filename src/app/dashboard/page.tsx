// src/app/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import StoryForm  from "@/components/StoryForm";
import StoryPanel from "@/components/StoryPanel";
import MobileNav  from "@/components/MobileNav";
import { Story, StoryFormData, GenerateResponse, ChildProfile } from "@/lib/types";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [story,        setStory]        = useState<Story | null>(null);
  const [generating,   setGenerating]   = useState(false);
  const [error,        setError]        = useState("");
  const [profiles,     setProfiles]     = useState<ChildProfile[]>([]);
  const [showProfiles, setShowProfiles] = useState(false);
  const [newChildName, setNewChildName] = useState("");
  const [newChildAge,  setNewChildAge]  = useState("6-8");
  const [savingChild,  setSavingChild]  = useState(false);
  const [storyCount,   setStoryCount]   = useState(0);
  const supabase = createClient();

  useEffect(() => { if (user) { fetchProfiles(); fetchStoryCount(); } }, [user]);

  async function fetchProfiles() {
    const { data } = await supabase.from("child_profiles").select("*").eq("user_id", user!.id).order("created_at");
    if (data) setProfiles(data);
  }

  async function fetchStoryCount() {
    const { count } = await supabase.from("saved_stories").select("*", { count: "exact", head: true }).eq("user_id", user!.id);
    setStoryCount(count || 0);
  }

  async function addChild() {
    if (!newChildName.trim()) return;
    setSavingChild(true);
    await supabase.from("child_profiles").insert({ user_id: user!.id, prenom: newChildName.trim(), age: newChildAge, pays: "Sénégal" });
    await fetchProfiles();
    setNewChildName("");
    setSavingChild(false);
  }

  async function deleteChild(id: string) {
    await supabase.from("child_profiles").delete().eq("id", id);
    setProfiles((p) => p.filter((c) => c.id !== id));
  }

  async function handleGenerate(data: StoryFormData) {
    setGenerating(true); setError(""); setStory(null);
    try {
      const res  = await fetch("/api/generate-story", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json: GenerateResponse = await res.json();
      if (!json.success || !json.story) throw new Error(json.error ?? "Erreur inconnue");
      setStory(json.story);
      if (user) {
        await supabase.from("saved_stories").insert({ user_id: user.id, title: json.story.titre, content: json.story });
        fetchStoryCount();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur de génération.");
    } finally { setGenerating(false); }
  }

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--cream)" }}>
      <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "var(--terracotta) transparent transparent transparent" }} />
    </div>
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="kente-bar" />

      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-6 py-3 flex-shrink-0" style={{ background: "var(--deep)" }}>
        <Link href="/landing" style={{ fontFamily: "var(--font-playfair), serif", fontSize: "22px", fontWeight: 700, color: "var(--sand)", textDecoration: "none" }}>
          Kër<span style={{ color: "var(--terracotta)", fontStyle: "italic" }}>Stories</span>
        </Link>

        {/* Desktop nav */}
        <div className="header-desktop-links items-center gap-3 hidden md:flex">
          <Link href="/history"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium"
            style={{ background: "rgba(232,201,138,0.08)", color: "var(--sand)", border: "1px solid rgba(232,201,138,0.12)", textDecoration: "none" }}>
            📚 {storyCount}
          </Link>
          <button onClick={() => setShowProfiles(!showProfiles)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
            style={{ background: showProfiles ? "rgba(196,98,45,0.25)" : "rgba(232,201,138,0.08)", color: "var(--sand)", border: "1px solid rgba(232,201,138,0.12)", cursor: "pointer" }}>
            👨‍👩‍👧 {profiles.length}
          </button>
          <Link href="/profile"
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: "var(--terracotta)", color: "white", textDecoration: "none" }}>
            {user?.email?.[0].toUpperCase()}
          </Link>
          <button onClick={signOut} className="text-xs px-3 py-1.5 rounded-lg"
            style={{ color: "rgba(232,201,138,0.5)", cursor: "pointer", border: "1px solid rgba(232,201,138,0.12)", background: "none" }}>
            Déco
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="header-mobile-menu flex md:hidden">
          <MobileNav />
        </div>
      </header>

      {/* Profils enfants — desktop */}
      {showProfiles && (
        <div className="hidden md:block px-6 py-3 border-b flex-shrink-0" style={{ background: "white", borderColor: "rgba(139,69,19,0.12)" }}>
          <div className="flex flex-wrap gap-3 items-center">
            {profiles.map((child) => (
              <div key={child.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
                style={{ background: "rgba(196,98,45,0.08)", border: "1.5px solid rgba(196,98,45,0.18)" }}>
                <span style={{ color: "var(--earth)", fontWeight: 500 }}>{child.prenom}</span>
                <span style={{ color: "#b09880", fontSize: "11px" }}>{child.age} ans</span>
                <button onClick={() => deleteChild(child.id)} style={{ color: "var(--terracotta)", cursor: "pointer", background: "none", border: "none", fontSize: "12px" }}>✕</button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <input className="px-3 py-1.5 rounded-lg text-sm outline-none"
                style={{ border: "1.5px solid rgba(139,69,19,0.2)", background: "var(--cream)", color: "var(--deep)", width: "120px" }}
                placeholder="Prénom" value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addChild()} />
              <select className="px-2 py-1.5 rounded-lg text-sm outline-none"
                style={{ border: "1.5px solid rgba(139,69,19,0.2)", background: "var(--cream)", color: "var(--deep)" }}
                value={newChildAge} onChange={(e) => setNewChildAge(e.target.value)}>
                <option value="3-5">3–5</option>
                <option value="6-8">6–8</option>
                <option value="9-12">9–12</option>
              </select>
              <button onClick={addChild} disabled={!newChildName.trim()}
                style={{ background: "var(--terracotta)", color: "white", border: "none", padding: "7px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: 500, opacity: !newChildName.trim() ? 0.5 : 1 }}>
                + Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="px-4 py-2 text-sm flex-shrink-0"
          style={{ background: "rgba(196,98,45,0.1)", color: "var(--terracotta)", borderBottom: "1px solid rgba(196,98,45,0.15)" }}>
          ⚠️ {error}
        </div>
      )}

      {/* Layout principal */}
      <div className="dashboard-layout">
        <StoryForm onGenerate={handleGenerate} loading={generating} />
        <StoryPanel story={story} loading={generating} onNew={() => { setStory(null); setError(""); }} />
      </div>
    </div>
  );
}
