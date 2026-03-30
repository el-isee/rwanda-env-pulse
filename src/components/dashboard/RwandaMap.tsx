import { useState } from "react";
import { provinces } from "@/data/rwandaData";

interface RwandaMapProps {
  selectedDistrict: string;
  selectedProvince: string;
  onDistrictSelect: (district: string, province: string) => void;
}

// Simplified Rwanda district map paths (stylized polygons for each district)
const districtPaths: Record<string, { path: string; cx: number; cy: number; province: string }> = {
  // Kigali City
  Gasabo: { path: "M 230 200 L 255 185 L 275 195 L 270 220 L 245 225 Z", cx: 253, cy: 205, province: "Kigali City" },
  Kicukiro: { path: "M 245 225 L 270 220 L 278 245 L 255 255 L 238 240 Z", cx: 257, cy: 237, province: "Kigali City" },
  Nyarugenge: { path: "M 220 210 L 245 225 L 238 240 L 215 235 L 210 220 Z", cx: 226, cy: 226, province: "Kigali City" },

  // Northern
  Burera: { path: "M 195 60 L 225 50 L 245 65 L 240 90 L 210 95 L 195 80 Z", cx: 218, cy: 73, province: "Northern" },
  Gakenke: { path: "M 175 95 L 210 95 L 215 120 L 195 135 L 170 125 Z", cx: 193, cy: 114, province: "Northern" },
  Gicumbi: { path: "M 240 90 L 270 80 L 285 100 L 275 125 L 250 120 L 240 100 Z", cx: 260, cy: 103, province: "Northern" },
  Musanze: { path: "M 160 65 L 195 60 L 195 80 L 210 95 L 175 95 L 155 80 Z", cx: 182, cy: 79, province: "Northern" },
  Rulindo: { path: "M 215 120 L 250 120 L 255 145 L 240 160 L 215 155 L 205 135 Z", cx: 230, cy: 139, province: "Northern" },

  // Southern
  Gisagara: { path: "M 205 340 L 235 330 L 250 350 L 240 375 L 210 370 Z", cx: 228, cy: 353, province: "Southern" },
  Huye: { path: "M 175 320 L 205 310 L 220 330 L 205 340 L 180 340 Z", cx: 197, cy: 328, province: "Southern" },
  Kamonyi: { path: "M 185 240 L 215 235 L 225 255 L 210 275 L 185 270 Z", cx: 204, cy: 255, province: "Southern" },
  Muhanga: { path: "M 170 260 L 185 240 L 185 270 L 175 290 L 160 280 Z", cx: 175, cy: 268, province: "Southern" },
  Nyamagabe: { path: "M 130 305 L 160 295 L 175 320 L 160 340 L 130 330 Z", cx: 151, cy: 318, province: "Southern" },
  Nyanza: { path: "M 185 270 L 210 275 L 220 300 L 205 310 L 185 300 Z", cx: 201, cy: 291, province: "Southern" },
  Nyaruguru: { path: "M 130 330 L 160 340 L 165 370 L 145 380 L 125 360 Z", cx: 145, cy: 356, province: "Southern" },
  Ruhango: { path: "M 160 280 L 175 290 L 175 320 L 160 295 L 150 290 Z", cx: 164, cy: 295, province: "Southern" },

  // Eastern
  Bugesera: { path: "M 278 245 L 310 240 L 330 260 L 315 280 L 290 275 Z", cx: 305, cy: 260, province: "Eastern" },
  Gatsibo: { path: "M 305 110 L 340 100 L 365 120 L 355 150 L 325 145 L 310 130 Z", cx: 333, cy: 126, province: "Eastern" },
  Kayonza: { path: "M 295 150 L 325 145 L 355 150 L 350 180 L 320 190 L 295 175 Z", cx: 323, cy: 165, province: "Eastern" },
  Kirehe: { path: "M 340 230 L 370 220 L 390 240 L 380 270 L 350 265 Z", cx: 366, cy: 245, province: "Eastern" },
  Ngoma: { path: "M 315 210 L 340 200 L 355 220 L 340 230 L 315 230 Z", cx: 333, cy: 218, province: "Eastern" },
  Nyagatare: { path: "M 320 50 L 360 40 L 385 65 L 375 95 L 340 100 L 320 80 Z", cx: 350, cy: 72, province: "Eastern" },
  Rwamagana: { path: "M 275 195 L 305 185 L 315 210 L 310 240 L 278 245 L 270 220 Z", cx: 292, cy: 216, province: "Eastern" },

  // Western
  Karongi: { path: "M 110 215 L 140 205 L 155 225 L 145 250 L 115 245 Z", cx: 133, cy: 228, province: "Western" },
  Ngororero: { path: "M 155 175 L 180 165 L 195 185 L 185 205 L 160 200 Z", cx: 175, cy: 186, province: "Western" },
  Nyabihu: { path: "M 120 130 L 155 120 L 160 145 L 145 165 L 120 155 Z", cx: 140, cy: 143, province: "Western" },
  Nyamasheke: { path: "M 90 260 L 115 245 L 130 270 L 120 300 L 95 290 Z", cx: 110, cy: 273, province: "Western" },
  Rubavu: { path: "M 105 90 L 135 80 L 140 105 L 125 120 L 105 115 Z", cx: 122, cy: 102, province: "Western" },
  Rusizi: { path: "M 80 300 L 95 290 L 120 300 L 130 330 L 110 345 L 85 330 Z", cx: 103, cy: 316, province: "Western" },
  Rutsiro: { path: "M 105 165 L 130 155 L 145 175 L 140 205 L 110 215 L 100 195 Z", cx: 122, cy: 185, province: "Western" },
};

