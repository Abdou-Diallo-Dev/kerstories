// src/app/children/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface StoryRecord {
  id:         string;
  title:      string;
  type:       string;
  valeur:     string;
  morale:     string;
  scenes:     { num: string; titre: string; contenu: string }[];
  created_at: string;
}

interface Child {
  id:           string;
  name:         string;
  age:          string;
  pays:         string;
  avatar_color: string;
}

export default function ChildStoriesPage() {
  const params   = useParams();
  const router   = useRouter();
  const supabase = createClient();
  const childId  = params.id as string;

  const [child,    setChild]    = useState<Child | null>(null);
  const [stories,  setStories]  = useState<StoryRecord[]>([]);
  const [selected, setSelected] = useState<StoryRecord | null>(null);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    const [{ data: childData }, { data: storiesData }] = await Promise.all([
      supabase.from("children").select("*").eq("id", childId).single(),
      supabase.from("stories").select("*").eq("child_id", childId).order("created_at", { ascending: false }),
    ]);
    setChild(childData);
    setStories(storiesData ?? []);
    setLoading(false);
  }

  async function deleteStory(id: string) {
    if (!confirm("Supprimer cette histoire ?")) return;
    await supabase.from("stories").delete().eq("id", id);
    setStories(s => s.filter(x => x.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--cream)" }}>
      <div className="flex gap-2">
        {[0,1,2].map(i => <span key={i} className="block w-2.5 h-2.5 rounded-full" style={{ background: "var(--terracotta)", animation: `dotBounce 1.2s infinite ${i*0.2}s` }}/>)}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)" }}>
      <div className="kente-bar"/>
      <header className="flex items-center gap-4 px-8 py-4" style={{ background: "var(--deep)" }}>
        <button onClick={() => router.push("/dashboard")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(232,201,138,0.5)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: child?.avatar_color ?? "var(--terracotta)" }}>
            {child?.name[0].toUpperCase()}
          </div>
          <div>
            <p className="text-base font-bold" style={{ color: "var(--sand)", fontFamily: "var(--font-playfair), serif" }}>{child?.name}</p>
            <p className="text-xs" style={{ color: "rgba(232,201,138,0.5)" }}>{stories.length} histoire{stories.length > 1 ? "s" : ""}</p>
          </div>
        </div>
        <Link href={`/?child=${childId}&name=${encodeURIComponent(child?.name ?? "")}&age=${child?.age}&pays=${encodeURIComponent(child?.pays ?? "")}`}
          className="ml-auto text-xs px-3 py-1.5 rounded-lg"
          style={{ background: "rgba(196,98,45,0.2)", color: "var(--sand)" }}>
          + Nouvelle histoire
        </Link>
      </header>

      <div className="flex h-[calc(100vh-5rem)]">
        {/* Liste histoires */}
        <aside className="w-80 overflow-y-auto bg-white" style={{ borderRight: "1px solid rgba(139,69,19,0.1)" }}>
          {stories.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 px-6 text-center">
              <p className="text-3xl">📖</p>
              <p className="text-sm font-bold" style={{ color: "#8B6644", fontFamily: "var(--font-playfair), serif" }}>
                Aucune histoire encore
              </p>
              <p className="text-xs" style={{ color: "#b09880" }}>
                Crée la première histoire de {child?.name} !
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {stories.map(story => (
                <button
                  key={story.id}
                  onClick={() => setSelected(story)}
                  className="text-left px-5 py-4 border-b transition-all"
                  style={{
                    borderColor: "rgba(139,69,19,0.08)",
                    background: selected?.id === story.id ? "rgba(196,98,45,0.06)" : "transparent",
                    borderLeft: selected?.id === story.id ? "3px solid var(--terracotta)" : "3px solid transparent",
                    cursor: "pointer",
                  }}
                >
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--earth)", fontFamily: "var(--font-playfair), serif" }}>
                    {story.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(196,98,45,0.1)", color: "var(--terracotta)" }}>
                      {story.type}
                    </span>
                    <span className="text-xs" style={{ color: "#b09880" }}>
                      {new Date(story.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </aside>

        {/* Lecture histoire */}
        <main className="flex-1 overflow-y-auto" style={{ background: "var(--cream)" }}>
          {!selected ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <p className="text-4xl">🌍</p>
              <p className="text-base" style={{ color: "#8B6644", fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>
                Sélectionne une histoire
              </p>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto px-10 py-10 animate-fade-in">
              <div className="flex items-start justify-between mb-8 pb-6" style={{ borderBottom: "2px solid rgba(139,69,19,0.1)" }}>
                <div>
                  <span className="inline-block text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full mb-3" style={{ background: "rgba(196,98,45,0.1)", color: "var(--terracotta)" }}>
                    {selected.type} · {selected.valeur}
                  </span>
                  <h2 className="text-3xl font-black" style={{ fontFamily: "var(--font-playfair), serif", color: "var(--earth)" }}>
                    {selected.title}
                  </h2>
                </div>
                <button onClick={() => deleteStory(selected.id)} className="mt-1 p-2 rounded-lg" style={{ background: "rgba(196,98,45,0.08)", border: "none", cursor: "pointer", color: "var(--terracotta)" }}>
                  🗑
                </button>
              </div>

              {selected.scenes.map((scene, i) => (
                <div key={i} className="mb-8 pl-5" style={{ borderLeft: "3px solid rgba(196,98,45,0.15)" }}>
                  <span className="block text-xs font-medium tracking-widest uppercase mb-1" style={{ color: "var(--sand)" }}>Scène {scene.num}</span>
                  <h3 className="text-base font-bold mb-3" style={{ fontFamily: "var(--font-playfair), serif", color: "var(--earth)" }}>{scene.titre}</h3>
                  <p className="text-sm leading-loose" style={{ color: "#2d1a0a" }}>{scene.contenu}</p>
                </div>
              ))}

              {selected.morale && (
                <div className="rounded-2xl px-7 py-6 mt-8" style={{ background: "var(--deep)" }}>
                  <p className="text-xs font-medium tracking-widest uppercase mb-2" style={{ color: "var(--sand)" }}>Morale</p>
                  <p className="text-lg font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "var(--sand)", lineHeight: 1.5 }}>{selected.morale}</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
