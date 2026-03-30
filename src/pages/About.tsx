import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Zap, Globe } from "lucide-react";

const values = [
  { icon: Shield, title: "Accuracy", desc: "High-precision IoT sensors with rigorous calibration ensure reliable environmental data." },
  { icon: Zap, title: "Real-Time", desc: "Data streams update every minute, giving you the freshest insights for decision-making." },
  { icon: Globe, title: "Coverage", desc: "Every province and district in Rwanda is monitored through our distributed sensor network." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container pt-28 pb-20 max-w-4xl space-y-16">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">About</p>
          <h1 className="font-display text-4xl font-bold text-foreground tracking-tight">
            Rwanda Environmental<br />Monitoring Dashboard
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            A smart platform designed to provide real-time environmental data across all 30 districts. We empower government agencies, researchers, and citizens with accessible climate intelligence.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.title} className="glass-card p-6 space-y-3">
              <div className="inline-flex p-2.5 rounded-xl bg-primary/10 text-primary">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display font-semibold text-foreground">{v.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
