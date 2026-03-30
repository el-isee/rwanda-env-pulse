import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-12">
      <div className="container text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-primary font-display font-bold">
          <Leaf className="h-5 w-5" />
          REM Dashboard
        </div>
        <p className="text-muted-foreground text-sm">
          Built for Rwanda Smart Monitoring Initiative
        </p>
        <p className="text-muted-foreground/60 text-xs">
          © {new Date().getFullYear()} Rwanda Environmental Monitoring. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
