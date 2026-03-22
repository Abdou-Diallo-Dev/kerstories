// src/lib/types.ts

export interface StoryFormData {
  prenom:  string;
  genre:   "garçon" | "fille";
  age:     "3-5" | "6-8" | "9-12";
  pays:    string;
  langue:  "Français" | "English" | "Wolof";
  type:    string;
  valeur:  string;
}

export interface Scene {
  num:              string;
  titre:            string;
  contenu:          string;
  imagePrompt?:     string;
  imageUrl?:        string;
  svgIllustration?: string;
}

export interface Story {
  titre:   string;
  scenes:  Scene[];
  morale:  string;
  meta:    StoryFormData;
}

export interface GenerateResponse {
  success: boolean;
  story?:  Story;
  error?:  string;
}

export interface ChildProfile {
  id:         string;
  user_id:    string;
  prenom:     string;
  genre:      string;
  age:        string;
  pays:       string;
  created_at: string;
}

export interface SavedStory {
  id:         string;
  user_id:    string;
  child_id:   string | null;
  title:      string;
  content:    Story;
  created_at: string;
}
