"use client";

import { Story } from "@/lib/types";
import { sanitizeGeneratedSvg } from "@/lib/sanitizeSvg";

interface PdfExportProps {
  story: Story;
}

export default function PdfExport({ story }: PdfExportProps) {
  function exportPDF() {
    const { meta, scenes, morale } = story;
    const ageLabel = meta.age === "3-5" ? "3-5 ans" : meta.age === "6-8" ? "6-8 ans" : "9-12 ans";

    const scenesHtml = scenes.map((scene) => `
      <div class="scene-page">
        <div class="scene-header">
          <span class="scene-num">Scene ${scene.num}</span>
          <h2 class="scene-title">${scene.titre}</h2>
        </div>
        ${scene.svgIllustration ? `
          <div class="illustration">
            ${sanitizeGeneratedSvg(scene.svgIllustration).replace(/<svg\b([^>]*)>/i, '<svg$1 width="100%" height="auto">')}
          </div>
        ` : `<div class="illustration-placeholder">🌍</div>`}
        <p class="scene-text">${scene.contenu}</p>
      </div>
    `).join("");

    const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"/>
  <title>${story.titre}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'DM Sans', sans-serif; background: #FDF6EC; color: #1A0A00; }
    .cover {
      width: 210mm; min-height: 297mm;
      background: linear-gradient(135deg, #1A0A00 0%, #5C2A0A 100%);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 60px 40px; text-align: center; page-break-after: always;
    }
    .cover-tag { background: rgba(196,98,45,0.3); color: #E8C98A; font-size: 11px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; padding: 8px 20px; border-radius: 20px; margin-bottom: 32px; }
    .cover-title { font-family: 'Playfair Display', serif; font-size: 52px; font-weight: 900; color: #E8C98A; line-height: 1.2; margin-bottom: 24px; }
    .cover-meta { color: rgba(232,201,138,0.6); font-size: 16px; }
    .cover-brand { position: absolute; bottom: 40px; color: rgba(232,201,138,0.3); font-size: 13px; }
    .scene-page {
      width: 210mm; min-height: 297mm;
      padding: 40px; background: #FDF6EC;
      page-break-after: always;
      display: flex; flex-direction: column; gap: 24px;
    }
    .scene-header { border-bottom: 2px solid rgba(139,69,19,0.15); padding-bottom: 16px; }
    .scene-num { font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #D4900A; display: block; margin-bottom: 6px; }
    .scene-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: #8B4513; }
    .illustration { border-radius: 12px; overflow: hidden; max-height: 240px; }
    .illustration-placeholder { height: 200px; background: linear-gradient(135deg, #C4622D, #E8C98A); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 64px; }
    .scene-text { font-size: 16px; line-height: 1.9; color: #2d1a0a; flex: 1; }
    .morale-page {
      width: 210mm; min-height: 297mm;
      background: #1A0A00;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 60px; text-align: center;
    }
    .morale-label { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #D4900A; margin-bottom: 24px; }
    .morale-text { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #E8C98A; line-height: 1.5; max-width: 500px; }
    .morale-brand { margin-top: 48px; color: rgba(232,201,138,0.3); font-size: 13px; }
  </style>
</head>
<body>
  <div class="cover">
    <div class="cover-tag">KerStories · ${meta.pays}</div>
    <h1 class="cover-title">${story.titre}</h1>
    <p class="cover-meta">${ageLabel} · ${meta.langue} · ${meta.valeur}</p>
    <p class="cover-brand">kerstories.app</p>
  </div>

  ${scenesHtml}

  <div class="morale-page">
    <p class="morale-label">La Morale</p>
    <p class="morale-text">${morale || `Le ${meta.valeur} est la plus grande force qui soit.`}</p>
    <p class="morale-brand">Cree avec KerStories · kerstories.app</p>
  </div>
</body>
</html>`;

    const win = window.open("", "_blank");
    if (!win) return;

    win.document.write(html);
    win.document.close();
    win.onload = () => {
      setTimeout(() => {
        win.print();
      }, 500);
    };
  }

  return (
    <button
      onClick={exportPDF}
      style={{
        background: "white",
        border: "1.5px solid rgba(139,69,19,0.2)",
        borderRadius: "10px",
        padding: "10px 20px",
        fontFamily: "var(--font-dm), sans-serif",
        fontSize: "13px",
        fontWeight: 500,
        color: "#5a3e28",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Telecharger PDF
    </button>
  );
}
