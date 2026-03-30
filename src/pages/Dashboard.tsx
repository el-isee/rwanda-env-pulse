import { useState, useMemo } from "react";
import { Thermometer, Droplets, TrendingUp, TrendingDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Filters from "@/components/dashboard/Filters";
import MetricCard from "@/components/dashboard/MetricCard";
import RwandaMap from "@/components/dashboard/RwandaMap";
import { TemperatureChart, HumidityChart, AirQualityChart, ComparisonChart } from "@/components/dashboard/Charts";
import { provinces, getData, getDistrictComparisonData, TimeRange } from "@/data/rwandaData";
import AnimatedBg from "@/components/dashboard/AnimatedBg";

export default function Dashboard() {
  const [province, setProvince] = useState("Kigali City");
  const [district, setDistrict] = useState("Gasabo");
  const [timeRange, setTimeRange] = useState<TimeRange>("daily");

  const data = useMemo(() => getData(district, timeRange), [district, timeRange]);
  const comparison = useMemo(() => getDistrictComparisonData(provinces[province]), [province]);

  const avgTemp = (data.reduce((s, d) => s + d.temp, 0) / data.length).toFixed(1);
  const avgHumidity = (data.reduce((s, d) => s + d.humidity, 0) / data.length).toFixed(1);
  const maxTemp = Math.max(...data.map((d) => d.temp)).toFixed(1);
  const minTemp = Math.min(...data.map((d) => d.temp)).toFixed(1);

  const handleMapDistrictSelect = (d: string, p: string) => {
    setProvince(p);
    setDistrict(d);
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBg />
      <Navbar />
      <main className="container pt-24 pb-16 space-y-8">
        <div className="space-y-1">
          <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">
            Environmental Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time environmental data for <span className="font-medium text-foreground">{district}</span>, {province}
          </p>
        </div>

        <Filters
          province={province}
          district={district}
          timeRange={timeRange}
          onProvinceChange={setProvince}
          onDistrictChange={setDistrict}
          onTimeRangeChange={setTimeRange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Avg Temperature" value={avgTemp} unit="°C" icon={Thermometer} variant="warm" trend="up" trendValue="+0.5° from yesterday" />
          <MetricCard title="Avg Humidity" value={avgHumidity} unit="%" icon={Droplets} variant="cool" trend="down" trendValue="-2.1% from yesterday" />
          <MetricCard title="Highest Recorded" value={maxTemp} unit="°C" icon={TrendingUp} variant="hot" />
          <MetricCard title="Lowest Recorded" value={minTemp} unit="°C" icon={TrendingDown} variant="normal" />
        </div>

        {/* Map + Comparison side by side */}
        <div className="grid lg:grid-cols-2 gap-6">
          <RwandaMap
            selectedDistrict={district}
            selectedProvince={province}
            onDistrictSelect={handleMapDistrictSelect}
          />
          <ComparisonChart data={comparison} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <TemperatureChart data={data} />
          <HumidityChart data={data} />
        </div>

        <div className="grid lg:grid-cols-1 gap-6">
          <AirQualityChart data={data} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
