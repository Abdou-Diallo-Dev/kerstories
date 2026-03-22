// src/app/api/generate-story/route.ts
import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { parseStory } from "@/lib/parseStory";
import { StoryFormData } from "@/lib/types";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function buildPrompt(data: StoryFormData): string {
  return `Tu es un griot africain expert en contes pour enfants. Crée une histoire personnalisée avec ces paramètres :

- Héros : ${data.prenom}
- Âge cible : ${data.age} ans
- Pays / Culture : ${data.pays}
- Langue : ${data.langue}
- Type : ${data.type}
- Valeur enseignée : ${data.valeur}

Règles STRICTES :
1. L'histoire doit avoir exactement 4 scènes numérotées
2. Chaque scène commence par "SCÈNE [numéro] : [titre court en majuscules]"
3. Environ 100 mots par scène, phrases simples et vivantes
4. Décors, noms, vêtements, nourriture 100% authentiques de ${data.pays}
5. L'enfant ${data.prenom} est le héros principal de l'histoire
6. Vocabulaire adapté à ${data.age} ans
7. Terminer par "MORALE : [une phrase courte et mémorable sur ${data.valeur}]"
8. Narration en ${data.langue} uniquement
9. Ton chaleureux, vivant, avec des détails sensoriels africains (odeurs, sons, couleurs)
10. Pas d'introduction ni de commentaire — commence directement par SCÈNE 1

Génère l'histoire maintenant.`;
}

export async function POST(req: NextRequest) {
  try {
    const body: StoryFormData = await req.json();

    // Validation basique
    if (!body.prenom || !body.pays || !body.age) {
      return NextResponse.json(
        { success: false, error: "Champs requis manquants." },
        { status: 400 }
      );
    }

    const message = await anthropic.messages.create({
      model:      "claude-opus-4-5",
      max_tokens: 1500,
      messages:   [{ role: "user", content: buildPrompt(body) }],
    });

    const texte = message.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { type: "text"; text: string }).text)
      .join("");

    const story = parseStory(texte, body);

    return NextResponse.json({ success: true, story });
  } catch (err) {
    console.error("Erreur API generate-story:", err);
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
