// src/components/TagButton.tsx
"use client";

interface TagButtonProps {
  label:    string;
  active:   boolean;
  onClick:  () => void;
}

export default function TagButton({ label, active, onClick }: TagButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-150 border"
      style={
        active
          ? {
              background:   "var(--terracotta)",
              borderColor:  "var(--terracotta)",
              color:        "white",
            }
          : {
              background:   "var(--cream)",
              borderColor:  "rgba(139,69,19,0.2)",
              color:        "#7a6652",
            }
      }
    >
      {label}
    </button>
  );
}
