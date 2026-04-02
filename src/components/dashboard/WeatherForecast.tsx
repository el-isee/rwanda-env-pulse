import { Sun, Cloud, CloudRain, CloudDrizzle, CloudSun, CloudLightning, Snowflake } from "lucide-react";

interface ForecastDay {
  day: string;
  high: number;
  low: number;
  icon: "sun" | "cloud" | "rain" | "drizzle" | "partly" | "storm" | "snow";
  description: string;
}

const iconMap = {
  sun: Sun,
  cloud: Cloud,
  rain: CloudRain,
  drizzle: CloudDrizzle,
  partly: CloudSun,
  storm: CloudLightning,
  snow: Snowflake,
};

const iconColor: Record<string, string> = {
  sun: "text-warm",
  cloud: "text-muted-foreground",
  rain: "text-secondary",
  drizzle: "text-cool",
  partly: "text-warm",
  storm: "text-destructive",
  snow: "text-cool",
};

function generateForecast(district: string): ForecastDay[] {
  const days = ["Today", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const icons: ForecastDay["icon"][] = ["sun", "partly", "cloud", "drizzle", "rain", "partly", "sun"];
  const descriptions = ["Clear skies", "Partly cloudy", "Overcast", "Light rain", "Showers expected", "Mostly sunny", "Sunny"];
  const base = (district.length % 5) + 20;

  return days.map((day, i) => {
    const seed = (district.charCodeAt(0) + i * 7) % 10;
    return {
      day,
      high: +(base + seed * 0.6 + 3).toFixed(0),
      low: +(base - 2 + seed * 0.3).toFixed(0),
      icon: icons[(i + district.length) % icons.length],
      description: descriptions[(i + district.length) % descriptions.length],
    };
  });
}

export default function WeatherForecast({ district }: { district: string }) {
  const forecast = generateForecast(district);

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display font-semibold text-foreground">7-Day Forecast</h3>
      <div className="grid grid-cols-7 gap-2">
        {forecast.map((day) => {
          const Icon = iconMap[day.icon];
          return (
            <div
              key={day.day}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
            >
              <span className="text-xs font-medium text-muted-foreground">{day.day}</span>
              <Icon className={`h-6 w-6 ${iconColor[day.icon]} transition-transform group-hover:scale-110`} />
              <div className="flex flex-col items-center">
                <span className="text-sm font-bold text-foreground">{day.high}°</span>
                <span className="text-xs text-muted-foreground">{day.low}°</span>
              </div>
              <span className="text-[10px] text-muted-foreground text-center leading-tight hidden lg:block">
                {day.description}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
