// src/app/share/[token]/page.tsx
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function SharePage({ params }: { params: { token: string } }) {
  const supabase = createClient();
  const { data } = await supabase
    .from("saved_stories")
    .select("*")
    .eq("share_token", params.token)
    .eq("shared", true)
    .single();

  if (!data) {
    return (
      <div style={{ minHeight: "100vh", background: "#FDF6EC", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
        <p style={{ fontSize: "48px" }}>📭</p>
        <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "24px", color: "#8B4513" }}>Histoire introuvable</h2>
        <Link href="/landing" style={{ color: "#C4622D", textDecoration: "underline" }}>Créer ma propre histoire →</Link>
      </div>
    );
  }

  const story = data.content;
  const meta  = story?.meta;

  return (
    <div style={{ background: "#FDF6EC", minHeight: "100vh" }}>
      {/* Nav */}
      <nav style={{ background: "#1A0A00", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "22px", fontWeight: 700, color: "#E8C98A" }}>
          Kër<span style={{ color: "#C4622D", fontStyle: "italic" }}>Stories</span>
        </h1>
        <Link href="/register" style={{ background: "#C4622D", color: "white", padding: "10px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
          Créer ma propre histoire →
        </Link>
      </nav>

      <div style={{ maxWidth: "720px", margin: "48px auto", padding: "0 24px" }}>
        {/* Header histoire */}
        <div style={{ marginBottom: "32px" }}>
          <span style={{ background: "rgba(196,98,45,0.1)", color: "#C4622D", fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", padding: "5px 14px", borderRadius: "4px", display: "inline-block", marginBottom: "16px" }}>
            🌍 {meta?.pays} · {meta?.type}
          </span>
          <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "40px", fontWeight: 700, color: "#1A0A00", marginBottom: "8px", lineHeight: 1.15, letterSpacing: "-0.5px" }}>
            {story.titre}
          </h2>
          <div style={{ display: "flex", gap: "16px", color: "#b09880", fontSize: "14px" }}>
            <span>{meta?.age === "3-5" ? "3–5 ans" : meta?.age === "6-8" ? "6–8 ans" : "9–12 ans"}</span>
            <span>·</span><span>{meta?.langue}</span>
            <span>·</span><span>{meta?.valeur}</span>
          </div>
        </div>

        {/* Scènes */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {story.scenes?.map((scene: any, i: number) => (
            <div key={i} style={{ background: "white", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(139,69,19,0.1)" }}>
              {scene.svgIllustration && (
                <div style={{ height: "240px", overflow: "hidden" }}
                  dangerouslySetInnerHTML={{
                    __html: scene.svgIllustration.replace('viewBox="0 0 800 500"', 'viewBox="0 0 800 500" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"')
                  }} />
              )}
              <div style={{ padding: "24px" }}>
                <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#D4900A", display: "block", marginBottom: "6px" }}>Scène {scene.num}</span>
                <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "20px", fontWeight: 700, color: "#8B4513", marginBottom: "12px" }}>{scene.titre}</h3>
                <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#2d1a0a" }}>{scene.contenu}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Morale */}
        {story.morale && (
          <div style={{ background: "#1A0A00", borderRadius: "16px", padding: "32px", marginTop: "32px", textAlign: "center" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#D4900A", marginBottom: "12px" }}>✨ La Morale</p>
            <p style={{ fontFamily: "var(--font-playfair), serif", fontSize: "22px", fontWeight: 700, color: "#E8C98A", lineHeight: 1.5, fontStyle: "italic" }}>{story.morale}</p>
          </div>
        )}

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "48px", padding: "32px", background: "white", borderRadius: "16px", border: "1px solid rgba(139,69,19,0.1)" }}>
          <p style={{ fontFamily: "var(--font-playfair), serif", fontSize: "24px", color: "#8B4513", marginBottom: "8px", fontWeight: 700 }}>Tu veux ta propre histoire ?</p>
          <p style={{ color: "#b09880", fontSize: "14px", marginBottom: "20px" }}>Gratuit · 2 minutes · Sans carte bancaire</p>
          <Link href="/register" style={{ background: "#C4622D", color: "white", padding: "14px 36px", borderRadius: "10px", textDecoration: "none", fontSize: "15px", fontWeight: 600, display: "inline-block" }}>
            Créer mon histoire →
          </Link>
        </div>
      </div>
    </div>
  );
}
