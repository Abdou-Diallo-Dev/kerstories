// src/components/MobileNav.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <>
      {/* Bouton hamburger */}
      <button
        onClick={() => setOpen(!open)}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", flexDirection: "column", gap: "5px" }}>
        {[0,1,2].map((i) => (
          <span key={i} style={{
            display: "block", width: "22px", height: "2px", background: "var(--sand)",
            borderRadius: "2px", transition: "all 0.25s",
            transform: open
              ? i === 0 ? "rotate(45deg) translate(5px, 5px)"
              : i === 1 ? "scaleX(0)"
              : "rotate(-45deg) translate(5px, -5px)"
              : "none",
          }} />
        ))}
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 40 }} />
      )}

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: "280px",
        background: "#1A0A00", zIndex: 50, padding: "24px",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s ease",
        display: "flex", flexDirection: "column", gap: "8px",
      }}>
        {/* Logo */}
        <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "24px", fontWeight: 700, color: "var(--sand)", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid rgba(232,201,138,0.1)" }}>
          Kër<span style={{ color: "var(--terracotta)", fontStyle: "italic" }}>Stories</span>
        </div>

        {[
          { href: "/dashboard", icon: "✦", label: "Créer une histoire" },
          { href: "/history",   icon: "📚", label: "Mes histoires" },
          { href: "/profile",   icon: "👤", label: "Mon profil" },
          { href: "/admin",     icon: "⚙️", label: "Admin" },
        ].map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", borderRadius: "10px", textDecoration: "none", color: "rgba(232,201,138,0.7)", fontSize: "15px", fontWeight: 400, background: "rgba(232,201,138,0.04)", border: "1px solid rgba(232,201,138,0.06)" }}>
            <span style={{ fontSize: "16px" }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}

        <div style={{ flex: 1 }} />

        {/* User + logout */}
        <div style={{ borderTop: "1px solid rgba(232,201,138,0.1)", paddingTop: "16px" }}>
          <p style={{ color: "rgba(232,201,138,0.4)", fontSize: "12px", marginBottom: "12px", overflow: "hidden", textOverflow: "ellipsis" }}>
            {user?.email}
          </p>
          <button onClick={() => { signOut(); setOpen(false); }}
            style={{ width: "100%", background: "rgba(196,98,45,0.15)", color: "var(--terracotta)", border: "1px solid rgba(196,98,45,0.2)", borderRadius: "8px", padding: "12px", fontSize: "14px", fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-dm), sans-serif" }}>
            Se déconnecter
          </button>
        </div>
      </div>
    </>
  );
}
