import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClimateScroll from "@/components/ClimateScroll";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ClimateScroll />
      <Features />
      <Footer />
    </div>
  );
}
