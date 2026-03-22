// src/lib/parseStory.ts
import { Scene, Story, StoryFormData } from "./types";

export function parseStory(texte: string, meta: StoryFormData): Story {
  const lignes  = texte.split("\n");
  const scenes: Scene[] = [];
  let morale            = "";
  let sceneActuelle: { num: string; titre: string } | null = null;
  let contenuScene: string[] = [];
  let imagePrompt       = "";

  for (const ligne of lignes) {
    const t = ligne.trim();
    if (!t) {
      if (sceneActuelle) contenuScene.push("");
      continue;
    }

    // Détecte SCÈNE N : titre
    const matchScene = t.match(/^SC[EÈ]NE\s*(\d+)\s*[:–\-]\s*(.+)/i);
    if (matchScene) {
      if (sceneActuelle) {
        scenes.push({
          num:         sceneActuelle.num,
          titre:       sceneActuelle.titre,
          contenu:     contenuScene.join("\n").trim(),
          imagePrompt: imagePrompt || undefined,
        });
        contenuScene = [];
        imagePrompt  = "";
      }
      sceneActuelle = { num: matchScene[1], titre: matchScene[2].trim() };
      continue;
    }

    // Détecte IMAGE: description
    const matchImage = t.match(/^IMAGE\s*:\s*(.+)/i);
    if (matchImage) {
      imagePrompt = matchImage[1].trim();
      continue;
    }

    // Détecte MORALE :
    const matchMorale = t.match(/^MORALE\s*[:–\-]\s*(.+)/i);
    if (matchMorale) {
      if (sceneActuelle) {
        scenes.push({
          num:         sceneActuelle.num,
          titre:       sceneActuelle.titre,
          contenu:     contenuScene.join("\n").trim(),
          imagePrompt: imagePrompt || undefined,
        });
        sceneActuelle = null;
        contenuScene  = [];
        imagePrompt   = "";
      }
      morale = matchMorale[1].trim();
      continue;
    }

    if (sceneActuelle) contenuScene.push(t);
  }

  if (sceneActuelle && contenuScene.length) {
    scenes.push({
      num:         sceneActuelle.num,
      titre:       sceneActuelle.titre,
      contenu:     contenuScene.join("\n").trim(),
      imagePrompt: imagePrompt || undefined,
    });
  }

  if (scenes.length === 0) {
    scenes.push({ num: "1", titre: "Le conte", contenu: texte.trim() });
  }

  return { titre: `L'histoire de ${meta.prenom}`, scenes, morale, meta };
}
