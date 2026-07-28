import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ActivityRadar } from "@/components/sections/radar/ActivityRadar";
import { PopularActivities } from "@/components/sections/PopularActivities";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { TrustSafety } from "@/components/sections/TrustSafety";
import { WaitlistSection } from "@/components/sections/WaitlistSection";
import { AmbassadorSection } from "@/components/sections/AmbassadorSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";

export default function Home() {
  return (
    <>
      <PageViewTracker />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <ActivityRadar />
        <PopularActivities />
        <SocialProofSection />
        <TrustSafety />
        <WaitlistSection />
        <AmbassadorSection />
        <FaqSection />
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
