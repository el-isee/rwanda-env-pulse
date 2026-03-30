import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  trend?: "up" | "down";
  trendValue?: string;
  variant: "cool" | "normal" | "hot" | "warm";
}

const variantClasses: Record<string, string> = {
  cool: "bg-cool/10 text-cool",
  normal: "bg-normal/10 text-normal",
  hot: "bg-hot/10 text-hot",
  warm: "bg-warm/10 text-warm",
};

export default function MetricCard({ title, value, unit, icon: Icon, trend, trendValue, variant }: MetricCardProps) {
  return (
    <div className="glass-card p-5 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm font-medium">{title}</span>
        <div className={`p-2 rounded-lg ${variantClasses[variant]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-display text-2xl font-bold text-foreground">{value}</span>
        <span className="text-muted-foreground text-sm">{unit}</span>
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-medium ${trend === "up" ? "text-hot" : "text-cool"}`}>
          {trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {trendValue}
        </div>
      )}
    </div>
  );
}
