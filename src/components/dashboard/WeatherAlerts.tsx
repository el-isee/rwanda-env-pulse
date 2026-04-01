import { AlertTriangle, Thermometer, Droplets, Wind, X } from "lucide-react";
import { useState } from "react";

interface Alert {
  id: string;
  type: "temp" | "humidity" | "air";
  severity: "warning" | "danger";
  message: string;
}

interface WeatherAlertsProps {
  district: string;
  avgTemp: number;
  avgHumidity: number;
  maxTemp: number;
  airQuality: number;
}

function generateAlerts({ district, avgTemp, avgHumidity, maxTemp, airQuality }: WeatherAlertsProps): Alert[] {
  const alerts: Alert[] = [];

  if (maxTemp > 30) {
    alerts.push({
      id: "high-temp",
      type: "temp",
      severity: "danger",
      message: `Extreme heat alert in ${district}: ${maxTemp}°C recorded. Stay hydrated and avoid prolonged sun exposure.`,
    });
  } else if (avgTemp > 27) {
    alerts.push({
      id: "warm-temp",
      type: "temp",
      severity: "warning",
      message: `Above-average temperatures in ${district}: ${avgTemp}°C. Monitor conditions.`,
    });
  }

  if (avgHumidity > 80) {
    alerts.push({
      id: "high-humidity",
      type: "humidity",
      severity: "warning",
      message: `High humidity in ${district}: ${avgHumidity}%. Potential for heavy rainfall.`,
    });
  }

  if (airQuality > 65) {
    alerts.push({
      id: "air-quality",
      type: "air",
      severity: airQuality > 75 ? "danger" : "warning",
      message: `${airQuality > 75 ? "Poor" : "Moderate"} air quality in ${district}: AQI ${airQuality.toFixed(0)}. ${airQuality > 75 ? "Limit outdoor activities." : "Sensitive groups should take precautions."}`,
    });
  }

  return alerts;
}

const iconMap = {
  temp: Thermometer,
  humidity: Droplets,
  air: Wind,
};

export default function WeatherAlerts(props: WeatherAlertsProps) {
  const allAlerts = generateAlerts(props);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const alerts = allAlerts.filter((a) => !dismissed.has(a.id));

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2">
      {alerts.map((alert) => {
        const Icon = iconMap[alert.type];
        const isDanger = alert.severity === "danger";

        return (
          <div
            key={alert.id}
            className={`flex items-start gap-3 p-3.5 rounded-xl border animate-fade-in ${
              isDanger
                ? "bg-destructive/10 border-destructive/30 text-destructive"
                : "bg-accent/10 border-accent/30 text-accent-foreground"
            }`}
          >
            <div className={`shrink-0 mt-0.5 p-1.5 rounded-lg ${isDanger ? "bg-destructive/15" : "bg-accent/15"}`}>
              {isDanger ? <AlertTriangle className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
            </div>
            <p className="text-sm flex-1 leading-relaxed">{alert.message}</p>
            <button
              onClick={() => setDismissed((prev) => new Set(prev).add(alert.id))}
              className="shrink-0 p-1 rounded-lg hover:bg-foreground/10 transition-colors"
              aria-label="Dismiss alert"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
