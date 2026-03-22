// src/lib/types.ts

export interface StoryFormData {
  prenom:  string;
  age:     "3-5" | "6-8" | "9-12";
  pays:    string;
  langue:  "Français" | "English" | "Wolof";
  type:    string;
  valeur:  string;
}

export interface Scene {
  num:     string;
  titre:   string;
  contenu: string;
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
