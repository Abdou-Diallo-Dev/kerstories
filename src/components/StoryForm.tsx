// src/components/StoryForm.tsx
"use client";

import { useState } from "react";
import TagButton from "./TagButton";
import {
  PAYS_OPTIONS,
  TYPE_OPTIONS,
  VALEUR_OPTIONS,
  AGE_OPTIONS,
  LANGUE_OPTIONS,
} from "@/lib/constants";
import { StoryFormData } from "@/lib/types";

interface StoryFormProps {
  onGenerate: (data: StoryFormData) => void;
  loading:    boolean;
}

export default function StoryForm({ onGenerate, loading }: StoryFormProps) {
  const [prenom,  setPrenom]  = useState("");
  const [age,     setAge]     = useState<StoryFormData["age"]>("6-8");
  const [pays,    setPays]    = useState("Sénégal");
  const [langue,  setLangue]  = useState<StoryFormData["langue"]>("Français");
  const [type,    setType]    = useState("conte traditionnel");
  const [valeur,  setValeur]  = useState("courage");
  const [error,   setError]   = useState("");

  const inputStyle: React.CSSProperties = {
    width:        "100%",
    border:       "1.5px solid rgba(139,69,19,0.2)",
    borderRadius: "10px",
    padding:      "10px 14px",
    fontFamily:   "var(--font-dm), sans-serif",
    fontSize:     "14px",
    color:        "var(--deep)",
    background:   "var(--cream)",
    outline:      "none",
    appearance:   "none",
  };

  const labelStyle: React.CSSProperties = {
    fontSize:      "11px",
    fontWeight:    500,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color:         "var(--terracotta)",
  };

  function handleSubmit() {
    if (!prenom.trim()) {
      setError("Entre le prénom de l'enfant ✏️");
      return;
    }
    setError("");
    onGenerate({ prenom: prenom.trim(), age, pays, langue, type, valeur });
  }

  return (
    <aside
      className="flex flex-col overflow-y-auto"
      style={{
        background:  "white",
        borderRight: "1px solid rgba(139,69,19,0.12)",
        width:       "400px",
        minWidth:    "320px",
        flexShrink:  0,
      }}
    >
      {/* Titre panneau */}
      <div
        className="px-7 py-6"
        style={{ borderBottom: "1px solid rgba(139,69,19,0.1)" }}
      >
        <h2
          className="text-xl font-bold mb-1"
          style={{ fontFamily: "var(--font-playfair), serif", color: "var(--earth)" }}
        >
          Crée ton histoire
        </h2>
        <p className="text-sm" style={{ color: "#7a6652", fontWeight: 300 }}>
          Remplis les infos, l&apos;IA fait le reste ✨
        </p>
      </div>

      {/* Formulaire */}
      <div className="flex flex-col gap-5 px-7 py-5 flex-1">

        {/* Prénom + Âge */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label style={labelStyle}>Prénom</label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Aminata"
              maxLength={20}
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label style={labelStyle}>Âge</label>
            <select
              style={inputStyle}
              value={age}
              onChange={(e) => setAge(e.target.value as StoryFormData["age"])}
            >
              {AGE_OPTIONS.map((a) => (
                <option key={a.value} value={a.value}>{a.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Pays */}
        <div className="flex flex-col gap-1.5">
          <label style={labelStyle}>Pays / Culture</label>
          <select
            style={inputStyle}
            value={pays}
            onChange={(e) => setPays(e.target.value)}
          >
            {PAYS_OPTIONS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.flag} {p.value}
              </option>
            ))}
          </select>
        </div>

        {/* Langue */}
        <div className="flex flex-col gap-1.5">
          <label style={labelStyle}>Langue</label>
          <select
            style={inputStyle}
            value={langue}
            onChange={(e) => setLangue(e.target.value as StoryFormData["langue"])}
          >
            {LANGUE_OPTIONS.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* Type d'histoire */}
        <div className="flex flex-col gap-2">
          <label style={labelStyle}>Type d&apos;histoire</label>
          <div className="flex flex-wrap gap-2">
            {TYPE_OPTIONS.map((t) => (
              <TagButton
                key={t}
                label={t}
                active={type === t}
                onClick={() => setType(t)}
              />
            ))}
          </div>
        </div>

        {/* Valeur */}
        <div className="flex flex-col gap-2">
          <label style={labelStyle}>Valeur à enseigner</label>
          <div className="flex flex-wrap gap-2">
            {VALEUR_OPTIONS.map((v) => (
              <TagButton
                key={v}
                label={v}
                active={valeur === v}
                onClick={() => setValeur(v)}
              />
            ))}
          </div>
        </div>

        {/* Message d'erreur */}
        {error && (
          <p
            className="text-sm px-4 py-3 rounded-xl"
            style={{
              background:  "rgba(196,98,45,0.1)",
              border:      "1px solid rgba(196,98,45,0.25)",
              color:       "var(--terracotta)",
            }}
          >
            {error}
          </p>
        )}
      </div>

      {/* Bouton Générer */}
      <div className="px-7 pb-7">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-base font-medium transition-all duration-200"
          style={{
            background:  loading ? "#5a3e28" : "var(--deep)",
            color:       "var(--sand)",
            border:      "none",
            cursor:      loading ? "not-allowed" : "pointer",
            fontFamily:  "var(--font-dm), sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          {loading ? (
            <>
              <span
                className="inline-block w-4 h-4 border-2 rounded-full animate-spin"
                style={{ borderColor: "var(--sand) transparent transparent transparent" }}
              />
              Génération en cours...
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
              Générer l&apos;histoire
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
