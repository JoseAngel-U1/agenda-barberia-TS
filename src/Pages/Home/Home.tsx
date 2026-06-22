import Hero from "./HomeHero";
import Services from "./HomeServices";
import Benefits from "./HomeBenefits";
import CTA from "./HomeCTA";

import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";

export default function Home() {
    return (
        <div className="min-h-screen bg-zinc-900 text-white">
            <Navbar />

            {/* Contenido principal */}
            <Hero />
            <Services />
            <Benefits />
            <CTA />

            <Footer />
        </div>
    );
}