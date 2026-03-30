import { Link } from "react-router-dom";
import { ArrowRight, BarChart3 } from "lucide-react";
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
      <div className="absolute inset-0 gradient-hero" />

      <div className="relative z-10 container text-center px-4">
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground text-sm font-medium">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Live Monitoring Active
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground leading-tight">
            Smart Environmental Insights for Rwanda
          </h1>

          <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Monitor climate trends across all districts in real-time. Temperature, humidity, and air quality — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-xl text-base gap-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link to="/dashboard">
                <BarChart3 className="h-5 w-5" />
                View Dashboard
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-xl text-base gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/dashboard">
                Explore Data
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
