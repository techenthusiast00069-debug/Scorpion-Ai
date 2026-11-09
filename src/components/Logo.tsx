import { useId } from "react";

export function ScorpionMark({ className = "" }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const silver = `s1-${uid}`;
  const silver2 = `s2-${uid}`;
  const crimson = `cr-${uid}`;
  const shadow = `sh-${uid}`;

  return (
    <svg
      viewBox="-4 -4 252 184"
      className={className}
      role="img"
      aria-label="SCORPION AI"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={silver} x1="0.1" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.26" stopColor="#eef1f5" />
          <stop offset="0.55" stopColor="#c0c6cf" />
          <stop offset="0.8" stopColor="#7f858f" />
          <stop offset="1" stopColor="#d9dee5" />
        </linearGradient>
        <linearGradient id={silver2} x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#f7f9fb" />
          <stop offset="0.45" stopColor="#cbd1d9" />
          <stop offset="0.78" stopColor="#868c96" />
          <stop offset="1" stopColor="#e4e8ed" />
        </linearGradient>
        <linearGradient id={crimson} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#ff7683" />
          <stop offset="0.35" stopColor="#e51d2f" />
          <stop offset="1" stopColor="#780711" />
        </linearGradient>
        <filter id={shadow} x="-30%" y="-30%" width="170%" height="170%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.55" />
        </filter>
      </defs>

      <g transform="translate(-11 -34)" filter={`url(#${shadow})`}>
        <g stroke={`url(#${silver2})`} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M130 160 L118 176 L121 194" />
          <path d="M148 164 L142 183 L148 200" />
          <path d="M166 165 L169 185 L177 199" />
          <path d="M186 163 L197 181 L208 190" />
        </g>

        <g>
          <path
            d="M206 151 A 42 50 0 0 0 206 51 L206 68 A 25 33 0 0 1 206 134 Z"
            fill={`url(#${silver})`}
            stroke="#22262c"
            strokeWidth="1.6"
          />
          <g stroke="#22262c" strokeWidth="1.8" opacity="0.55">
            <path d="M225.7 145.1 L217.7 130.1" />
            <path d="M240.8 129 L226.7 119.5" />
            <path d="M247.8 106.2 L230.9 104.4" />
            <path d="M244.9 82.3 L229.2 88.6" />
            <path d="M233 62.7 L222.1 75.7" />
          </g>
          <g stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1" fill="none">
            <path d="M227 141.4 L221 129.5" />
            <path d="M241.6 125.4 L230.5 118.1" />
            <path d="M248.4 102.6 L235.6 101.6" />
            <path d="M245.2 78.6 L232.8 84" />
            <path d="M233.6 58.9 L225.6 69.5" />
          </g>
          <path
            d="M210 146.7 A 38 46 0 0 0 217.7 57.3"
            stroke="#ffffff"
            strokeOpacity="0.45"
            strokeWidth="1.6"
            fill="none"
          />
        </g>

        <ellipse
          cx="207"
          cy="59"
          rx="15"
          ry="13"
          transform="rotate(-14 207 59)"
          fill={`url(#${silver2})`}
          stroke="#22262c"
          strokeWidth="1.6"
        />
        <path d="M198 49 C205 43 215 45 220 51" stroke="#ffffff" strokeOpacity="0.65" strokeWidth="1.5" fill="none" />

        <path
          d="M199 48 C182 36 160 45 160 61 C160 72 166 81 175 87 C170 78 171 67 179 61 C185 56 192 53 197 49 C197.6 48.6 198.4 48.4 199 48 Z"
          fill={`url(#${crimson})`}
          stroke="#580610"
          strokeWidth="1.1"
        />
        <path d="M197 49 C181 41 166 47 163 59" stroke="#ffc0c6" strokeOpacity="0.55" strokeWidth="1.4" fill="none" />

        <path
          d="M103 147 C103 133 116 125 132 125 L184 129 C202 131 213 140 213 150 C213 161 200 167 183 167 L133 166 C116 166 103 160 103 147 Z"
          fill={`url(#${silver})`}
          stroke="#22262c"
          strokeWidth="1.6"
        />
        <g stroke="#22262c" strokeWidth="1.5" fill={`url(#${silver2})`}>
          <path d="M150 127 L149 165 L165 165 L166 128 Z" />
          <path d="M169 128 L168 165 L182 165 L184 130 Z" />
          <path d="M187 131 L185 164 L198 162 L200 134 Z" />
        </g>
        <path
          d="M104 146 C104 133 116 125 132 125 L145 126 L146 164 L133 165 C117 165 104 159 104 146 Z"
          fill={`url(#${silver})`}
          stroke="#22262c"
          strokeWidth="1.5"
        />
        <path d="M110 142 C112 132 121 128 131 129" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.6" fill="none" />
        <path d="M115 137 L124 137" stroke="#e51d2f" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M152 131 L151 162" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="1.1" />
        <path d="M104 156 C120 162 140 164 160 164" stroke="#22262c" strokeOpacity="0.25" strokeWidth="1.2" fill="none" />

        <path d="M110 132 C92 126 80 116 72 104" stroke={`url(#${silver2})`} strokeWidth="11" strokeLinecap="round" fill="none" />
        <path d="M113 154 C96 155 84 153 74 148" stroke={`url(#${silver2})`} strokeWidth="10" strokeLinecap="round" fill="none" />

        <g transform="translate(60 98) rotate(-5)">
          <path
            d="M12 -12 C1 -20 -13 -21 -21 -15 C-31 -20 -39 -22 -45 -19 C-49 -17 -49 -12 -45 -10 C-36 -8 -29 -6 -22 -4 C-32 -1 -42 2 -49 0 C-46 8 -38 14 -28 16 C-16 19 -2 17 8 12 C16 6 17 -5 12 -12 Z"
            fill={`url(#${silver})`}
            stroke="#22262c"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M12 -12 C1 -20 -13 -21 -21 -15 C-31 -20 -39 -22 -45 -19"
            stroke="#ffffff"
            strokeOpacity="0.6"
            strokeWidth="1.4"
            fill="none"
          />
          <path d="M-22 -4 C-28 -3 -34 -1 -38 1" stroke="#22262c" strokeOpacity="0.5" strokeWidth="1.3" fill="none" />
        </g>
        <g transform="translate(62 152) rotate(6) scale(0.94)">
          <path
            d="M12 -12 C1 -20 -13 -21 -21 -15 C-31 -20 -39 -22 -45 -19 C-49 -17 -49 -12 -45 -10 C-36 -8 -29 -6 -22 -4 C-32 -1 -42 2 -49 0 C-46 8 -38 14 -28 16 C-16 19 -2 17 8 12 C16 6 17 -5 12 -12 Z"
            fill={`url(#${silver2})`}
            stroke="#22262c"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M12 -12 C1 -20 -13 -21 -21 -15 C-31 -20 -39 -22 -45 -19"
            stroke="#ffffff"
            strokeOpacity="0.5"
            strokeWidth="1.4"
            fill="none"
          />
          <path d="M-22 -4 C-28 -3 -34 -1 -38 1" stroke="#22262c" strokeOpacity="0.4" strokeWidth="1.3" fill="none" />
        </g>
      </g>
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="group flex items-center gap-3" aria-label="SCORPION AI — home">
      <ScorpionMark className="h-[30px] w-auto shrink-0 transition-transform duration-500 group-hover:-translate-y-px sm:h-[32px]" />
      <span className="flex items-center gap-[9px]">
        <span className="text-[12px] font-semibold tracking-[0.26em] text-[#f1f3f6] sm:text-[12.5px]">SCORPION</span>
        <span className="h-[13px] w-px bg-white/15" aria-hidden="true" />
        <span className="mono text-[11px] tracking-[0.18em] text-[#ff3341] sm:text-[11.5px]">AI</span>
        {!compact && (
          <span className="mono hidden text-[8px] uppercase tracking-[0.16em] text-[#5c636d] lg:inline">beta</span>
        )}
      </span>
    </a>
  );
}