const provinceColors: Record<string, { fill: string; hover: string; active: string }> = {
  "Kigali City": { fill: "hsl(152, 58%, 85%)", hover: "hsl(152, 58%, 75%)", active: "hsl(152, 58%, 45%)" },
  Northern: { fill: "hsl(205, 70%, 88%)", hover: "hsl(205, 70%, 78%)", active: "hsl(205, 70%, 50%)" },
  Southern: { fill: "hsl(38, 92%, 88%)", hover: "hsl(38, 92%, 78%)", active: "hsl(38, 92%, 55%)" },
  Eastern: { fill: "hsl(280, 50%, 88%)", hover: "hsl(280, 50%, 78%)", active: "hsl(280, 50%, 55%)" },
  Western: { fill: "hsl(0, 72%, 90%)", hover: "hsl(0, 72%, 80%)", active: "hsl(0, 72%, 55%)" },
};

export default function RwandaMap({ selectedDistrict, selectedProvince, onDistrictSelect }: RwandaMapProps) {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">Interactive Map</h3>
        <div className="flex items-center gap-3 flex-wrap">
          {Object.entries(provinceColors).map(([name, colors]) => (
            <div key={name} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: colors.active }} />
              <span className="text-xs text-muted-foreground">{name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <svg
          viewBox="60 25 355 375"
          className="w-full max-w-lg mx-auto"
          style={{ filter: "drop-shadow(0 2px 8px hsla(210, 30%, 10%, 0.08))" }}
        >
          {Object.entries(districtPaths).map(([name, { path, cx, cy, province }]) => {
            const colors = provinceColors[province];
            const isSelected = name === selectedDistrict;
            const isHovered = name === hoveredDistrict;
            const isProvinceMatch = province === selectedProvince;

            return (
              <g key={name}>
                <path
                  d={path}
                  fill={isSelected ? colors.active : isHovered ? colors.hover : isProvinceMatch ? colors.hover : colors.fill}
                  stroke="hsl(0, 0%, 100%)"
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  className="cursor-pointer transition-all duration-200"
                  style={{
                    filter: isSelected ? `drop-shadow(0 0 6px ${colors.active})` : "none",
                  }}
                  onClick={() => onDistrictSelect(name, province)}
                  onMouseEnter={() => setHoveredDistrict(name)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                />
                <text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="pointer-events-none select-none"
                  fontSize={isSelected ? 7 : 6}
                  fontWeight={isSelected ? 700 : 500}
                  fill={isSelected || isHovered ? "hsl(0, 0%, 100%)" : "hsl(210, 30%, 25%)"}
                  fontFamily="'Space Grotesk', sans-serif"
                >
                  {name.length > 9 ? name.slice(0, 8) + "…" : name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {hoveredDistrict && (
          <div className="absolute top-2 right-2 bg-popover border border-border rounded-lg px-3 py-2 shadow-md animate-fade-in">
            <p className="text-xs text-muted-foreground">{districtPaths[hoveredDistrict].province}</p>
            <p className="font-display font-semibold text-sm text-foreground">{hoveredDistrict}</p>
          </div>
        )}
      </div>
    </div>
  );
}
