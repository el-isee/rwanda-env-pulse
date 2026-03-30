import { Thermometer, Droplets, Wind, MapPin } from "lucide-react";

const features = [
  { icon: Thermometer, title: "Temperature Tracking", desc: "Real-time temperature data across all 30 districts", color: "text-hot" },
  { icon: Droplets, title: "Humidity Monitoring", desc: "Track moisture levels with precision sensors", color: "text-cool" },
  { icon: Wind, title: "Air Quality Index", desc: "Monitor particulate matter and pollutants", color: "text-normal" },
  { icon: MapPin, title: "District Coverage", desc: "Full coverage across all 5 provinces of Rwanda", color: "text-warm" },
];

export default function Features() {
  return (
    <section className="py-24 container">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Comprehensive Environmental Data
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Real-time monitoring powered by IoT sensors deployed across Rwanda's districts
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => (
          <div key={f.title} className="glass-card p-6 text-center space-y-4">
            <div className={`inline-flex p-3 rounded-xl bg-muted ${f.color}`}>
              <f.icon className="h-6 w-6" />
            </div>
            <h3 className="font-display font-semibold text-lg text-foreground">{f.title}</h3>
            <p className="text-muted-foreground text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
