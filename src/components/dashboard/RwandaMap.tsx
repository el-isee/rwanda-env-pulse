import { useState } from "react";
import rwandaMapImg from "@/assets/rwanda-districts-map.png";

interface RwandaMapProps {
  selectedDistrict: string;
  selectedProvince: string;
  onDistrictSelect: (district: string, province: string) => void;
}

// District hotspots positioned relative to the reference map image (percentage-based)
const districtHotspots: Record<string, { x: number; y: number; province: string }> = {
  // Kigali City (green area, center)
  Gasabo:      { x: 58, y: 47, province: "Kigali City" },
  Kicukiro:    { x: 56, y: 54, province: "Kigali City" },
  Nyarugenge:  { x: 52, y: 51, province: "Kigali City" },

  // Northern (yellow, upper-center)
  Burera:      { x: 49, y: 17, province: "Northern" },
  Musanze:     { x: 38, y: 23, province: "Northern" },
  Gicumbi:     { x: 58, y: 28, province: "Northern" },
  Gakenke:     { x: 45, y: 35, province: "Northern" },
  Rulindo:     { x: 54, y: 39, province: "Northern" },

  // Southern (blue, lower-center)
  Muhanga:     { x: 42, y: 52, province: "Southern" },
  Kamonyi:     { x: 48, y: 55, province: "Southern" },
  Ruhango:     { x: 45, y: 61, province: "Southern" },
  Nyanza:      { x: 50, y: 68, province: "Southern" },
  Huye:        { x: 44, y: 74, province: "Southern" },
  Gisagara:    { x: 50, y: 80, province: "Southern" },
  Nyaruguru:   { x: 37, y: 84, province: "Southern" },
  Nyamagabe:   { x: 32, y: 68, province: "Southern" },

  // Eastern (pink, right side)
  Rwamagana:   { x: 68, y: 51, province: "Eastern" },
  Bugesera:    { x: 64, y: 60, province: "Eastern" },
  Ngoma:       { x: 78, y: 63, province: "Eastern" },
  Kirehe:      { x: 88, y: 64, province: "Eastern" },
  Kayonza:     { x: 80, y: 46, province: "Eastern" },
  Gatsibo:     { x: 78, y: 34, province: "Eastern" },
  Nyagatare:   { x: 82, y: 16, province: "Eastern" },

  // Western (orange, left side)
  Rubavu:      { x: 26, y: 30, province: "Western" },
  Nyabihu:     { x: 32, y: 36, province: "Western" },
  Ngororero:   { x: 38, y: 46, province: "Western" },
  Rutsiro:     { x: 22, y: 44, province: "Western" },
  Karongi:     { x: 22, y: 58, province: "Western" },
  Nyamasheke:  { x: 17, y: 67, province: "Western" },
  Rusizi:      { x: 15, y: 80, province: "Western" },
};

const provinceColors: Record<string, string> = {
  "Kigali City": "hsla(165, 60%, 50%, 0.5)",
  Northern: "hsla(50, 70%, 60%, 0.5)",
  Southern: "hsla(220, 60%, 55%, 0.5)",
  Eastern: "hsla(0, 60%, 65%, 0.5)",
  Western: "hsla(25, 70%, 55%, 0.5)",
};

export default function RwandaMap({ selectedDistrict, selectedProvince, onDistrictSelect }: RwandaMapProps) {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">Interactive Map</h3>
        <div className="flex items-center gap-3 flex-wrap">
          {Object.entries(provinceColors).map(([name, color]) => (
            <div key={name} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full border border-border" style={{ backgroundColor: color }} />
              <span className="text-xs text-muted-foreground">{name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative select-none">
        <img
          src={rwandaMapImg}
          alt="Rwanda administrative districts map"
          className="w-full max-w-xl mx-auto rounded-xl"
          draggable={false}
        />

        {/* Clickable district hotspots */}
        {Object.entries(districtHotspots).map(([name, { x, y, province }]) => {
          const isSelected = name === selectedDistrict;
          const isHovered = name === hoveredDistrict;

          return (
            <button
              key={name}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 cursor-pointer focus:outline-none ${!isSelected && !isHovered ? 'animate-pulse' : ''}`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
              width: isSelected ? 22 : isHovered ? 18 : 14,
                height: isSelected ? 22 : isHovered ? 18 : 14,
                backgroundColor: isSelected
                  ? "hsla(152, 58%, 38%, 0.95)"
                  : isHovered
                    ? "hsla(205, 70%, 50%, 0.8)"
                    : "hsla(152, 50%, 45%, 0.7)",
                border: isSelected
                  ? "2.5px solid white"
                  : isHovered
                    ? "2.5px solid hsla(0,0%,100%,0.9)"
                    : "2px solid hsla(0,0%,100%,0.7)",
                boxShadow: isSelected
                  ? "0 0 12px hsla(152, 58%, 38%, 0.7)"
                  : isHovered
                    ? "0 0 10px hsla(205, 70%, 50%, 0.5)"
                    : "0 0 6px hsla(152, 50%, 45%, 0.4)",
              }}
              onClick={() => onDistrictSelect(name, province)}
              onMouseEnter={() => setHoveredDistrict(name)}
              onMouseLeave={() => setHoveredDistrict(null)}
              aria-label={`Select ${name} district`}
            />
          );
        })}

        {/* Tooltip */}
        {hoveredDistrict && (
          <div className="absolute top-2 right-2 bg-popover/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg animate-fade-in z-10">
            <p className="text-xs text-muted-foreground">{districtHotspots[hoveredDistrict].province}</p>
            <p className="font-display font-semibold text-sm text-foreground">{hoveredDistrict}</p>
          </div>
        )}
      </div>
    </div>
  );
}
