import { AlertTriangle, Thermometer, Droplets, Wind, X, Bell, ShieldAlert, Info } from "lucide-react";
import { useState, useMemo } from "react";

interface Alert {
  id: string;
  type: "temp" | "humidity" | "air" | "forecast" | "system";
  severity: "info" | "warning" | "danger";
  title: string;
  message: string;
  timestamp: string;
}

interface AlertsPanelProps {
  district: string;
  avgTemp: number;
  avgHumidity: number;
  maxTemp: number;
  airQuality: number;
}

function generateAlerts({ district, avgTemp, avgHumidity, maxTemp, airQuality }: AlertsPanelProps): Alert[] {
  const alerts: Alert[] = [];
  const now = new Date();
  const timeStr = (minAgo: number) => {
    const d = new Date(now.getTime() - minAgo * 60000);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (maxTemp > 30) {
    alerts.push({
      id: "extreme-heat",
      type: "temp",
      severity: "danger",
      title: "Extreme Heat Alert",
      message: `Temperature reached ${maxTemp}°C in ${district}. Stay hydrated and avoid prolonged sun exposure.`,
      timestamp: timeStr(5),
    });
  } else if (avgTemp > 27) {
    alerts.push({
      id: "warm-temp",
      type: "temp",
      severity: "warning",
      title: "Above-Average Temperature",
      message: `Average temperature of ${avgTemp}°C in ${district}. Monitor conditions closely.`,
      timestamp: timeStr(12),
    });
  }

  if (avgHumidity > 80) {
    alerts.push({
      id: "high-humidity",
      type: "humidity",
      severity: "warning",
      title: "High Humidity Warning",
      message: `Humidity at ${avgHumidity}% in ${district}. Potential for heavy rainfall and flooding.`,
      timestamp: timeStr(20),
    });
  }

  if (airQuality > 75) {
    alerts.push({
      id: "poor-air",
      type: "air",
      severity: "danger",
      title: "Poor Air Quality",
      message: `AQI at ${airQuality.toFixed(0)} in ${district}. Limit outdoor activities, especially for sensitive groups.`,
      timestamp: timeStr(8),
    });
  } else if (airQuality > 65) {
    alerts.push({
      id: "moderate-air",
      type: "air",
      severity: "warning",
      title: "Moderate Air Quality",
      message: `AQI at ${airQuality.toFixed(0)} in ${district}. Sensitive individuals should take precautions.`,
      timestamp: timeStr(15),
    });
  }

  // Always add an info alert
  alerts.push({
    id: "forecast-info",
    type: "forecast",
    severity: "info",
    title: "Forecast Update",
    message: `Next 24h outlook for ${district}: Temperatures expected between ${(avgTemp - 2).toFixed(0)}°C–${(avgTemp + 4).toFixed(0)}°C.`,
    timestamp: timeStr(2),
  });

  return alerts;
}

const iconMap = {
  temp: Thermometer,
  humidity: Droplets,
  air: Wind,
  forecast: Info,
  system: ShieldAlert,
};

const severityStyles = {
  danger: "bg-destructive/10 border-destructive/30 text-destructive",
  warning: "bg-warm/10 border-warm/30 text-foreground",
  info: "bg-secondary/10 border-secondary/30 text-foreground",
};

const severityIconBg = {
  danger: "bg-destructive/15 text-destructive",
  warning: "bg-warm/15 text-warm",
  info: "bg-secondary/15 text-secondary",
};

const severityBadge = {
  danger: "bg-destructive/20 text-destructive",
  warning: "bg-warm/20 text-warm",
  info: "bg-secondary/20 text-secondary",
};

export default function AlertsPanel(props: AlertsPanelProps) {
  const allAlerts = useMemo(() => generateAlerts(props), [props.district, props.avgTemp, props.avgHumidity, props.maxTemp, props.airQuality]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const alerts = allAlerts.filter((a) => !dismissed.has(a.id));
  const dangerCount = alerts.filter((a) => a.severity === "danger").length;
  const warningCount = alerts.filter((a) => a.severity === "warning").length;

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-destructive/10">
            <Bell className="h-4 w-4 text-destructive" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">Alerts Center</h3>
            <p className="text-xs text-muted-foreground">
              {alerts.length} active alert{alerts.length !== 1 ? "s" : ""}
              {dangerCount > 0 && <span className="text-destructive ml-1">• {dangerCount} critical</span>}
              {warningCount > 0 && <span className="text-warm ml-1">• {warningCount} warning</span>}
            </p>
          </div>
        </div>
        {dismissed.size > 0 && (
          <button
            onClick={() => setDismissed(new Set())}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Show dismissed
          </button>
        )}
      </div>

      <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            <ShieldAlert className="h-8 w-8 mx-auto mb-2 opacity-40" />
            All clear — no active alerts
          </div>
        ) : (
          alerts.map((alert) => {
            const Icon = iconMap[alert.type];
            return (
              <div
                key={alert.id}
                className={`flex items-start gap-3 p-3.5 rounded-xl border animate-fade-in ${severityStyles[alert.severity]}`}
              >
                <div className={`shrink-0 mt-0.5 p-1.5 rounded-lg ${severityIconBg[alert.severity]}`}>
                  {alert.severity === "danger" ? <AlertTriangle className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold">{alert.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${severityBadge[alert.severity]}`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed opacity-80">{alert.message}</p>
                  <span className="text-[10px] text-muted-foreground mt-1 block">{alert.timestamp}</span>
                </div>
                <button
                  onClick={() => setDismissed((prev) => new Set(prev).add(alert.id))}
                  className="shrink-0 p-1 rounded-lg hover:bg-foreground/10 transition-colors"
                  aria-label="Dismiss alert"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
