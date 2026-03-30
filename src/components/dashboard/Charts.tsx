import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

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

const tooltipStyle = {
  borderRadius: 12,
  border: "none",
  boxShadow: "0 4px 24px -4px hsla(210, 30%, 10%, 0.12)",
  fontSize: 13,
  padding: "8px 14px",
};

const gridStroke = "hsl(200, 15%, 92%)";
const axisStroke = "hsl(210, 10%, 55%)";

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
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="temp" stroke="hsl(0, 72%, 55%)" fill="url(#tempGrad)" strokeWidth={2.5} name="Temperature (°C)" dot={false} />
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
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="humidity" stroke="hsl(205, 70%, 50%)" fill="url(#humGrad)" strokeWidth={2.5} name="Humidity (%)" dot={false} />
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
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="airQuality" stroke="hsl(152, 58%, 38%)" fill="url(#aqiGrad)" strokeWidth={2.5} dot={false} name="AQI" />
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
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="temp" fill="hsl(0, 72%, 55%)" radius={[8, 8, 0, 0]} name="Temp (°C)" />
            <Bar dataKey="humidity" fill="hsl(205, 70%, 50%)" radius={[8, 8, 0, 0]} name="Humidity (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
