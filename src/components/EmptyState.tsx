// src/components/EmptyState.tsx
export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-12 text-center">
      {/* Baobab stylisé */}
      <svg
        width="180"
        height="180"
        viewBox="0 0 180 180"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.75 }}
      >
        <ellipse cx="90" cy="158" rx="62" ry="10" fill="rgba(139,69,19,0.1)" />
        <rect x="78" y="90" width="24" height="68" rx="8" fill="#8B4513" opacity="0.55" />
        <ellipse cx="90" cy="78" rx="54" ry="44" fill="#C4622D" opacity="0.15" />
        <ellipse cx="64" cy="67" rx="30" ry="25" fill="#2D5016" opacity="0.38" />
        <ellipse cx="116" cy="62" rx="32" ry="26" fill="#2D5016" opacity="0.32" />
        <ellipse cx="90" cy="56" rx="40" ry="32" fill="#3a6b1e" opacity="0.48" />
        {/* Étoiles */}
        <circle cx="28" cy="28" r="2"   fill="#D4900A" opacity="0.6" />
        <circle cx="152" cy="22" r="2.5" fill="#D4900A" opacity="0.5" />
        <circle cx="162" cy="58" r="1.5" fill="#D4900A" opacity="0.4" />
        <circle cx="18" cy="78" r="2"   fill="#D4900A" opacity="0.5" />
        {/* Lune */}
        <circle cx="148" cy="34" r="14" fill="#E8C98A" opacity="0.25" />
        <circle cx="154" cy="29" r="11" fill="#FAF3E7" opacity="0.75" />
        {/* Livre */}
        <rect x="68" y="125" width="44" height="33" rx="4" fill="#C4622D" opacity="0.65" />
        <line x1="90" y1="125" x2="90" y2="158" stroke="#8B4513" strokeWidth="1.5" opacity="0.45" />
        <rect x="72" y="130" width="14" height="2" rx="1" fill="white" opacity="0.5" />
        <rect x="72" y="135" width="10" height="2" rx="1" fill="white" opacity="0.4" />
        <rect x="93" y="130" width="14" height="2" rx="1" fill="white" opacity="0.5" />
        <rect x="93" y="135" width="10" height="2" rx="1" fill="white" opacity="0.4" />
      </svg>

      <div>
        <h3
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: "var(--font-playfair), serif", color: "#8B6644" }}
        >
          L&apos;histoire t&apos;attend&hellip;
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "#b09880", maxWidth: "260px" }}>
          Remplis le formulaire à gauche et laisse la magie africaine opérer.
        </p>
      </div>
    </div>
  );
}
