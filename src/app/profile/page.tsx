// src/app/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

interface Profile {
  full_name:    string;
  role:         string;
  plan:         string;
  total_stories: number;
  stories_today: number;
  created_at:   string;
}

export default function ProfilePage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [profile,  setProfile]  = useState<Profile | null>(null);
  const [name,     setName]     = useState("");
  const [saving,   setSaving]   = useState(false);
  const [saved,    setSaved]    = useState(false);
  const [loading,  setLoading]  = useState(true);
  const supabase = createClient();

  useEffect(() => { if (user) fetchProfile(); }, [user]);

  async function fetchProfile() {
    const { data } = await supabase.from("profiles").select("*").eq("id", user!.id).single();
    if (data) { setProfile(data); setName(data.full_name || ""); }
    setLoading(false);
  }

  async function saveProfile() {
    setSaving(true);
    await supabase.from("profiles").update({ full_name: name }).eq("id", user!.id);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    setSaving(false);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", border: "1.5px solid rgba(139,69,19,0.2)", borderRadius: "10px",
    padding: "12px 16px", fontFamily: "var(--font-dm), sans-serif", fontSize: "15px",
    color: "var(--deep)", background: "var(--cream)", outline: "none",
  };

  if (authLoading || loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--cream)" }}>
      <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "var(--terracotta) transparent transparent transparent" }} />
    </div>
  );

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <div className="kente-bar" />
      <header className="flex items-center justify-between px-8 py-4" style={{ background: "var(--deep)" }}>
        <Link href="/dashboard" style={{ fontFamily: "var(--font-playfair), serif", fontSize: "22px", fontWeight: 700, color: "var(--sand)", textDecoration: "none" }}>
          Kër<span style={{ color: "var(--terracotta)" }}>Stories</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" style={{ color: "rgba(232,201,138,0.7)", textDecoration: "none", fontSize: "14px" }}>← Dashboard</Link>
          <Link href="/history"   style={{ color: "rgba(232,201,138,0.7)", textDecoration: "none", fontSize: "14px" }}>📚 Mes histoires</Link>
        </div>
      </header>

      <div style={{ maxWidth: "640px", margin: "48px auto", padding: "0 24px" }}>

        {/* Avatar + nom */}
        <div className="flex items-center gap-5 mb-8">
          <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "var(--terracotta)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: 700, color: "white", fontFamily: "var(--font-playfair), serif", flexShrink: 0 }}>
            {(name || user?.email || "?")[0].toUpperCase()}
          </div>
          <div>
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "26px", fontWeight: 700, color: "var(--earth)", marginBottom: "4px" }}>
              {name || "Mon profil"}
            </h2>
            <p style={{ color: "#b09880", fontSize: "14px" }}>{user?.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Histoires créées", val: profile?.total_stories ?? 0 },
            { label: "Aujourd'hui",      val: profile?.stories_today ?? 0 },
            { label: "Plan",             val: profile?.plan === "premium" ? "Premium ⭐" : "Gratuit" },
          ].map((s) => (
            <div key={s.label} style={{ background: "white", borderRadius: "12px", padding: "20px", border: "1px solid rgba(139,69,19,0.1)", textAlign: "center" }}>
              <p style={{ fontSize: "24px", fontWeight: 700, color: "var(--terracotta)", fontFamily: "var(--font-playfair), serif", marginBottom: "4px" }}>{s.val}</p>
              <p style={{ fontSize: "12px", color: "#b09880", fontWeight: 400 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Formulaire */}
        <div style={{ background: "white", borderRadius: "16px", padding: "32px", border: "1px solid rgba(139,69,19,0.1)", marginBottom: "20px" }}>
          <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "20px", fontWeight: 700, color: "var(--earth)", marginBottom: "24px" }}>
            Informations personnelles
          </h3>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--terracotta)" }}>Nom complet</label>
              <input style={inputStyle} type="text" placeholder="Ton prénom et nom" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--terracotta)" }}>Email</label>
              <input style={{ ...inputStyle, opacity: 0.6, cursor: "not-allowed" }} type="email" value={user?.email || ""} disabled />
            </div>
            <button onClick={saveProfile} disabled={saving}
              style={{ background: "var(--deep)", color: "var(--sand)", border: "none", borderRadius: "10px", padding: "14px 24px", fontSize: "15px", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1, fontFamily: "var(--font-dm), sans-serif" }}>
              {saved ? "✓ Sauvegardé !" : saving ? "Sauvegarde..." : "Sauvegarder"}
            </button>
          </div>
        </div>

        {/* Plan */}
        {profile?.plan === "free" && (
          <div style={{ background: "linear-gradient(135deg, #1A0A00, #5a2e0a)", borderRadius: "16px", padding: "28px 32px", marginBottom: "20px" }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ color: "var(--sand)", fontSize: "18px", fontWeight: 700, fontFamily: "var(--font-playfair), serif", marginBottom: "6px" }}>Passe en Premium ⭐</p>
                <p style={{ color: "rgba(232,201,138,0.6)", fontSize: "14px" }}>Histoires illimitées · Audio · PDF</p>
              </div>
              <button style={{ background: "var(--terracotta)", color: "white", border: "none", borderRadius: "10px", padding: "12px 24px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
                Bientôt →
              </button>
            </div>
          </div>
        )}

        {/* Danger zone */}
        <div style={{ background: "white", borderRadius: "16px", padding: "24px 32px", border: "1px solid rgba(196,98,45,0.15)" }}>
          <h4 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "16px", fontWeight: 700, color: "var(--earth)", marginBottom: "16px" }}>Actions</h4>
          <div className="flex gap-3">
            <button onClick={signOut}
              style={{ background: "rgba(196,98,45,0.08)", color: "var(--terracotta)", border: "1px solid rgba(196,98,45,0.2)", borderRadius: "8px", padding: "10px 20px", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
