import { useEffect, useRef, useState } from "react";
import { Sun, Cloud, CloudRain, CloudLightning, Wind } from "lucide-react";

const scenes = [
  {
    id: "clear",
    label: "Clear Skies",
    subtitle: "Optimal conditions across Rwanda's highlands",
    icon: Sun,
    bg: "from-sky-400 via-blue-300 to-cyan-200",
    particles: "sun",
    stat: "28°C Average",
  },
  {
    id: "cloudy",
    label: "Overcast",
    subtitle: "Cloud cover building across the western provinces",
    icon: Cloud,
    bg: "from-slate-400 via-gray-400 to-slate-300",
    particles: "clouds",
    stat: "72% Humidity",
  },
  {
    id: "rain",
    label: "Heavy Rainfall",
    subtitle: "Seasonal rains sweeping through the eastern lowlands",
    icon: CloudRain,
    bg: "from-slate-700 via-gray-600 to-slate-500",
    particles: "rain",
    stat: "45mm Rainfall",
  },
  {
    id: "storm",
    label: "Thunderstorm",
    subtitle: "Electrical storms detected — alerts active",
    icon: CloudLightning,
    bg: "from-gray-900 via-slate-800 to-gray-700",
    particles: "lightning",
    stat: "⚠ Severe Alert",
  },
  {
    id: "wind",
    label: "High Winds",
    subtitle: "Monitoring wind patterns for agricultural advisories",
    icon: Wind,
    bg: "from-teal-600 via-emerald-500 to-green-400",
    particles: "wind",
    stat: "35 km/h Gusts",
  },
];

function RainDrops() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-px bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            height: `${12 + Math.random() * 20}px`,
            animationDuration: `${0.4 + Math.random() * 0.4}s`,
            animationDelay: `${Math.random() * 1}s`,
            animation: `rainFall ${0.4 + Math.random() * 0.4}s linear infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

function LightningFlash() {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 150);
      setTimeout(() => {
        setFlash(true);
        setTimeout(() => setFlash(false), 80);
      }, 200);
    }, 3000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-75 ${
          flash ? "opacity-40" : "opacity-0"
        }`}
        style={{ background: "radial-gradient(ellipse at 40% 20%, white, transparent 70%)" }}
      />
      <RainDrops />
      {/* Lightning bolt SVG */}
      <svg
        className={`absolute top-8 left-1/3 w-16 h-40 transition-opacity duration-75 ${flash ? "opacity-90" : "opacity-0"}`}
        viewBox="0 0 64 160"
        fill="none"
      >
        <path
          d="M32 0 L20 60 L36 58 L16 160 L44 80 L28 82 Z"
          fill="white"
          fillOpacity="0.9"
        />
      </svg>
    </>
  );
}

function SunRays() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,220,50,0.35) 0%, transparent 70%)",
          animation: "sunPulse 4s ease-in-out infinite",
        }}
      />
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute top-0 right-10 w-1 origin-bottom"
          style={{
            height: "200px",
            background: "linear-gradient(to bottom, rgba(255,220,50,0.2), transparent)",
            transform: `rotate(${i * 45}deg)`,
            transformOrigin: "50% 0%",
          }}
        />
      ))}
    </div>
  );
}

function FloatingClouds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/15"
          style={{
            width: `${100 + i * 40}px`,
            height: `${40 + i * 15}px`,
            top: `${10 + i * 16}%`,
            animation: `cloudDrift ${12 + i * 4}s ease-in-out infinite alternate`,
            animationDelay: `${i * 2}s`,
            left: `${-10 + i * 20}%`,
          }}
        />
      ))}
    </div>
  );
}

function WindStreaks() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-px bg-white/20 rounded-full"
          style={{
            width: `${60 + Math.random() * 120}px`,
            top: `${Math.random() * 100}%`,
            animation: `windStreak ${1 + Math.random() * 2}s linear infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
}

const particleMap: Record<string, () => JSX.Element> = {
  sun: SunRays,
  clouds: FloatingClouds,
  rain: RainDrops,
  lightning: LightningFlash,
  wind: WindStreaks,
};

export default function ClimateScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollInContainer = -rect.top;
      const sectionHeight = containerRef.current.scrollHeight / scenes.length;
      const idx = Math.min(
        scenes.length - 1,
        Math.max(0, Math.floor(scrollInContainer / sectionHeight))
      );
      setActiveIndex(idx);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ParticleComponent = particleMap[scenes[activeIndex].particles];
  const ActiveIcon = scenes[activeIndex].icon;

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${scenes.length * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background transitions */}
        {scenes.map((scene, i) => (
          <div
            key={scene.id}
            className={`absolute inset-0 bg-gradient-to-br ${scene.bg} transition-opacity duration-1000 ${
              i === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Particles */}
        <div className="absolute inset-0">
          <ParticleComponent />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center space-y-6 px-4">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-transform duration-500"
              key={activeIndex}
            >
              <ActiveIcon className="w-10 h-10 text-white drop-shadow-lg" />
            </div>

            <h2
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg transition-all duration-500"
              key={`title-${activeIndex}`}
            >
              {scenes[activeIndex].label}
            </h2>

            <p className="text-white/70 text-lg sm:text-xl max-w-xl mx-auto transition-all duration-500">
              {scenes[activeIndex].subtitle}
            </p>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-display font-semibold text-lg">
              {scenes[activeIndex].stat}
            </div>

            {/* Scene indicators */}
            <div className="flex justify-center gap-2 pt-6">
              {scenes.map((s, i) => (
                <div
                  key={s.id}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === activeIndex
                      ? "w-8 bg-white"
                      : "w-1.5 bg-white/30"
                  }`}
                />
              ))}
            </div>

            <p className="text-white/40 text-sm pt-2 animate-pulse">
              ↓ Scroll to explore climate conditions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
