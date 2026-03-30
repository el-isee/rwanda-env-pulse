import { provinces, TimeRange } from "@/data/rwandaData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <Select value={province} onValueChange={(v) => { onProvinceChange(v); onDistrictChange(provinces[v][0]); }}>
        <SelectTrigger className="w-[200px] rounded-xl">
          <SelectValue placeholder="Province" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(provinces).map((p) => (
            <SelectItem key={p} value={p}>{p}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={district} onValueChange={onDistrictChange}>
        <SelectTrigger className="w-[200px] rounded-xl">
          <SelectValue placeholder="District" />
        </SelectTrigger>
        <SelectContent>
          {districts.map((d) => (
            <SelectItem key={d} value={d}>{d}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex rounded-xl border bg-muted/50 p-1 gap-1">
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
  );
}
