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

export function TemperatureChart({ data }: { data: ChartData[] }) {
  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display font-semibold text-foreground">Temperature Trend</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 72%, 55%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(0, 72%, 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 15%, 90%)" />
            <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="hsl(210, 10%, 45%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(210, 10%, 45%)" unit="°C" />
            <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px -4px rgba(0,0,0,0.1)" }} />
            <Area type="monotone" dataKey="temp" stroke="hsl(0, 72%, 55%)" fill="url(#tempGrad)" strokeWidth={2} name="Temperature (°C)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function HumidityChart({ data }: { data: ChartData[] }) {
  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display font-semibold text-foreground">Humidity Trend</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="humGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(205, 70%, 50%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(205, 70%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 15%, 90%)" />
            <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="hsl(210, 10%, 45%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(210, 10%, 45%)" unit="%" />
            <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px -4px rgba(0,0,0,0.1)" }} />
            <Area type="monotone" dataKey="humidity" stroke="hsl(205, 70%, 50%)" fill="url(#humGrad)" strokeWidth={2} name="Humidity (%)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function AirQualityChart({ data }: { data: ChartData[] }) {
  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display font-semibold text-foreground">Air Quality Index</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 15%, 90%)" />
            <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="hsl(210, 10%, 45%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(210, 10%, 45%)" />
            <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px -4px rgba(0,0,0,0.1)" }} />
            <Line type="monotone" dataKey="airQuality" stroke="hsl(152, 58%, 38%)" strokeWidth={2} dot={false} name="AQI" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ComparisonChart({ data }: { data: ComparisonData[] }) {
  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display font-semibold text-foreground">District Comparison</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 15%, 90%)" />
            <XAxis dataKey="district" tick={{ fontSize: 11 }} stroke="hsl(210, 10%, 45%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(210, 10%, 45%)" />
            <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px -4px rgba(0,0,0,0.1)" }} />
            <Bar dataKey="temp" fill="hsl(0, 72%, 55%)" radius={[6, 6, 0, 0]} name="Temp (°C)" />
            <Bar dataKey="humidity" fill="hsl(205, 70%, 50%)" radius={[6, 6, 0, 0]} name="Humidity (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
