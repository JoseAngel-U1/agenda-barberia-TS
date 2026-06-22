import Navbar from "../../components/ui/Navbar"
import Footer from "../../components/ui/Footer"

import NotFoundHero from "../NotFound/NotFoundHero"
import NotFoundLinks from "../NotFound/NotFoundLinks"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
            <Navbar />

            <main className="relative flex min-h-[calc(100vh-84px)] items-center overflow-hidden px-6 py-20">
                <section className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">

                    <NotFoundHero />
                    <NotFoundLinks />

                </section>
            </main>

            <Footer />
        </div>
    )
}