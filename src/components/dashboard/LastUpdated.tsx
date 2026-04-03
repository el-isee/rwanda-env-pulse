import { RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

export default function LastUpdated() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <RefreshCw className="h-3 w-3" />
      <span>Updated {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
    </div>
  );
}
