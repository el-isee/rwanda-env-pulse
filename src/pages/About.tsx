import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container pt-24 pb-16 max-w-3xl space-y-8">
        <h1 className="font-display text-3xl font-bold text-foreground">About REM Dashboard</h1>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            The Rwanda Environmental Monitoring Dashboard is a smart platform designed to provide real-time environmental data across all 30 districts of Rwanda.
          </p>
          <p>
            Our mission is to empower government agencies, researchers, and citizens with accessible climate intelligence to support sustainable decision-making.
          </p>
          <p>
            By leveraging IoT sensor networks deployed across every province, we track temperature, humidity, and air quality metrics with high accuracy and deliver insights through intuitive visualizations.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
