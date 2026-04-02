import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useMemo } from "react";
import { getData, TimeRange } from "@/data/rwandaData";

interface HistoricalComparisonProps {
  district: string;
  timeRange: TimeRange;
}

const tooltipStyle = {
  borderRadius: 12,
  border: "none",
  boxShadow: "0 4px 24px -4px hsla(210, 30%, 10%, 0.12)",
  fontSize: 13,
  padding: "8px 14px",
};

export default function HistoricalComparison({ district, timeRange }: HistoricalComparisonProps) {
  const comparisonData = useMemo(() => {
    const current = getData(district, timeRange);
    // Simulate "previous period" with slight offset
    const seedShift = 3;
    const previous = current.map((d) => ({
      ...d,
      temp: +(d.temp - 0.5 - Math.random() * 1.5).toFixed(1),
      humidity: +(d.humidity + 1 + Math.random() * 3).toFixed(1),
      airQuality: +(d.airQuality - 2 + Math.random() * 4).toFixed(1),
    }));

    return current.map((c, i) => ({
      time: c.time,
      "Current Temp": c.temp,
      "Previous Temp": previous[i].temp,
      "Current Humidity": c.humidity,
      "Previous Humidity": previous[i].humidity,
    }));
  }, [district, timeRange]);

  const periodLabel = timeRange === "daily" ? "Yesterday" : timeRange === "weekly" ? "Last Week" : "Last Year";

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">Historical Comparison</h3>
        <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
          vs {periodLabel}
        </span>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comparisonData} barGap={2} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 15%, 92%)" vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="hsl(210, 10%, 55%)" axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 10%, 55%)" axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="Current Temp" fill="hsl(0, 72%, 55%)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Previous Temp" fill="hsl(0, 72%, 55%, 0.3)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Current Humidity" fill="hsl(205, 70%, 50%)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Previous Humidity" fill="hsl(205, 70%, 50%, 0.3)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
