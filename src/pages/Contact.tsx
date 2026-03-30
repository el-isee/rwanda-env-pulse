import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

const info = [
  { icon: Mail, label: "Email", value: "info@rem-dashboard.rw" },
  { icon: Phone, label: "Phone", value: "+250 788 000 000" },
  { icon: MapPin, label: "Location", value: "Kigali, Rwanda" },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container pt-28 pb-20 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Contact</p>
              <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">Get in Touch</h1>
              <p className="text-muted-foreground leading-relaxed">
                Have questions about the platform or want to partner with us? We'd love to hear from you.
              </p>
            </div>

            <div className="space-y-4">
              {info.map((i) => (
                <div key={i.label} className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <i.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{i.label}</p>
                    <p className="text-sm font-medium text-foreground">{i.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form className="glass-card p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="Your name" className="rounded-xl border-border" />
            <Input type="email" placeholder="Your email" className="rounded-xl border-border" />
            <Textarea placeholder="Your message" className="rounded-xl border-border min-h-[140px]" />
            <Button type="submit" className="rounded-xl w-full">Send Message</Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
