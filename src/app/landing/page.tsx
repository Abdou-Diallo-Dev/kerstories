// src/app/landing/page.tsx
import Link from "next/link";

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "var(--font-dm), sans-serif", background: "#FDF6EC", minHeight: "100vh" }}>

      {/* ── Nav ── */}
      <nav style={{ background: "rgba(253,246,236,0.96)", borderBottom: "1px solid rgba(139,69,19,0.08)", padding: "0 20px", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50, height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "22px", fontWeight: 700, color: "#8B4513", flexShrink: 0 }}>
          Kër<span style={{ color: "#C4622D", fontStyle: "italic" }}>Stories</span>
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Link href="/login" style={{ fontSize: "13px", color: "#7a6652", textDecoration: "none", fontWeight: 500, display: "none" }} className="sm:block hidden">
            Connexion
          </Link>
          <Link href="/login" style={{ fontSize: "13px", color: "#7a6652", textDecoration: "none", fontWeight: 500, padding: "8px 14px", borderRadius: "8px", border: "1px solid rgba(139,69,19,0.2)" }}>
            Connexion
          </Link>
          <Link href="/register" style={{ background: "#1A0A00", color: "#E8C98A", padding: "9px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
            S&apos;inscrire
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ padding: "52px 20px 40px", maxWidth: "1140px", margin: "0 auto" }}>

        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(196,98,45,0.08)", border: "1px solid rgba(196,98,45,0.18)", color: "#C4622D", fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", padding: "6px 14px", borderRadius: "4px", marginBottom: "24px" }}>
          ✦ Histoires africaines personnalisées
        </div>

        {/* Titre */}
        <h2 style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, color: "#1A0A00", lineHeight: 1.08, letterSpacing: "-1px", marginBottom: "20px", fontSize: "clamp(40px, 10vw, 64px)" }}>
          Ton enfant,{" "}
          <span style={{ color: "#C4622D", fontStyle: "italic" }}>héros d&apos;un conte</span>{" "}
          africain.
        </h2>

        {/* Desc */}
        <p style={{ fontSize: "clamp(15px, 4vw, 17px)", color: "#7a6652", lineHeight: 1.75, marginBottom: "28px", fontWeight: 300, maxWidth: "500px" }}>
          KërStories génère des histoires illustrées qui célèbrent la richesse culturelle africaine et les valeurs essentielles.
        </p>

        {/* CTA */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "340px" }}>
          <Link href="/register" style={{ background: "#C4622D", color: "white", padding: "16px 28px", borderRadius: "10px", fontSize: "16px", fontWeight: 600, textDecoration: "none", textAlign: "center", display: "block" }}>
            Créer une histoire →
          </Link>
          <Link href="#comment" style={{ color: "#7a6652", fontSize: "14px", textDecoration: "none", fontWeight: 500, textAlign: "center", padding: "12px", border: "1.5px solid rgba(139,69,19,0.18)", borderRadius: "10px", display: "block" }}>
            Comment ça marche ↓
          </Link>
        </div>

        {/* Garanties */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "20px" }}>
          {["Gratuit", "Sans carte bancaire", "2 histoires/jour"].map((t) => (
            <span key={t} style={{ fontSize: "12px", color: "#b09880", display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ color: "#2D5016", fontWeight: 700 }}>✓</span> {t}
            </span>
          ))}
        </div>
      </section>

      {/* ── Chiffres ── */}
      <section style={{ borderTop: "1px solid rgba(139,69,19,0.1)", borderBottom: "1px solid rgba(139,69,19,0.1)", background: "white", padding: "28px 20px" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0" }}>
          {[
            { num: "1,200+", label: "Histoires créées" },
            { num: "10",     label: "Cultures africaines" },
            { num: "3",      label: "Langues" },
            { num: "5",      label: "Scènes / histoire" },
          ].map((s, i) => (
            <div key={s.label} style={{ textAlign: "center", padding: "12px 16px", borderRight: i % 2 === 0 ? "1px solid rgba(139,69,19,0.08)" : "none", borderBottom: i < 2 ? "1px solid rgba(139,69,19,0.08)" : "none" }}>
              <p style={{ fontFamily: "var(--font-playfair), serif", fontSize: "32px", fontWeight: 700, color: "#C4622D", lineHeight: 1, marginBottom: "4px" }}>{s.num}</p>
              <p style={{ fontSize: "12px", color: "#b09880" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Comment ça marche ── */}
      <section id="comment" style={{ padding: "60px 20px", maxWidth: "1140px", margin: "0 auto" }}>
        <div style={{ marginBottom: "40px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#C4622D", marginBottom: "10px" }}>PROCESSUS</p>
          <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(30px, 8vw, 44px)", fontWeight: 700, color: "#1A0A00", letterSpacing: "-0.5px", lineHeight: 1.1 }}>
            3 étapes, <span style={{ fontStyle: "italic", color: "#C4622D" }}>une magie</span>
          </h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {[
            { num: "01", icon: "✏️", title: "Personnalise", desc: "Entre le prénom de l'enfant, son âge, son pays d'origine et la valeur à lui enseigner." },
            { num: "02", icon: "✦",  title: "L'IA compose", desc: "En quelques secondes, une histoire unique avec 5 scènes illustrées est créée spécialement." },
            { num: "03", icon: "📖", title: "Vis l'aventure", desc: "Lis, écoute, télécharge en PDF ou sauvegarde dans ta bibliothèque personnelle." },
          ].map((s) => (
            <div key={s.num} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
              <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "40px", fontWeight: 700, color: "rgba(196,98,45,0.15)", lineHeight: 1, flexShrink: 0, width: "52px" }}>{s.num}</div>
              <div>
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>{s.icon}</div>
                <h4 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "20px", fontWeight: 700, color: "#1A0A00", marginBottom: "6px" }}>{s.title}</h4>
                <p style={{ color: "#7a6652", fontSize: "14px", lineHeight: 1.7, fontWeight: 300 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ background: "#1A0A00", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <div style={{ marginBottom: "40px" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#C4622D", marginBottom: "10px" }}>FONCTIONNALITÉS</p>
            <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px, 7vw, 40px)", fontWeight: 700, color: "#E8C98A", letterSpacing: "-0.5px" }}>
              Tout pour un conte <span style={{ fontStyle: "italic" }}>parfait</span>
            </h3>
          </div>
          {/* 2 colonnes sur mobile, 3 sur desktop */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
            {[
              { icon: "🌍", title: "10 cultures",        desc: "Sénégal, Mali, Côte d'Ivoire, Ghana, Kenya et plus." },
              { icon: "🎨", title: "Illustrations",      desc: "Chaque scène illustrée style africain coloré." },
              { icon: "🔊", title: "Audio",              desc: "Narration avec une voix chaleureuse." },
              { icon: "📄", title: "Export PDF",         desc: "Livre illustré complet avec couverture." },
              { icon: "👧", title: "Héros perso",        desc: "L'enfant devient le héros de l'histoire." },
              { icon: "📚", title: "Bibliothèque",       desc: "Sauvegarde et retrouve toutes tes histoires." },
            ].map((f) => (
              <div key={f.title} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(232,201,138,0.08)", borderRadius: "12px", padding: "20px 16px" }}>
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>{f.icon}</div>
                <h4 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "15px", fontWeight: 700, color: "#E8C98A", marginBottom: "6px" }}>{f.title}</h4>
                <p style={{ color: "rgba(232,201,138,0.4)", fontSize: "12px", lineHeight: 1.6, fontWeight: 300 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section style={{ background: "#FDF6EC", padding: "60px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#C4622D", marginBottom: "14px" }}>COMMENCER</p>
          <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(30px, 8vw, 44px)", fontWeight: 700, color: "#1A0A00", marginBottom: "14px", lineHeight: 1.1 }}>
            Raconte l&apos;Afrique<br/>
            <span style={{ fontStyle: "italic", color: "#C4622D" }}>à tes enfants</span>
          </h3>
          <p style={{ color: "#7a6652", fontSize: "15px", marginBottom: "24px", fontWeight: 300 }}>
            Gratuit · Sans carte bancaire · 2 minutes
          </p>
          <Link href="/register" style={{ background: "#C4622D", color: "white", padding: "16px 36px", borderRadius: "10px", fontSize: "16px", fontWeight: 600, textDecoration: "none", display: "inline-block", width: "100%", maxWidth: "320px", textAlign: "center" }}>
            Créer mon compte gratuit →
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "#0D0500", padding: "20px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
        <p style={{ fontFamily: "var(--font-playfair), serif", fontSize: "16px", fontWeight: 700, color: "rgba(232,201,138,0.3)" }}>
          Kër<span style={{ fontStyle: "italic" }}>Stories</span>
        </p>
        <p style={{ color: "rgba(232,201,138,0.2)", fontSize: "11px" }}>© 2026 · Fait avec ❤️ pour les enfants africains</p>
      </footer>
    </div>
  );
}