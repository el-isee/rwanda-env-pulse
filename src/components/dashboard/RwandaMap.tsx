import { useState } from "react";
import rwandaMapImg from "@/assets/rwanda-districts-map.png";

interface RwandaMapProps {
  selectedDistrict: string;
  selectedProvince: string;
  onDistrictSelect: (district: string, province: string) => void;
}

// District hotspots positioned relative to the reference map image (percentage-based)
const districtHotspots: Record<string, { x: number; y: number; province: string }> = {
  // Kigali City
  Gasabo:      { x: 58.5, y: 48, province: "Kigali City" },
  Kicukiro:    { x: 57, y: 55, province: "Kigali City" },
  Nyarugenge:  { x: 52, y: 52, province: "Kigali City" },

  // Northern
  Burera:      { x: 47, y: 14, province: "Northern" },
  Musanze:     { x: 37, y: 18, province: "Northern" },
  Gicumbi:     { x: 56, y: 22, province: "Northern" },
  Gakenke:     { x: 44, y: 28, province: "Northern" },
  Rulindo:     { x: 53, y: 33, province: "Northern" },

  // Southern
  Muhanga:     { x: 43, y: 52, province: "Southern" },
  Kamonyi:     { x: 49, y: 58, province: "Southern" },
  Ruhango:     { x: 46, y: 65, province: "Southern" },
  Nyanza:      { x: 50, y: 72, province: "Southern" },
  Huye:        { x: 44, y: 80, province: "Southern" },
  Gisagara:    { x: 50, y: 86, province: "Southern" },
  Nyaruguru:   { x: 38, y: 90, province: "Southern" },
  Nyamagabe:   { x: 35, y: 76, province: "Southern" },

  // Eastern
  Rwamagana:   { x: 66, y: 52, province: "Eastern" },
  Bugesera:    { x: 60, y: 67, province: "Eastern" },
  Ngoma:       { x: 73, y: 63, province: "Eastern" },
  Kirehe:      { x: 83, y: 63, province: "Eastern" },
  Kayonza:     { x: 76, y: 44, province: "Eastern" },
  Gatsibo:     { x: 72, y: 28, province: "Eastern" },
  Nyagatare:   { x: 76, y: 12, province: "Eastern" },

  // Western
  Rubavu:      { x: 23, y: 25, province: "Western" },
  Nyabihu:     { x: 31, y: 32, province: "Western" },
  Ngororero:   { x: 37, y: 42, province: "Western" },
  Rutsiro:     { x: 24, y: 42, province: "Western" },
  Karongi:     { x: 27, y: 58, province: "Western" },
  Nyamasheke:  { x: 18, y: 70, province: "Western" },
  Rusizi:      { x: 20, y: 85, province: "Western" },
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
              className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 cursor-pointer focus:outline-none"
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
