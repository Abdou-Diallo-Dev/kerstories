// src/lib/constants.ts

export const PAYS_OPTIONS = [
  { value: "Sénégal",             flag: "🇸🇳" },
  { value: "Mali",                flag: "🇲🇱" },
  { value: "Côte d'Ivoire",       flag: "🇨🇮" },
  { value: "Guinée",              flag: "🇬🇳" },
  { value: "Burkina Faso",        flag: "🇧🇫" },
  { value: "Ghana",               flag: "🇬🇭" },
  { value: "Nigeria",             flag: "🇳🇬" },
  { value: "Cameroun",            flag: "🇨🇲" },
  { value: "Kenya",               flag: "🇰🇪" },
  { value: "Afrique (en général)",flag: "🌍" },
] as const;

export const TYPE_OPTIONS = [
  "conte traditionnel",
  "aventure",
  "animaux",
  "école",
  "famille",
  "magie",
] as const;

export const VALEUR_OPTIONS = [
  "courage",
  "partage",
  "respect",
  "honnêteté",
  "travail",
  "amour",
] as const;

export const AGE_OPTIONS = [
  { value: "3-5",  label: "3 – 5 ans" },
  { value: "6-8",  label: "6 – 8 ans" },
  { value: "9-12", label: "9 – 12 ans" },
] as const;

export const LANGUE_OPTIONS = ["Français", "English", "Wolof"] as const;

export const LOADING_MESSAGES = [
  "Le griot compose ton histoire...",
  "Les ancêtres soufflent les mots...",
  "La savane prend vie...",
  "Les étoiles alignent le conte...",
  "Le baobab murmure des secrets...",
  "Les tam-tams rythment le récit...",
];

export const FLAG_MAP: Record<string, string> = Object.fromEntries(
  PAYS_OPTIONS.map((p) => [p.value, p.flag])
);
