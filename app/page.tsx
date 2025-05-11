import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TransactionsDashboard } from "@/components/transactions-dashboard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TransactionsDashboard />
      <Footer />
    </main>
  );
}