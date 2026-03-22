// src/app/landing/page.tsx
import Link from "next/link";

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "var(--font-dm), 'Outfit', sans-serif", background: "#FDF6EC", minHeight: "100vh" }}>

      {/* ── Nav ── */}
      <nav style={{ background: "rgba(253,246,236,0.92)", borderBottom: "1px solid rgba(139,69,19,0.08)", padding: "0 56px", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50 }}
        className="flex items-center justify-between h-18" >
        <div style={{ padding: "16px 0" }}>
          <h1 style={{ fontFamily: "var(--font-playfair), 'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 700, color: "#8B4513", letterSpacing: "-0.5px" }}>
            Kër<span style={{ color: "#C4622D", fontStyle: "italic" }}>Stories</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" style={{ fontSize: "15px", color: "#7a6652", textDecoration: "none", fontWeight: 500, letterSpacing: "0.01em" }}>
            Connexion
          </Link>
          <Link href="/register" style={{ background: "#1A0A00", color: "#E8C98A", padding: "11px 28px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.02em" }}>
            Commencer gratuitement
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ padding: "96px 56px 72px", maxWidth: "1140px", margin: "0 auto" }}
        className="grid grid-cols-2 gap-20 items-center">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(196,98,45,0.08)", border: "1px solid rgba(196,98,45,0.2)", color: "#C4622D", fontSize: "12px", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", padding: "7px 18px", borderRadius: "4px", marginBottom: "28px" }}>
            <span>✦</span> Histoires africaines personnalisées
          </div>
          <h2 style={{ fontFamily: "var(--font-playfair), 'Cormorant Garamond', serif", fontSize: "68px", fontWeight: 700, color: "#1A0A00", lineHeight: 1.05, marginBottom: "12px", letterSpacing: "-1.5px" }}>
            Ton enfant,
          </h2>
          <h2 style={{ fontFamily: "var(--font-playfair), 'Cormorant Garamond', serif", fontSize: "68px", fontWeight: 700, color: "#C4622D", lineHeight: 1.05, marginBottom: "12px", letterSpacing: "-1.5px", fontStyle: "italic" }}>
            héros d&apos;un conte
          </h2>
          <h2 style={{ fontFamily: "var(--font-playfair), 'Cormorant Garamond', serif", fontSize: "68px", fontWeight: 700, color: "#1A0A00", lineHeight: 1.05, marginBottom: "32px", letterSpacing: "-1.5px" }}>
            africain.
          </h2>
          <p style={{ fontSize: "18px", color: "#7a6652", lineHeight: 1.75, marginBottom: "40px", maxWidth: "440px", fontWeight: 300, letterSpacing: "0.01em" }}>
            KërStories génère des histoires illustrées qui célèbrent la richesse culturelle africaine et les valeurs essentielles.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/register" style={{ background: "#C4622D", color: "white", padding: "16px 36px", borderRadius: "8px", fontSize: "15px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.02em" }}>
              Créer une histoire →
            </Link>
            <Link href="#comment" style={{ color: "#7a6652", fontSize: "15px", textDecoration: "none", fontWeight: 500, display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1.5px solid rgba(139,69,19,0.25)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>▶</span>
              Comment ça marche
            </Link>
          </div>
          <div style={{ display: "flex", gap: "24px", marginTop: "28px" }}>
            {["Gratuit pour commencer", "Sans carte bancaire", "2 histoires/jour"].map((t) => (
              <span key={t} style={{ fontSize: "12px", color: "#b09880", display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ color: "#2D5016", fontSize: "10px" }}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>

        {/* Illustration hero */}
        <div style={{ position: "relative" }}>
          <div style={{ background: "linear-gradient(145deg, #2D1A08 0%, #8B4513 50%, #C4622D 100%)", borderRadius: "20px", padding: "48px", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }} />
            <svg viewBox="0 0 400 400" style={{ width: "100%", maxWidth: "300px", position: "relative", zIndex: 1 }} xmlns="http://www.w3.org/2000/svg">
              <rect x="30" y="180" width="30" height="150" fill="#5D4037" rx="6"/>
              <ellipse cx="45" cy="170" rx="55" ry="45" fill="#2D5016"/>
              <ellipse cx="20" cy="190" rx="35" ry="28" fill="#388E3C"/>
              <ellipse cx="72" cy="185" rx="38" ry="30" fill="#2E7D32"/>
              <circle cx="330" cy="60" r="35" fill="#FFE082" opacity="0.9"/>
              <circle cx="342" cy="52" r="28" fill="#FFF8E1"/>
              <circle cx="160" cy="40" r="3" fill="#FFD700"/>
              <circle cx="220" cy="25" r="2" fill="#FFD700"/>
              <circle cx="280" cy="50" r="2.5" fill="#FFD700"/>
              <rect x="240" y="240" width="110" height="90" fill="#D2691E" rx="4"/>
              <polygon points="228,240 295,185 362,240" fill="#8B0000"/>
              <rect x="278" y="285" width="28" height="45" fill="#4E342E" rx="3"/>
              <rect y="320" width="400" height="80" fill="#8B6914" opacity="0.4"/>
              <circle cx="195" cy="248" r="22" fill="#795548"/>
              <ellipse cx="195" cy="275" rx="18" ry="22" fill="#1565C0"/>
              <rect x="176" y="295" width="10" height="30" fill="#1565C0" rx="4"/>
              <rect x="198" y="295" width="10" height="30" fill="#1565C0" rx="4"/>
              <rect x="172" y="258" width="8" height="28" fill="#795548" rx="3"/>
              <rect x="215" y="258" width="8" height="28" fill="#795548" rx="3"/>
              <rect x="206" y="265" width="22" height="18" fill="#E8C98A" rx="3"/>
              <circle cx="240" cy="235" r="4" fill="#FFD700" opacity="0.8"/>
              <circle cx="155" cy="230" r="3" fill="#FFD700" opacity="0.6"/>
              <circle cx="250" cy="210" r="5" fill="#FF7043" opacity="0.7"/>
            </svg>
          </div>
          {/* Badge flottant */}
          <div style={{ position: "absolute", bottom: "-20px", left: "-20px", background: "white", borderRadius: "12px", padding: "16px 22px", boxShadow: "0 12px 40px rgba(0,0,0,0.1)", border: "1px solid rgba(139,69,19,0.08)" }}>
            <p style={{ fontSize: "11px", color: "#b09880", marginBottom: "4px", letterSpacing: "1px", textTransform: "uppercase" }}>Histoires créées</p>
            <p style={{ fontSize: "28px", fontWeight: 700, color: "#C4622D", fontFamily: "var(--font-playfair), serif", lineHeight: 1 }}>1,200+</p>
          </div>
          <div style={{ position: "absolute", top: "-16px", right: "-16px", background: "#1A0A00", borderRadius: "10px", padding: "12px 18px" }}>
            <p style={{ fontSize: "13px", color: "#E8C98A", fontWeight: 500 }}>🌍 10 pays africains</p>
          </div>
        </div>
      </section>

      {/* ── Chiffres ── */}
      <section style={{ borderTop: "1px solid rgba(139,69,19,0.1)", borderBottom: "1px solid rgba(139,69,19,0.1)", background: "white", padding: "40px 56px" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }}>
          {[
            { num: "1,200+", label: "Histoires générées" },
            { num: "10",     label: "Cultures africaines" },
            { num: "3",      label: "Langues disponibles" },
            { num: "5",      label: "Scènes par histoire" },
          ].map((s, i) => (
            <div key={s.label} style={{ textAlign: "center", padding: "8px 24px", borderRight: i < 3 ? "1px solid rgba(139,69,19,0.1)" : "none" }}>
              <p style={{ fontFamily: "var(--font-playfair), serif", fontSize: "40px", fontWeight: 700, color: "#C4622D", lineHeight: 1, marginBottom: "6px" }}>{s.num}</p>
              <p style={{ fontSize: "13px", color: "#b09880", fontWeight: 400, letterSpacing: "0.02em" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Comment ça marche ── */}
      <section id="comment" style={{ padding: "96px 56px", maxWidth: "1140px", margin: "0 auto" }}>
        <div style={{ marginBottom: "64px" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#C4622D", marginBottom: "12px" }}>PROCESSUS</p>
          <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "48px", fontWeight: 700, color: "#1A0A00", letterSpacing: "-1px", lineHeight: 1.1 }}>
            3 étapes,<br/><span style={{ fontStyle: "italic", color: "#C4622D" }}>une magie</span>
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-10">
          {[
            { num: "01", icon: "✏️", title: "Personnalise", desc: "Entre le prénom de l'enfant, son âge, son pays d'origine et la valeur à lui enseigner." },
            { num: "02", icon: "✦", title: "L'IA compose", desc: "En quelques secondes, une histoire unique avec 5 scènes illustrées est créée spécialement." },
            { num: "03", icon: "📖", title: "Vis l'aventure", desc: "Lis, écoute, télécharge en PDF ou sauvegarde dans ta bibliothèque personnelle." },
          ].map((s) => (
            <div key={s.num} style={{ position: "relative", paddingTop: "16px" }}>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "72px", fontWeight: 700, color: "rgba(196,98,45,0.07)", position: "absolute", top: "-16px", left: "-8px", lineHeight: 1, userSelect: "none" }}>{s.num}</span>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: "32px", marginBottom: "20px" }}>{s.icon}</div>
                <h4 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "26px", fontWeight: 700, color: "#1A0A00", marginBottom: "12px", letterSpacing: "-0.3px" }}>{s.title}</h4>
                <p style={{ color: "#7a6652", fontSize: "15px", lineHeight: 1.7, fontWeight: 300 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ background: "#1A0A00", padding: "96px 56px" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <div style={{ marginBottom: "64px" }}>
            <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#C4622D", marginBottom: "12px" }}>FONCTIONNALITÉS</p>
            <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "48px", fontWeight: 700, color: "#E8C98A", letterSpacing: "-1px", lineHeight: 1.1 }}>
              Tout pour un conte<br/><span style={{ fontStyle: "italic" }}>parfait</span>
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {[
              { icon: "🌍", title: "10 cultures africaines", desc: "Sénégal, Mali, Côte d'Ivoire, Ghana, Kenya, Nigeria et plus." },
              { icon: "🎨", title: "Illustrations SVG", desc: "Chaque scène illustrée dans un style africain coloré et unique." },
              { icon: "🔊", title: "Narration audio", desc: "Écoute l'histoire racontée avec une voix chaleureuse." },
              { icon: "📄", title: "Export PDF", desc: "Livre illustré complet avec couverture, téléchargeable." },
              { icon: "👧", title: "Héros personnalisé", desc: "L'enfant devient le héros de sa propre aventure africaine." },
              { icon: "📚", title: "Bibliothèque", desc: "Sauvegarde et retrouve toutes tes histoires créées." },
            ].map((f) => (
              <div key={f.title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(232,201,138,0.1)", borderRadius: "12px", padding: "28px" }}>
                <div style={{ fontSize: "28px", marginBottom: "14px" }}>{f.icon}</div>
                <h4 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "18px", fontWeight: 700, color: "#E8C98A", marginBottom: "8px", letterSpacing: "-0.2px" }}>{f.title}</h4>
                <p style={{ color: "rgba(232,201,138,0.5)", fontSize: "14px", lineHeight: 1.65, fontWeight: 300 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section style={{ background: "#FDF6EC", padding: "96px 56px", textAlign: "center", borderTop: "1px solid rgba(139,69,19,0.08)" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#C4622D", marginBottom: "20px" }}>COMMENCER</p>
          <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "52px", fontWeight: 700, color: "#1A0A00", marginBottom: "20px", lineHeight: 1.1, letterSpacing: "-1px" }}>
            Raconte l&apos;Afrique<br/><span style={{ fontStyle: "italic", color: "#C4622D" }}>à tes enfants</span>
          </h3>
          <p style={{ color: "#7a6652", fontSize: "16px", marginBottom: "36px", fontWeight: 300, lineHeight: 1.7 }}>
            Gratuit, sans carte bancaire. Ta première histoire en moins de 2 minutes.
          </p>
          <Link href="/register" style={{ background: "#C4622D", color: "white", padding: "18px 48px", borderRadius: "8px", fontSize: "16px", fontWeight: 600, textDecoration: "none", display: "inline-block", letterSpacing: "0.02em" }}>
            Créer mon compte gratuit →
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "#0D0500", padding: "28px 56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontFamily: "var(--font-playfair), serif", fontSize: "18px", fontWeight: 700, color: "rgba(232,201,138,0.4)" }}>
          Kër<span style={{ fontStyle: "italic" }}>Stories</span>
        </p>
        <p style={{ color: "rgba(232,201,138,0.2)", fontSize: "12px" }}>© 2026 · Fait avec ❤️ pour les enfants africains</p>
      </footer>
    </div>
  );
}
