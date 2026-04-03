import { Lightbulb, Umbrella, Sun, Wind, Droplets, Thermometer } from "lucide-react";
import { useMemo } from "react";

interface EnvironmentalTipsProps {
  avgTemp: number;
  avgHumidity: number;
  airQuality: number;
  maxTemp: number;
}

interface Tip {
  icon: React.ElementType;
  title: string;
  message: string;
  color: string;
}

export default function EnvironmentalTips({ avgTemp, avgHumidity, airQuality, maxTemp }: EnvironmentalTipsProps) {
  const tips = useMemo(() => {
    const t: Tip[] = [];

    if (maxTemp > 28) {
      t.push({ icon: Sun, title: "Heat Protection", message: "Wear sunscreen, stay hydrated, and avoid outdoor activities between 11AM–3PM.", color: "text-warm" });
    }
    if (avgHumidity > 75) {
      t.push({ icon: Umbrella, title: "Rain Likely", message: "High humidity suggests rain. Carry an umbrella and secure outdoor items.", color: "text-secondary" });
    }
    if (airQuality > 60) {
      t.push({ icon: Wind, title: "Air Quality", message: "Consider wearing a mask outdoors, especially if you have respiratory conditions.", color: "text-destructive" });
    }
    if (avgTemp < 18) {
      t.push({ icon: Thermometer, title: "Cool Weather", message: "Layer up! Mornings and evenings will be cooler than midday.", color: "text-cool" });
    }
    if (avgHumidity < 50) {
      t.push({ icon: Droplets, title: "Low Humidity", message: "Stay hydrated and use moisturizer. Dry conditions can irritate skin and airways.", color: "text-muted-foreground" });
    }

    // Always show at least one general tip
    if (t.length === 0) {
      t.push({ icon: Lightbulb, title: "Great Conditions", message: "Weather looks pleasant! Perfect for outdoor activities and exercise.", color: "text-primary" });
    }

    return t;
  }, [avgTemp, avgHumidity, airQuality, maxTemp]);

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-accent/10">
          <Lightbulb className="h-4 w-4 text-accent" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-foreground">Environmental Tips</h3>
          <p className="text-xs text-muted-foreground">Personalized recommendations based on current conditions</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {tips.map((tip) => (
          <div key={tip.title} className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/30 border border-border/50">
            <tip.icon className={`h-5 w-5 shrink-0 mt-0.5 ${tip.color}`} />
            <div>
              <p className="text-sm font-semibold text-foreground">{tip.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{tip.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
