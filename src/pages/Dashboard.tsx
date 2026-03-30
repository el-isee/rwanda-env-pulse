import { useState, useMemo } from "react";
import { Thermometer, Droplets, TrendingUp, TrendingDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Filters from "@/components/dashboard/Filters";
import MetricCard from "@/components/dashboard/MetricCard";
import { TemperatureChart, HumidityChart, AirQualityChart, ComparisonChart } from "@/components/dashboard/Charts";
import { provinces, getData, getDistrictComparisonData, TimeRange } from "@/data/rwandaData";

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container pt-24 pb-16 space-y-8">
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-bold text-foreground">Environmental Dashboard</h1>
          <p className="text-muted-foreground">Real-time environmental data for {district}, {province}</p>
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

        <div className="grid lg:grid-cols-2 gap-6">
          <TemperatureChart data={data} />
          <HumidityChart data={data} />
          <AirQualityChart data={data} />
          <ComparisonChart data={comparison} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
