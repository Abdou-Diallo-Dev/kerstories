// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function RegisterPage() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [nom,      setNom]      = useState("");
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const supabase = createClient();

  const inputStyle: React.CSSProperties = {
    width: "100%", border: "1.5px solid rgba(139,69,19,0.2)",
    borderRadius: "10px", padding: "12px 16px",
    fontFamily: "var(--font-dm), sans-serif", fontSize: "15px",
    color: "var(--deep)", background: "var(--cream)", outline: "none",
  };

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) { setError("Le mot de passe doit contenir au moins 6 caractères."); return; }
    setLoading(true); setError("");
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: nom } },
    });
    if (error) { setError(error.message); setLoading(false); return; }
    setSuccess(true);
    setLoading(false);
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options:  { redirectTo: `${window.location.origin}/dashboard` },
    });

    if (error) {
      setError(
        error.message.includes("Unsupported provider")
          ? "Connexion Google indisponible pour le moment. Active le provider Google dans Supabase Authentication > Providers."
          : error.message
      );
      setGoogleLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: "var(--cream)" }}>
        <div className="kente-bar fixed top-0 left-0 right-0" />
        <div className="w-full max-w-md text-center p-10 rounded-2xl" style={{ background: "white", border: "1px solid rgba(139,69,19,0.12)" }}>
          <div className="text-5xl mb-4">📬</div>
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair),serif", color: "var(--earth)" }}>
            Vérifie ton email !
          </h2>
          <p className="text-sm" style={{ color: "#7a6652" }}>
            Un lien de confirmation a été envoyé à <strong>{email}</strong>.<br />
            Clique dessus pour activer ton compte.
          </p>
          <Link href="/login" className="inline-block mt-6 px-6 py-3 rounded-xl font-medium text-sm"
            style={{ background: "var(--deep)", color: "var(--sand)" }}>
            Aller à la connexion
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--cream)" }}>
      <div className="kente-bar" />
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">

          <div className="text-center mb-10">
            <h1 className="text-4xl font-black" style={{ fontFamily: "var(--font-playfair),serif", color: "var(--earth)" }}>
              Kër<span style={{ color: "var(--terracotta)" }}>Stories</span>
            </h1>
            <p className="text-sm mt-2" style={{ color: "#7a6652" }}>Crée ton compte gratuitement</p>
          </div>

          <div className="rounded-2xl p-8" style={{ background: "white", border: "1px solid rgba(139,69,19,0.12)" }}>

            <button onClick={handleGoogle} disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl mb-6 font-medium text-sm"
              style={{ background: "var(--cream)", border: "1.5px solid rgba(139,69,19,0.2)", color: "var(--deep)", cursor: googleLoading ? "not-allowed" : "pointer", opacity: googleLoading ? 0.7 : 1 }}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {googleLoading ? "Connexion Google..." : "Continuer avec Google"}
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px" style={{ background: "rgba(139,69,19,0.15)" }} />
              <span className="text-xs" style={{ color: "#b09880" }}>ou avec email</span>
              <div className="flex-1 h-px" style={{ background: "rgba(139,69,19,0.15)" }} />
            </div>

            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium tracking-widest uppercase" style={{ color: "var(--terracotta)" }}>Nom complet</label>
                <input style={inputStyle} type="text" placeholder="Aminata Diallo"
                  value={nom} onChange={(e) => setNom(e.target.value)} required />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium tracking-widest uppercase" style={{ color: "var(--terracotta)" }}>Email</label>
                <input style={inputStyle} type="email" placeholder="ton@email.com"
                  value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium tracking-widest uppercase" style={{ color: "var(--terracotta)" }}>Mot de passe</label>
                <input style={inputStyle} type="password" placeholder="Min. 6 caractères"
                  value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>

              {error && (
                <p className="text-sm px-4 py-3 rounded-xl" style={{ background: "rgba(196,98,45,0.1)", color: "var(--terracotta)" }}>
                  {error}
                </p>
              )}

              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl font-medium text-base mt-2"
                style={{ background: "var(--deep)", color: "var(--sand)", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
                {loading ? "Création..." : "Créer mon compte"}
              </button>
            </form>
          </div>

          <p className="text-center text-sm mt-6" style={{ color: "#7a6652" }}>
            Déjà un compte ?{" "}
            <Link href="/login" className="font-medium" style={{ color: "var(--terracotta)" }}>
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
