import React from 'react';

export function DiamondBrandIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Precision geometric diamond mark */}
      <polygon
        points="16,3 28,11 16,29 4,11"
        fill="#0B132B"
        stroke="#38BDF8"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <polygon
        points="10,11 16,3 22,11 16,29"
        fill="#112240"
        stroke="#60A5FA"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <line
        x1="4"
        y1="11"
        x2="28"
        y2="11"
        stroke="#38BDF8"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <line
        x1="16"
        y1="3"
        x2="10"
        y2="11"
        stroke="#93C5FD"
        strokeWidth="1"
        strokeLinejoin="round"
        strokeOpacity="0.8"
      />
      <line
        x1="16"
        y1="3"
        x2="22"
        y2="11"
        stroke="#93C5FD"
        strokeWidth="1"
        strokeLinejoin="round"
        strokeOpacity="0.8"
      />
      <line
        x1="10"
        y1="11"
        x2="16"
        y2="29"
        stroke="#93C5FD"
        strokeWidth="1"
        strokeLinejoin="round"
        strokeOpacity="0.8"
      />
      <line
        x1="22"
        y1="11"
        x2="16"
        y2="29"
        stroke="#93C5FD"
        strokeWidth="1"
        strokeLinejoin="round"
        strokeOpacity="0.8"
      />
    </svg>
  );
}

export function BrandLogo({ className = "h-7" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <DiamondBrandIcon className="w-6 h-6 shrink-0 text-[#38BDF8]" />
      <span className="text-base font-bold tracking-[0.16em] uppercase text-white font-sans whitespace-nowrap">
        DIAMONDS
      </span>
    </div>
  );
}
