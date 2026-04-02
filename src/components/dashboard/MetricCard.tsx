import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

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
  const numericValue = parseFloat(value);
  const animated = useAnimatedCounter(numericValue);
  const decimals = value.includes(".") ? value.split(".")[1].length : 0;

  return (
    <div className="glass-card p-5 space-y-3 group">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{title}</span>
        <div className={`p-2 rounded-xl ${variantClasses[variant]} transition-transform group-hover:scale-110`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-display text-3xl font-bold text-foreground tracking-tight">
          {animated.toFixed(decimals)}
        </span>
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
