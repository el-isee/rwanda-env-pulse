import { useState, useEffect } from "react";
import { Star, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { provinces } from "@/data/rwandaData";

const STORAGE_KEY = "rw-env-bookmarks";

interface BookmarkDistrictsProps {
  currentDistrict: string;
  currentProvince: string;
  onDistrictSelect: (district: string, province: string) => void;
}

function findProvince(district: string): string {
  for (const [prov, districts] of Object.entries(provinces)) {
    if (districts.includes(district)) return prov;
  }
  return "";
}

export default function BookmarkDistricts({ currentDistrict, currentProvince, onDistrictSelect }: BookmarkDistrictsProps) {
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const isBookmarked = bookmarks.includes(currentDistrict);

  const toggle = () => {
    if (isBookmarked) {
      setBookmarks(b => b.filter(d => d !== currentDistrict));
      toast.info(`Removed ${currentDistrict} from bookmarks`);
    } else {
      setBookmarks(b => [...b, currentDistrict]);
      toast.success(`Bookmarked ${currentDistrict}`);
    }
  };

  const remove = (district: string) => {
    setBookmarks(b => b.filter(d => d !== district));
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button
        variant={isBookmarked ? "default" : "outline"}
        size="sm"
        onClick={toggle}
        className="gap-1.5"
      >
        <Star className={`h-3.5 w-3.5 ${isBookmarked ? "fill-current" : ""}`} />
        {isBookmarked ? "Bookmarked" : "Bookmark"}
      </Button>

      {bookmarks.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap">
          {bookmarks.map(district => {
            const prov = findProvince(district);
            const isActive = district === currentDistrict;
            return (
              <button
                key={district}
                onClick={() => onDistrictSelect(district, prov)}
                className={`group inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <MapPin className="h-3 w-3" />
                {district}
                <span
                  onClick={(e) => { e.stopPropagation(); remove(district); }}
                  className="ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}