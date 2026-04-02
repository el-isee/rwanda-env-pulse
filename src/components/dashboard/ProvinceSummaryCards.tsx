import { MapPin, Thermometer, Droplets, Wind } from "lucide-react";
import { provinces, getDistrictComparisonData } from "@/data/rwandaData";
import { useMemo } from "react";

interface ProvinceSummaryCardsProps {
  selectedProvince: string;
  onProvinceSelect: (province: string) => void;
}

export default function ProvinceSummaryCards({ selectedProvince, onProvinceSelect }: ProvinceSummaryCardsProps) {
  const summaries = useMemo(() => {
    return Object.entries(provinces).map(([name, districts]) => {
      const data = getDistrictComparisonData(districts);
      const avgTemp = +(data.reduce((s, d) => s + d.temp, 0) / data.length).toFixed(1);
      const avgHumidity = +(data.reduce((s, d) => s + d.humidity, 0) / data.length).toFixed(1);
      return { name, districtCount: districts.length, avgTemp, avgHumidity };
    });
  }, []);

  return (
    <div className="space-y-3">
      <h3 className="font-display font-semibold text-foreground text-lg">Province Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {summaries.map((p) => {
          const isActive = p.name === selectedProvince;
          return (
            <button
              key={p.name}
              onClick={() => onProvinceSelect(p.name)}
              className={`glass-card p-4 text-left transition-all space-y-2 ${
                isActive
                  ? "ring-2 ring-primary bg-primary/5"
                  : "hover:ring-1 hover:ring-border"
              }`}
            >
              <div className="flex items-center gap-2">
                <MapPin className={`h-3.5 w-3.5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <span className="font-display text-sm font-semibold text-foreground truncate">{p.name}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Thermometer className="h-3 w-3 text-warm" />
                  {p.avgTemp}°C
                </span>
                <span className="flex items-center gap-1">
                  <Droplets className="h-3 w-3 text-cool" />
                  {p.avgHumidity}%
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground">{p.districtCount} districts</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
