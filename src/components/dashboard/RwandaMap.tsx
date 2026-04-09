import { useState } from "react";

interface RwandaMapProps {
  selectedDistrict: string;
  selectedProvince: string;
  onDistrictSelect: (district: string, province: string) => void;
}

// District coordinates (lat, lng) and province
const districtData: Record<string, { lat: number; lng: number; province: string }> = {
  // Kigali City
  Gasabo:      { lat: -1.8984, lng: 30.1127, province: "Kigali City" },
  Kicukiro:    { lat: -1.9829, lng: 30.1048, province: "Kigali City" },
  Nyarugenge:  { lat: -1.9465, lng: 30.0596, province: "Kigali City" },
  // Northern
  Burera:      { lat: -1.4667, lng: 29.7333, province: "Northern" },
  Musanze:     { lat: -1.4975, lng: 29.6348, province: "Northern" },
  Gicumbi:     { lat: -1.5833, lng: 30.1000, province: "Northern" },
  Gakenke:     { lat: -1.6833, lng: 29.7833, province: "Northern" },
  Rulindo:     { lat: -1.7167, lng: 29.9833, province: "Northern" },
  // Southern
  Muhanga:     { lat: -2.0833, lng: 29.7500, province: "Southern" },
  Kamonyi:     { lat: -2.0000, lng: 29.8667, province: "Southern" },
  Ruhango:     { lat: -2.2167, lng: 29.7833, province: "Southern" },
  Nyanza:      { lat: -2.3500, lng: 29.7500, province: "Southern" },
  Huye:        { lat: -2.5167, lng: 29.7333, province: "Southern" },
  Gisagara:    { lat: -2.6000, lng: 29.8500, province: "Southern" },
  Nyaruguru:   { lat: -2.6333, lng: 29.5000, province: "Southern" },
  Nyamagabe:   { lat: -2.4167, lng: 29.5000, province: "Southern" },
  // Eastern
  Rwamagana:   { lat: -1.9500, lng: 30.4333, province: "Eastern" },
  Bugesera:    { lat: -2.2000, lng: 30.2500, province: "Eastern" },
  Ngoma:       { lat: -2.1667, lng: 30.4500, province: "Eastern" },
  Kirehe:      { lat: -2.2667, lng: 30.6667, province: "Eastern" },
  Kayonza:     { lat: -1.8667, lng: 30.6500, province: "Eastern" },
  Gatsibo:     { lat: -1.5833, lng: 30.4500, province: "Eastern" },
  Nyagatare:   { lat: -1.3000, lng: 30.3167, province: "Eastern" },
  // Western
  Rubavu:      { lat: -1.6833, lng: 29.3167, province: "Western" },
  Nyabihu:     { lat: -1.6500, lng: 29.5000, province: "Western" },
  Ngororero:   { lat: -1.8667, lng: 29.5833, province: "Western" },
  Rutsiro:     { lat: -1.9333, lng: 29.3167, province: "Western" },
  Karongi:     { lat: -2.1000, lng: 29.3500, province: "Western" },
  Nyamasheke:  { lat: -2.3333, lng: 29.1333, province: "Western" },
  Rusizi:      { lat: -2.5000, lng: 29.0000, province: "Western" },
};

const provinceColors: Record<string, string> = {
  "Kigali City": "hsla(165, 60%, 50%, 0.85)",
  Northern: "hsla(50, 70%, 60%, 0.85)",
  Southern: "hsla(220, 60%, 55%, 0.85)",
  Eastern: "hsla(0, 60%, 65%, 0.85)",
  Western: "hsla(25, 70%, 55%, 0.85)",
};

export default function RwandaMap({ selectedDistrict, selectedProvince, onDistrictSelect }: RwandaMapProps) {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  const selected = districtData[selectedDistrict] || { lat: -1.9403, lng: 29.8739 };
  const mapSrc = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${selected.lat},${selected.lng}&zoom=12&maptype=satellite`;

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
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

      <div className="relative">
        {/* Google Maps Embed */}
        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-border">
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Rwanda district map"
          />
        </div>

        {/* District selector overlay */}
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1.5">
          {Object.entries(districtData).map(([name, { province }]) => {
            const isSelected = name === selectedDistrict;
            const isHovered = name === hoveredDistrict;
            const color = provinceColors[province];

            return (
              <button
                key={name}
                onClick={() => onDistrictSelect(name, province)}
                onMouseEnter={() => setHoveredDistrict(name)}
                onMouseLeave={() => setHoveredDistrict(null)}
                className={`px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200 border ${
                  isSelected
                    ? "ring-2 ring-primary shadow-md scale-105 text-foreground"
                    : isHovered
                      ? "shadow-sm scale-[1.02] text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                }`}
                style={{
                  backgroundColor: isSelected ? color : isHovered ? color : "transparent",
                  borderColor: color,
                }}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tooltip for hovered */}
      {hoveredDistrict && (
        <div className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{hoveredDistrict}</span> — {districtData[hoveredDistrict].province} Province
        </div>
      )}
    </div>
  );
}
