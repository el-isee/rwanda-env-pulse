import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-kigali.jpg";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroImage}
        alt="Kigali skyline"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/80 via-foreground/60 to-primary/40" />

      <div className="relative z-10 container px-4">
        <div className="max-w-3xl space-y-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/15 text-primary-foreground text-sm font-medium">
            <Activity className="h-3.5 w-3.5 text-green-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            Live Monitoring Active
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-[1.1] tracking-tight">
            Smart Environmental
            <br />
            <span className="text-green-400">Insights</span> for Rwanda
          </h1>

          <p className="text-lg text-primary-foreground/70 max-w-xl leading-relaxed">
            Monitor climate trends across all 30 districts in real-time. Temperature, humidity, and air quality — unified in one powerful platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="rounded-xl text-base gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25">
              <Link to="/dashboard">
                <BarChart3 className="h-4 w-4" />
                View Dashboard
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-xl text-base gap-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm">
              <Link to="/dashboard">
                Explore Data
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Stats strip */}
          <div className="flex gap-8 pt-4">
            {[
              { val: "30", label: "Districts" },
              { val: "5", label: "Provinces" },
              { val: "24/7", label: "Monitoring" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-bold text-primary-foreground">{s.val}</p>
                <p className="text-xs text-primary-foreground/50 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
