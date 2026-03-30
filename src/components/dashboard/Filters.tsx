import { provinces, TimeRange } from "@/data/rwandaData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar } from "lucide-react";

interface FiltersProps {
  province: string;
  district: string;
  timeRange: TimeRange;
  onProvinceChange: (v: string) => void;
  onDistrictChange: (v: string) => void;
  onTimeRangeChange: (v: TimeRange) => void;
}

const timeLabels: { value: TimeRange; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

export default function Filters({ province, district, timeRange, onProvinceChange, onDistrictChange, onTimeRangeChange }: FiltersProps) {
  const districts = provinces[province] || [];

  return (
    <div className="glass-card p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="flex items-center gap-2 text-muted-foreground">
        <MapPin className="h-4 w-4" />
        <span className="text-xs font-medium uppercase tracking-wider">Location</span>
      </div>

      <Select value={province} onValueChange={(v) => { onProvinceChange(v); onDistrictChange(provinces[v][0]); }}>
        <SelectTrigger className="w-[180px] rounded-xl border-border">
          <SelectValue placeholder="Province" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(provinces).map((p) => (
            <SelectItem key={p} value={p}>{p}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={district} onValueChange={onDistrictChange}>
        <SelectTrigger className="w-[180px] rounded-xl border-border">
          <SelectValue placeholder="District" />
        </SelectTrigger>
        <SelectContent>
          {districts.map((d) => (
            <SelectItem key={d} value={d}>{d}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="sm:ml-auto flex items-center gap-3">
        <Calendar className="h-4 w-4 text-muted-foreground hidden sm:block" />
        <div className="flex rounded-xl bg-muted/60 p-1 gap-0.5">
          {timeLabels.map((t) => (
            <button
              key={t.value}
              onClick={() => onTimeRangeChange(t.value)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                timeRange === t.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
