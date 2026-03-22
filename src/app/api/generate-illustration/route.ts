// src/app/api/generate-illustration/route.ts
import { NextRequest, NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

function buildSvgPrompt(sceneTitle: string, sceneText: string, pays: string, prenom: string): string {
  return `Tu es un illustrateur expert en dessins animés africains style Disney/Pixar.
Génère un SVG illustré pour cette scène d'histoire pour enfant :

Titre : ${sceneTitle}
Texte : ${sceneText}
Pays : ${pays}
Héros : ${prenom}

RÈGLES STRICTES :
1. Retourne UNIQUEMENT le code SVG brut, rien d'autre
2. SVG viewBox="0 0 800 500" width="800" height="500"
3. Style dessin animé coloré, chaleureux, africain
4. Inclure : personnages, décor, éléments de la scène
5. Couleurs vives : orange, terracotta, vert savane, bleu ciel, ocre
6. Personnages avec traits africains authentiques
7. Fond avec éléments naturels (baobab, savane, village, ciel)
8. Minimum 15 éléments SVG (rect, circle, path, ellipse)
9. PAS de texte dans le SVG
10. Code SVG complet et valide

SVG :`;
}

export async function POST(req: NextRequest) {
  try {
    const { sceneTitle, sceneText, pays, prenom } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, error: "Clé Groq manquante." }, { status: 500 });
    }

    const res = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model:       "llama-3.3-70b-versatile",
        messages:    [{ role: "user", content: buildSvgPrompt(sceneTitle, sceneText, pays, prenom) }],
        temperature: 0.7,
        max_tokens:  3000,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ success: false, error: "Erreur Groq." }, { status: 500 });
    }

    const data  = await res.json();
    let svgCode = data?.choices?.[0]?.message?.content ?? "";

    // Nettoyer le SVG — extraire uniquement le tag SVG
    const svgMatch = svgCode.match(/<svg[\s\S]*<\/svg>/i);
    if (svgMatch) {
      svgCode = svgMatch[0];
    } else {
      return NextResponse.json({ success: false, error: "SVG invalide." }, { status: 500 });
    }

    return NextResponse.json({ success: true, svg: svgCode });

  } catch (err) {
    console.error("Erreur generate-illustration:", err);
    return NextResponse.json({ success: false, error: "Erreur interne." }, { status: 500 });
  }
}
