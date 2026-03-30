export const provinces: Record<string, string[]> = {
  "Kigali City": ["Gasabo", "Kicukiro", "Nyarugenge"],
  Northern: ["Burera", "Gakenke", "Gicumbi", "Musanze", "Rulindo"],
  Southern: ["Gisagara", "Huye", "Kamonyi", "Muhanga", "Nyamagabe", "Nyanza", "Nyaruguru", "Ruhango"],
  Eastern: ["Bugesera", "Gatsibo", "Kayonza", "Kirehe", "Ngoma", "Nyagatare", "Rwamagana"],
  Western: ["Karongi", "Ngororero", "Nyabihu", "Nyamasheke", "Rubavu", "Rusizi", "Rutsiro"],
};

export type TimeRange = "daily" | "weekly" | "monthly";

const rand = (min: number, max: number) => +(min + Math.random() * (max - min)).toFixed(1);

export function generateDailyData(district: string) {
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);
  const base = district.length % 5 + 20;
  return hours.map((h) => ({
    time: h,
    temp: rand(base - 3, base + 8),
    humidity: rand(55, 85),
    airQuality: rand(20, 80),
  }));
}

export function generateWeeklyData(district: string) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const base = district.length % 5 + 21;
  return days.map((d) => ({
    time: d,
    temp: rand(base - 2, base + 6),
    humidity: rand(58, 82),
    airQuality: rand(25, 75),
  }));
}

export function generateMonthlyData(district: string) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const base = district.length % 5 + 22;
  return months.map((m) => ({
    time: m,
    temp: rand(base - 3, base + 5),
    humidity: rand(55, 85),
    airQuality: rand(20, 80),
  }));
}

export function getData(district: string, range: TimeRange) {
  switch (range) {
    case "daily": return generateDailyData(district);
    case "weekly": return generateWeeklyData(district);
    case "monthly": return generateMonthlyData(district);
  }
}

export function getDistrictComparisonData(districtList: string[]) {
  return districtList.map((d) => ({
    district: d,
    temp: rand(19, 28),
    humidity: rand(55, 85),
  }));
}
