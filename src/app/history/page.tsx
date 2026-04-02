// src/app/history/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { SavedStory } from "@/lib/types";
import Link from "next/link";
import { toResponsiveSvg } from "@/lib/sanitizeSvg";

export default function HistoryPage() {
  const { user, loading: authLoading } = useAuth();
  const [stories,  setStories]  = useState<SavedStory[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    if (user) fetchStories();
  }, [user]);

  async function fetchStories() {
    setLoading(true);
    const { data } = await supabase
      .from("saved_stories")
      .select("*")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false });
    setStories(data || []);
    setLoading(false);
  }

  async function deleteStory(id: string) {
    setDeleting(id);
    await supabase.from("saved_stories").delete().eq("id", id);
    setStories((p) => p.filter((s) => s.id !== id));
    setDeleting(null);
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FDF6EC" }}>
        <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "var(--terracotta) transparent transparent transparent" }} />
      </div>
    );
  }

  return (
    <div style={{ background: "#FDF6EC", minHeight: "100vh" }}>
      {/* Header */}
      <div className="kente-bar" />
      <header className="flex items-center justify-between px-8 py-4" style={{ background: "var(--deep)" }}>
        <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "24px", fontWeight: 900, color: "var(--sand)" }}>
          Kër<span style={{ color: "var(--terracotta)" }}>Stories</span>
        </h1>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" style={{ color: "rgba(232,201,138,0.7)", textDecoration: "none", fontSize: "14px" }}>
            ← Créer une histoire
          </Link>
        </div>
      </header>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px" }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "32px", fontWeight: 900, color: "var(--earth)", marginBottom: "4px" }}>
              Mes histoires
            </h2>
            <p style={{ color: "#b09880", fontSize: "14px" }}>{stories.length} histoire{stories.length !== 1 ? "s" : ""} sauvegardée{stories.length !== 1 ? "s" : ""}</p>
          </div>
          <Link href="/dashboard"
            style={{ background: "var(--deep)", color: "var(--sand)", padding: "12px 24px", borderRadius: "10px", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>
            + Nouvelle histoire
          </Link>
        </div>

        {stories.length === 0 ? (
          <div className="text-center py-20">
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>📚</div>
            <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "24px", color: "#8B6644", marginBottom: "8px" }}>
              Aucune histoire sauvegardée
            </h3>
            <p style={{ color: "#b09880", marginBottom: "24px" }}>Crée ta première histoire et elle apparaîtra ici.</p>
            <Link href="/dashboard" style={{ background: "var(--terracotta)", color: "white", padding: "12px 28px", borderRadius: "10px", textDecoration: "none", fontWeight: 600 }}>
              Créer une histoire
            </Link>
          </div>
        ) : (
          <div className="history-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.map((s) => {
              const story = s.content;
              const meta  = story?.meta;
              const flagMap: Record<string, string> = {
                "Sénégal": "🇸🇳", "Mali": "🇲🇱", "Côte d'Ivoire": "🇨🇮",
                "Guinée": "🇬🇳", "Burkina Faso": "🇧🇫", "Ghana": "🇬🇭",
                "Nigeria": "🇳🇬", "Cameroun": "🇨🇲", "Kenya": "🇰🇪",
              };
              const flag = meta?.pays ? (flagMap[meta.pays] || "🌍") : "🌍";

              return (
                <div key={s.id} style={{ background: "white", borderRadius: "16px", border: "1px solid rgba(139,69,19,0.12)", overflow: "hidden", transition: "transform 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
                  {/* Illustration preview */}
                  <div style={{ height: "140px", background: "linear-gradient(135deg, #C4622D, #E8C98A)", position: "relative", overflow: "hidden" }}>
                    {story?.scenes?.[0]?.svgIllustration ? (
                      <div style={{ width: "100%", height: "100%", transform: "scale(1.1)", transformOrigin: "center" }}
                        dangerouslySetInnerHTML={{
                          __html: toResponsiveSvg(story.scenes[0].svgIllustration)
                        }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ fontSize: "48px" }}>📖</div>
                    )}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,10,0,0.5), transparent)" }} />
                    <span style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(26,10,0,0.6)", color: "var(--sand)", fontSize: "11px", padding: "4px 10px", borderRadius: "20px" }}>
                      {flag} {meta?.pays}
                    </span>
                  </div>

                  {/* Infos */}
                  <div style={{ padding: "20px" }}>
                    <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "18px", fontWeight: 700, color: "var(--earth)", marginBottom: "6px" }}>
                      {s.title}
                    </h3>
                    <div className="flex gap-2 flex-wrap mb-3">
                      {meta?.valeur && (
                        <span style={{ background: "rgba(196,98,45,0.1)", color: "var(--terracotta)", fontSize: "11px", padding: "3px 10px", borderRadius: "20px", fontWeight: 500 }}>
                          {meta.valeur}
                        </span>
                      )}
                      {meta?.age && (
                        <span style={{ background: "rgba(45,80,22,0.1)", color: "var(--savanna)", fontSize: "11px", padding: "3px 10px", borderRadius: "20px", fontWeight: 500 }}>
                          {meta.age} ans
                        </span>
                      )}
                    </div>
                    <p style={{ color: "#b09880", fontSize: "12px", marginBottom: "16px" }}>
                      {formatDate(s.created_at)}
                    </p>
                    <div className="flex gap-2">
                      <Link href={`/story/${s.id}`}
                        style={{ flex: 1, background: "var(--deep)", color: "var(--sand)", padding: "10px", borderRadius: "8px", textDecoration: "none", fontSize: "13px", fontWeight: 600, textAlign: "center" }}>
                        📖 Lire
                      </Link>
                      <button
                        onClick={() => deleteStory(s.id)}
                        disabled={deleting === s.id}
                        style={{ background: "rgba(196,98,45,0.08)", color: "var(--terracotta)", border: "none", padding: "10px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}>
                        {deleting === s.id ? "..." : "🗑️"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
