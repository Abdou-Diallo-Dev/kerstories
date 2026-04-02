import { NextRequest, NextResponse } from "next/server";
import { parseStory } from "@/lib/parseStory";
import { StoryFormData } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";
import { sanitizeGeneratedSvg } from "@/lib/sanitizeSvg";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

function buildStoryPrompt(data: StoryFormData): string {
  const pronoms = data.genre === "fille"
    ? "elle, sa, ses (accords au feminin)"
    : "il, son, ses (accords au masculin)";

  return `Tu es un griot africain expert en contes pour enfants. Cree une histoire personnalisee :

- Heros : ${data.prenom} - c'est un${data.genre === "fille" ? "e" : ""} ${data.genre || "enfant"}
- Pronoms : ${pronoms}
- Age cible : ${data.age} ans
- Pays / Culture : ${data.pays}
- Langue : ${data.langue}
- Type : ${data.type}
- Valeur enseignee : ${data.valeur}

Regles STRICTES :
1. Exactement 5 scenes numerotees
2. Chaque scene : "SCENE [numero] : [titre court]"
3. Environ 80 mots par scene, vivants et imagés
4. Decors, noms, vetements authentiques de ${data.pays}
5. ${data.prenom} est le/la heros/heroïne - utilise TOUJOURS les bons pronoms
6. Vocabulaire simple adapte a ${data.age} ans
7. Terminer par "MORALE : [phrase memorable sur ${data.valeur}]"
8. Langue : ${data.langue}
9. Structure narrative : introduction -> probleme -> action -> climax -> resolution
10. Commence directement par SCENE 1

Genere l'histoire maintenant.`;
}

function buildSvgPrompt(
  sceneTitle: string,
  sceneText: string,
  pays: string,
  prenom: string,
  genre: string
): string {
  return `Tu es un illustrateur expert. Genere un SVG style dessin anime africain Disney/Pixar pour :

Titre : "${sceneTitle}"
Scene : "${sceneText.slice(0, 200)}"
Pays : ${pays} | Heros : ${prenom} (${genre === "fille" ? "fille africaine" : "garcon africain"})

REGLES ABSOLUES :
- Retourne UNIQUEMENT le code SVG brut, zero markdown, zero explication
- viewBox="0 0 800 500"
- Style dessin anime colore, chaleureux, africain authentique
- Couleurs vives : #C4622D, #2D5016, #E8C98A, #1565C0, #FFD700, #FFB347
- Illustre PRECISEMENT la scene decrite
- Personnage principal clairement visible et identifiable
- Decor authentique de ${pays}
- Minimum 25 elements SVG
- PAS de texte dans le SVG
- SVG complet et valide

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">`;
}

async function generateSceneSvg(
  sceneTitle: string,
  sceneText: string,
  pays: string,
  prenom: string,
  genre: string,
  apiKey: string
): Promise<string> {
  try {
    const res = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: buildSvgPrompt(sceneTitle, sceneText, pays, prenom, genre) }],
        temperature: 0.8,
        max_tokens: 2500,
      }),
    });

    if (!res.ok) return "";

    const data = await res.json();
    let svgRaw = data?.choices?.[0]?.message?.content ?? "";
    const match = svgRaw.match(/<svg[\s\S]*?<\/svg>/i);

    if (match) return sanitizeGeneratedSvg(match[0]);

    if (svgRaw.includes("viewBox")) {
      svgRaw = `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">${svgRaw}`;
      const fallbackMatch = svgRaw.match(/<svg[\s\S]*?<\/svg>/i);
      if (fallbackMatch) return sanitizeGeneratedSvg(fallbackMatch[0]);
    }

    return "";
  } catch {
    return "";
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: StoryFormData & { childId?: string } = await req.json();

    if (!body.prenom || !body.pays || !body.age) {
      return NextResponse.json(
        { success: false, error: "Champs requis manquants." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Cle API Groq non configuree." },
        { status: 500 }
      );
    }

    const groqRes = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: buildStoryPrompt(body) }],
        temperature: 0.9,
        max_tokens: 2500,
      }),
    });

    if (!groqRes.ok) {
      return NextResponse.json({ success: false, error: "Erreur API Groq." }, { status: 500 });
    }

    const groqData = await groqRes.json();
    const texte: string = groqData?.choices?.[0]?.message?.content ?? "";
    if (!texte) {
      return NextResponse.json({ success: false, error: "Reponse vide." }, { status: 500 });
    }

    const story = parseStory(texte, body);

    const svgPromises = story.scenes.map((scene) =>
      generateSceneSvg(scene.titre, scene.contenu, body.pays, body.prenom, body.genre || "garcon", apiKey)
    );

    const svgs = await Promise.all(svgPromises);
    const scenesWithSvg = story.scenes.map((scene, i) => ({
      ...scene,
      svgIllustration: sanitizeGeneratedSvg(svgs[i] || ""),
    }));
    const storyWithIllustrations = { ...story, scenes: scenesWithSvg };

    let savedStoryId: string | null = null;

    if (body.childId) {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data: savedStory } = await supabase
            .from("saved_stories")
            .insert({
              user_id: user.id,
              child_id: body.childId,
              title: story.titre,
              content: storyWithIllustrations,
            })
            .select("id")
            .single();

          savedStoryId = savedStory?.id ?? null;
        }
      } catch (e) {
        console.warn("Sauvegarde non bloquante:", e);
      }
    }

    return NextResponse.json({
      success: true,
      story: storyWithIllustrations,
      savedStoryId,
    });
  } catch (err) {
    console.error("Erreur generate-story:", err);
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
