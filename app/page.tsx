import Hero from "@/components/hero";
import Navbar from "@/components/navbar";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#1a0a1e] text-white antialiased">
      <Navbar />
      <Hero />
    </div>
  );
}
