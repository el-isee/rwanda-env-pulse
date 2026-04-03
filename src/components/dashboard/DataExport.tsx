import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DataExportProps {
  data: { time: string; temp: number; humidity: number; airQuality: number }[];
  district: string;
  timeRange: string;
}

export default function DataExport({ data, district, timeRange }: DataExportProps) {
  const exportCSV = () => {
    const headers = ["Time", "Temperature (°C)", "Humidity (%)", "Air Quality (AQI)"];
    const rows = data.map((d) => [d.time, d.temp, d.humidity, d.airQuality].join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${district}_${timeRange}_data.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Data exported successfully!");
  };

  return (
    <Button variant="outline" size="sm" onClick={exportCSV} className="gap-2">
      <Download className="h-4 w-4" />
      Export CSV
    </Button>
  );
}
