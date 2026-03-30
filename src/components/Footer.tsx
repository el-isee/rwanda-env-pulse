import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="container py-12">
        <div className="grid sm:grid-cols-3 gap-8 items-start">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-display font-bold text-lg">
              <Leaf className="h-5 w-5" />
              REM Dashboard
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Built for the Rwanda Smart Monitoring Initiative. Empowering data-driven environmental decisions.
            </p>
          </div>

          <div className="space-y-3">
            <p className="font-display font-semibold text-foreground text-sm">Quick Links</p>
            <div className="flex flex-col gap-2">
              {[
                { to: "/", label: "Home" },
                { to: "/dashboard", label: "Dashboard" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-display font-semibold text-foreground text-sm">Data Sources</p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>IoT Sensor Network</span>
              <span>Rwanda Met Service</span>
              <span>REMA Database</span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-muted-foreground/60 text-xs">
            © {new Date().getFullYear()} Rwanda Environmental Monitoring. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
