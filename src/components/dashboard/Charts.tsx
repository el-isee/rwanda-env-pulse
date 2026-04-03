import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ChartData {
  time: string;
  temp: number;
  humidity: number;
  airQuality: number;
}

interface ComparisonData {
  district: string;
  temp: number;
  humidity: number;
}

const gridStroke = "hsl(200, 15%, 92%)";
const axisStroke = "hsl(210, 10%, 55%)";

function TrendIcon({ current, prev }: { current: number; prev?: number }) {
  if (!prev) return null;
  const diff = current - prev;
  if (Math.abs(diff) < 0.3) return <Minus className="h-3 w-3 text-muted-foreground" />;
  return diff > 0
    ? <TrendingUp className="h-3 w-3 text-red-500" />
    : <TrendingDown className="h-3 w-3 text-blue-500" />;
}

function CustomTooltip({ active, payload, label, unit, color, metricName, data }: any) {
  if (!active || !payload?.length) return null;

  const value = payload[0].value;
  const idx = data?.findIndex((d: any) => d.time === label);
  const prev = idx > 0 ? data[idx - 1]?.[payload[0].dataKey] : undefined;
  const diff = prev != null ? (value - prev).toFixed(1) : null;
  const avg = data ? (data.reduce((s: number, d: any) => s + d[payload[0].dataKey], 0) / data.length).toFixed(1) : null;

  const getQualityLabel = (aqi: number) => {
    if (aqi <= 30) return { text: "Excellent", cls: "text-green-600 bg-green-100" };
    if (aqi <= 50) return { text: "Good", cls: "text-emerald-600 bg-emerald-100" };
    if (aqi <= 70) return { text: "Moderate", cls: "text-yellow-600 bg-yellow-100" };
    return { text: "Poor", cls: "text-red-600 bg-red-100" };
  };

  return (
    <div className="bg-popover border border-border rounded-xl shadow-lg p-3 min-w-[180px] animate-scale-in">
      <p className="text-xs text-muted-foreground font-medium mb-2">{label}</p>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-lg font-bold text-foreground">{value}{unit}</span>
        {prev != null && (
          <span className="flex items-center gap-0.5 text-xs">
            <TrendIcon current={value} prev={prev} />
            <span className={`${Number(diff) > 0 ? "text-red-500" : Number(diff) < 0 ? "text-blue-500" : "text-muted-foreground"}`}>
              {Number(diff) > 0 ? "+" : ""}{diff}{unit}
            </span>
          </span>
        )}
      </div>
      {metricName === "AQI" && (
        <div className="mb-2">
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${getQualityLabel(value).cls}`}>
            {getQualityLabel(value).text}
          </span>
        </div>
      )}
      <div className="border-t border-border pt-2 space-y-1">
        {avg && (
          <div className="flex justify-between text-[11px]">
            <span className="text-muted-foreground">Period avg</span>
            <span className="font-medium text-foreground">{avg}{unit}</span>
          </div>
        )}
        {prev != null && (
          <div className="flex justify-between text-[11px]">
            <span className="text-muted-foreground">Previous</span>
            <span className="font-medium text-foreground">{prev}{unit}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ComparisonTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-xl shadow-lg p-3 min-w-[160px] animate-scale-in">
      <p className="text-xs text-muted-foreground font-semibold mb-2">{label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center justify-between gap-4 py-0.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.fill || entry.color }} />
            <span className="text-xs text-muted-foreground">{entry.name}</span>
          </div>
          <span className="text-sm font-bold text-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export function TemperatureChart({ data }: { data: ChartData[] }) {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">Temperature Trend</h3>
        <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">°C</span>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 72%, 55%)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="hsl(0, 72%, 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke={axisStroke} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} stroke={axisStroke} axisLine={false} tickLine={false} unit="°" />
            <Tooltip content={<CustomTooltip unit="°C" color="hsl(0, 72%, 55%)" metricName="Temperature" data={data} />} />
            <Area type="monotone" dataKey="temp" stroke="hsl(0, 72%, 55%)" fill="url(#tempGrad)" strokeWidth={2.5} name="Temperature (°C)" dot={false} activeDot={{ r: 5, strokeWidth: 2, fill: "white", stroke: "hsl(0, 72%, 55%)" }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function HumidityChart({ data }: { data: ChartData[] }) {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">Humidity Trend</h3>
        <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">%</span>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="humGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(205, 70%, 50%)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="hsl(205, 70%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke={axisStroke} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} stroke={axisStroke} axisLine={false} tickLine={false} unit="%" />
            <Tooltip content={<CustomTooltip unit="%" color="hsl(205, 70%, 50%)" metricName="Humidity" data={data} />} />
            <Area type="monotone" dataKey="humidity" stroke="hsl(205, 70%, 50%)" fill="url(#humGrad)" strokeWidth={2.5} name="Humidity (%)" dot={false} activeDot={{ r: 5, strokeWidth: 2, fill: "white", stroke: "hsl(205, 70%, 50%)" }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function AirQualityChart({ data }: { data: ChartData[] }) {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">Air Quality Index</h3>
        <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">AQI</span>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="aqiGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(152, 58%, 38%)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="hsl(152, 58%, 38%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke={axisStroke} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} stroke={axisStroke} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip unit="" color="hsl(152, 58%, 38%)" metricName="AQI" data={data} />} />
            <Area type="monotone" dataKey="airQuality" stroke="hsl(152, 58%, 38%)" fill="url(#aqiGrad)" strokeWidth={2.5} dot={false} name="AQI" activeDot={{ r: 5, strokeWidth: 2, fill: "white", stroke: "hsl(152, 58%, 38%)" }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ComparisonChart({ data }: { data: ComparisonData[] }) {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">District Comparison</h3>
        <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">Temp & Humidity</span>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
            <XAxis dataKey="district" tick={{ fontSize: 10 }} stroke={axisStroke} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} stroke={axisStroke} axisLine={false} tickLine={false} />
            <Tooltip content={<ComparisonTooltip />} />
            <Bar dataKey="temp" fill="hsl(0, 72%, 55%)" radius={[8, 8, 0, 0]} name="Temp (°C)" />
            <Bar dataKey="humidity" fill="hsl(205, 70%, 50%)" radius={[8, 8, 0, 0]} name="Humidity (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}