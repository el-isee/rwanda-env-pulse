import { useState, useRef, useEffect } from "react";
import { Search, MapPin } from "lucide-react";
import { provinces } from "@/data/rwandaData";

interface DistrictSearchProps {
  onDistrictSelect: (district: string, province: string) => void;
}

const allDistricts = Object.entries(provinces).flatMap(([prov, dists]) =>
  dists.map((d) => ({ district: d, province: prov }))
);

export default function DistrictSearch({ onDistrictSelect }: DistrictSearchProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? allDistricts.filter(
        (d) =>
          d.district.toLowerCase().includes(query.toLowerCase()) ||
          d.province.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full sm:w-72">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search districts..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => query.trim() && setOpen(true)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
      </div>

      {open && filtered.length > 0 && (
        <div className="absolute z-50 top-full mt-1 w-full bg-popover border border-border rounded-xl shadow-lg max-h-60 overflow-y-auto animate-fade-in">
          {filtered.map((d) => (
            <button
              key={d.district}
              onClick={() => {
                onDistrictSelect(d.district, d.province);
                setQuery("");
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-foreground hover:bg-muted/60 transition-colors text-left"
            >
              <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="font-medium">{d.district}</span>
              <span className="text-muted-foreground text-xs ml-auto">{d.province}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
