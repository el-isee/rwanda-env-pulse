import { Thermometer, Droplets, Wind, MapPin } from "lucide-react";
import climateClear from "@/assets/climate-clear.jpg";

const features = [
  { icon: Thermometer, title: "Temperature Tracking", desc: "Real-time temperature data across all 30 districts with trend analysis.", color: "bg-destructive/10 text-destructive" },
  { icon: Droplets, title: "Humidity Monitoring", desc: "Track moisture levels with precision IoT sensors deployed nationwide.", color: "bg-secondary/10 text-secondary" },
  { icon: Wind, title: "Air Quality Index", desc: "Monitor particulate matter and pollutant levels continuously.", color: "bg-primary/10 text-primary" },
  { icon: MapPin, title: "District Coverage", desc: "Full coverage across all 5 provinces with interactive map views.", color: "bg-accent/10 text-accent" },
];

export default function Features() {
  return (
    <section className="relative py-28 overflow-hidden">
      <img src={climateClear} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      <div className="container relative z-10">
      <div className="text-center mb-16 space-y-3">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">What We Track</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
          Comprehensive Environmental Data
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Real-time monitoring powered by IoT sensors deployed across Rwanda's districts.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="group glass-card p-6 space-y-4 hover:shadow-lg"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className={`inline-flex p-3 rounded-xl ${f.color}`}>
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display font-semibold text-foreground">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
