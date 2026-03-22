// src/app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

interface AdminStats {
  total_users:   number;
  premium_users: number;
  total_stories: number;
  stories_today: number;
  stories_week:  number;
  errors_today:  number;
}

interface UserRow {
  id:            string;
  full_name:     string;
  role:          string;
  plan:          string;
  total_stories: number;
  created_at:    string;
}

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const [stats,   setStats]   = useState<AdminStats | null>(null);
  const [users,   setUsers]   = useState<UserRow[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tab,     setTab]     = useState<"stats" | "users" | "logs">("stats");
  const [logs,    setLogs]    = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => { if (user) checkAdminAndLoad(); }, [user]);

  async function checkAdminAndLoad() {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user!.id)
        .single();

      console.log("Profile check:", profile, error);

      if (error || !profile || profile.role !== "admin") {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);
      await Promise.all([loadStats(), loadUsers(), loadLogs()]);
    } catch (e) {
      console.error("Admin check error:", e);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }

  async function loadStats() {
    const { data } = await supabase.from("admin_stats").select("*").single();
    if (data) setStats(data);
  }

  async function loadUsers() {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    if (data) setUsers(data);
  }

  async function loadLogs() {
    const { data } = await supabase
      .from("ai_usage_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (data) setLogs(data);
  }

  async function togglePlan(userId: string, currentPlan: string) {
    const newPlan = currentPlan === "premium" ? "free" : "premium";
    await supabase.from("profiles").update({ plan: newPlan }).eq("id", userId);
    setUsers((u) => u.map((p) => p.id === userId ? { ...p, plan: newPlan } : p));
  }

  async function toggleRole(userId: string, currentRole: string) {
    const newRole = currentRole === "admin" ? "user" : "admin";
    await supabase.from("profiles").update({ role: newRole }).eq("id", userId);
    setUsers((u) => u.map((p) => p.id === userId ? { ...p, role: newRole } : p));
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
  }

  const numStyle: React.CSSProperties = {
    fontSize:   "40px",
    fontWeight: 700,
    lineHeight:  1,
    marginBottom: "8px",
    fontFamily: "var(--font-dm), 'Outfit', sans-serif",
    letterSpacing: "-1px",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "13px",
    color: "rgba(255,255,255,0.4)",
    fontWeight: 400,
    fontFamily: "var(--font-dm), sans-serif",
  };

  if (authLoading || loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f0f0f" }}>
      <div className="w-8 h-8 border-2 rounded-full animate-spin"
        style={{ borderColor: "var(--terracotta) transparent transparent transparent" }} />
    </div>
  );

  if (!isAdmin) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "#0f0f0f" }}>
      <p style={{ fontSize: "48px" }}>🔒</p>
      <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "24px", color: "var(--earth)" }}>
        Accès refusé
      </h2>
      <p style={{ color: "#b09880" }}>Tu n&apos;as pas les droits d&apos;accès admin.</p>
      <Link href="/dashboard" style={{ color: "var(--terracotta)", textDecoration: "underline" }}>
        ← Retour au dashboard
      </Link>
    </div>
  );

  const statCards = [
    { label: "Utilisateurs total",     val: stats?.total_users   ?? 0, color: "#E8C98A" },
    { label: "Comptes Premium",        val: stats?.premium_users ?? 0, color: "#FFD700" },
    { label: "Histoires totales",      val: stats?.total_stories ?? 0, color: "#C4622D" },
    { label: "Histoires aujourd'hui",  val: stats?.stories_today ?? 0, color: "#4CAF50" },
    { label: "Histoires cette semaine",val: stats?.stories_week  ?? 0, color: "#2196F3" },
    { label: "Erreurs aujourd'hui",    val: stats?.errors_today  ?? 0, color: "#f44336" },
  ];

  const convRate = stats?.total_users
    ? Math.round((( stats.premium_users) / stats.total_users) * 100)
    : 0;

  return (
    <div style={{ background: "#0f0f0f", minHeight: "100vh", color: "white" }}>

      {/* Header */}
      <header style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" style={{ fontFamily: "var(--font-playfair), serif", fontSize: "22px", fontWeight: 700, color: "var(--sand)", textDecoration: "none" }}>
            Kër<span style={{ color: "var(--terracotta)", fontStyle: "italic" }}>Stories</span>
          </Link>
          <span style={{ background: "rgba(196,98,45,0.2)", color: "var(--terracotta)", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "4px", letterSpacing: "2px" }}>
            ADMIN
          </span>
        </div>
        <Link href="/dashboard" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", fontSize: "13px" }}>
          ← Dashboard
        </Link>
      </header>

      <div style={{ padding: "32px", maxWidth: "1200px", margin: "0 auto" }}>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(["stats", "users", "logs"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              style={{
                padding: "10px 24px", borderRadius: "8px", fontSize: "13px",
                fontWeight: 600, border: "none", cursor: "pointer",
                background: tab === t ? "var(--terracotta)" : "rgba(255,255,255,0.06)",
                color: tab === t ? "white" : "rgba(255,255,255,0.5)",
                fontFamily: "var(--font-dm), sans-serif",
              }}>
              {t === "stats" ? "📊 Statistiques" : t === "users" ? "👥 Utilisateurs" : "🔍 Logs IA"}
            </button>
          ))}
        </div>

        {/* ── Stats ── */}
        {tab === "stats" && (
          <div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {statCards.map((s) => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", padding: "28px 24px" }}>
                  <p style={{ ...numStyle, color: s.color }}>{s.val}</p>
                  <p style={labelStyle}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Taux de conversion */}
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", padding: "28px 24px" }}>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: 600, letterSpacing: "2px", marginBottom: "20px", fontFamily: "var(--font-dm), sans-serif" }}>
                TAUX DE CONVERSION FREE → PREMIUM
              </p>
              <div className="flex items-center gap-4">
                <div style={{ flex: 1, height: "10px", background: "rgba(255,255,255,0.08)", borderRadius: "5px", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: "5px", background: "var(--terracotta)", width: `${convRate}%`, transition: "width 0.8s ease" }} />
                </div>
                <span style={{ fontSize: "28px", fontWeight: 700, color: "var(--terracotta)", fontFamily: "var(--font-dm), sans-serif", minWidth: "60px" }}>
                  {convRate}%
                </span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", marginTop: "10px", fontFamily: "var(--font-dm), sans-serif" }}>
                {stats?.premium_users ?? 0} premium / {stats?.total_users ?? 0} utilisateurs
              </p>
            </div>
          </div>
        )}

        {/* ── Utilisateurs ── */}
        {tab === "users" && (
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", overflow: "hidden" }}>
            <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: 600, letterSpacing: "2px", fontFamily: "var(--font-dm), sans-serif" }}>
                {users.length} UTILISATEURS
              </p>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {["Nom", "ID", "Plan", "Rôle", "Histoires", "Inscrit le", "Actions"].map((h) => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.25)", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-dm), sans-serif" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td style={{ padding: "14px 16px", fontSize: "14px", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-dm), sans-serif" }}>
                        {u.full_name || <span style={{ color: "rgba(255,255,255,0.2)" }}>—</span>}
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: "12px", color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
                        {u.id.slice(0, 8)}...
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{
                          background: u.plan === "premium" ? "rgba(255,215,0,0.12)" : "rgba(255,255,255,0.06)",
                          color: u.plan === "premium" ? "#FFD700" : "rgba(255,255,255,0.35)",
                          fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "4px",
                          fontFamily: "var(--font-dm), sans-serif", letterSpacing: "0.5px",
                        }}>
                          {u.plan === "premium" ? "⭐ PREMIUM" : "FREE"}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{
                          background: u.role === "admin" ? "rgba(196,98,45,0.15)" : "rgba(255,255,255,0.04)",
                          color: u.role === "admin" ? "var(--terracotta)" : "rgba(255,255,255,0.25)",
                          fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "4px",
                          fontFamily: "var(--font-dm), sans-serif", letterSpacing: "0.5px",
                        }}>
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: "16px", fontWeight: 700, color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-dm), sans-serif" }}>
                        {u.total_stories ?? 0}
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: "12px", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-dm), sans-serif" }}>
                        {formatDate(u.created_at)}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div className="flex gap-2">
                          <button onClick={() => togglePlan(u.id, u.plan)}
                            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "none", borderRadius: "6px", padding: "6px 12px", fontSize: "12px", cursor: "pointer", fontWeight: 500, fontFamily: "var(--font-dm), sans-serif" }}>
                            {u.plan === "premium" ? "→ Free" : "→ Premium"}
                          </button>
                          <button onClick={() => toggleRole(u.id, u.role)}
                            style={{ background: "rgba(196,98,45,0.1)", color: "var(--terracotta)", border: "none", borderRadius: "6px", padding: "6px 12px", fontSize: "12px", cursor: "pointer", fontWeight: 500, fontFamily: "var(--font-dm), sans-serif" }}>
                            {u.role === "admin" ? "→ User" : "→ Admin"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Logs IA ── */}
        {tab === "logs" && (
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", overflow: "hidden" }}>
            <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: 600, letterSpacing: "2px", fontFamily: "var(--font-dm), sans-serif" }}>
                {logs.length} DERNIERS APPELS IA
              </p>
            </div>
            {logs.length === 0 ? (
              <div style={{ padding: "48px", textAlign: "center", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-dm), sans-serif" }}>
                Aucun log disponible
              </div>
            ) : (
              <div style={{ maxHeight: "600px", overflowY: "auto" }}>
                {logs.map((log) => (
                  <div key={log.id} style={{ padding: "14px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", gap: "16px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: log.success ? "#4CAF50" : "#f44336", flexShrink: 0 }} />
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", width: "160px", flexShrink: 0, fontFamily: "var(--font-dm), sans-serif" }}>
                      {new Date(log.created_at).toLocaleString("fr-FR")}
                    </span>
                    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", flex: 1, fontFamily: "var(--font-dm), sans-serif" }}>
                      {log.action}
                    </span>
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>
                      {log.model || "—"}
                    </span>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: log.duration_ms > 5000 ? "#FF9800" : "rgba(255,255,255,0.3)", fontFamily: "var(--font-dm), sans-serif" }}>
                      {log.duration_ms}ms
                    </span>
                    {log.error_msg && (
                      <span style={{ fontSize: "11px", color: "#f44336", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "var(--font-dm), sans-serif" }}>
                        {log.error_msg}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}