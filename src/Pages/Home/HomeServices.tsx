import { services } from "../../config/services"
import ServiceCard from "../../components/Booking/ServiceCard"

export default function Services() {
    return (
        <section id="servicios" className="py-24 bg-background relative overflow-hidden">

            {/*//TODO: FONDO GRADIENTE PREMIUM */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-[hsl(var(--primary)/0.1)] blur-[120px] opacity-40" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/*//* HEADER */}
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="
                        text-3xl md:text-5xl
                        font-headline font-bold
                        tracking-tight mb-4
                    ">
                        Servicios disponibles
                    </h2>

                    <p className="text-muted-foreground text-lg">
                        Elige el servicio que mejor se adapte a tu estilo
                    </p>
                </div>

                {/*//* GRID */}
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <ServiceCard
                            key={service.name}
                            service={service}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}