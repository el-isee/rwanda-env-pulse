import { useEffect, useState } from "react";
import climateClear from "@/assets/climate-clear.jpg";
import climateCloudy from "@/assets/climate-cloudy.jpg";
import climateRain from "@/assets/climate-rain.jpg";
import climateStorm from "@/assets/climate-storm.jpg";
import climateWind from "@/assets/climate-wind.jpg";

const images = [climateClear, climateCloudy, climateRain, climateStorm, climateWind];

export default function AnimatedBg() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${
            i === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
    </div>
  );
}
