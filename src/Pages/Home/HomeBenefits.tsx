import { Clock, LayoutDashboard, UserCheck } from "lucide-react"
import type { Benefit } from "../../types/ui"

const benefits: Benefit[] = [
    {
        title: "Sin esperas",
        subtitle: "Tu tiempo importa",
        description: "Agenda tu horario y llega directo a atenderte, sin filas ni vueltas innecesarias.",
        icon: Clock,
        color: "primary"
    },
    {
        title: "Estilo a tu medida",
        subtitle: "Cortes con detalle",
        description: "Cuentanos que buscas y te ayudamos a conseguir un acabado limpio, fresco y favorecedor.",
        icon: LayoutDashboard,
        color: "accent"
    },
    {
        title: "Atencion profesional",
        subtitle: "Confianza desde que llegas",
        description: "Un espacio comodo, trato cercano y barberos enfocados en que salgas satisfecho.",
        icon: UserCheck,
        color: "primary"
    }
]

export default function Benefits() {
    return (
        <section className="py-24 px-6 bg-card/20 border-y border-white/5">

            <div className="max-w-7xl mx-auto">

                {/*//TODO: HEADER */}
                <div className="text-center mb-20">
                    <h2 className="font-headline text-4xl sm:text-5xl font-bold mb-4 tracking-tight text-foreground">
                        Por que reservar con nosotros
                    </h2>

                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Hacemos que tu visita sea sencilla, puntual y con el resultado que quieres ver en el espejo.
                    </p>
                </div>

                {/*//TODO: GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {benefits.map((b, index) => {
                        const Icon = b.icon

                        return (
                            <div
                                key={index}
                                className="
                                flex flex-col items-center text-center group
                                transition-all duration-500
                            ">

                                {/*//* ICON WRAPPER */}
                                <div className="
                                    w-20 h-20 rounded-3xl
                                    bg-white/5
                                    border border-white/10

                                    flex items-center justify-center
                                    mb-8

                                    transition-all duration-500

                                    group-hover:scale-110
                                    group-hover:-translate-y-1
                                    group-hover:bg-[hsl(var(--primary)/0.08)]
                                    group-hover:border-[hsl(var(--primary)/0.2)]
                                    group-hover:shadow-xl
                                    group-hover:shadow-[hsl(var(--primary)/0.15)]
                                ">

                                    <Icon
                                        className={`
                                            h-8 w-8 transition-colors duration-300
                                            ${b.color === "primary"
                                                ? "text-[hsl(var(--primary))]"
                                                : "text-[hsl(var(--accent))]"
                                            }
                                        `}
                                    />
                                </div>

                                {/*//* TITLE */}
                                <h3 className="font-headline text-2xl font-bold mb-2 text-foreground">
                                    {b.title}
                                </h3>

                                {/*//* SUBTITLE */}
                                <p className="
                                    text-sm mb-4 uppercase tracking-widest font-medium
                                    text-[hsl(var(--primary))]
                                ">
                                    {b.subtitle}
                                </p>

                                {/*//* DESCRIPTION */}
                                <p className="text-muted-foreground max-w-sm">
                                    {b.description}
                                </p>

                            </div>
                        )
                    })}

                </div>
            </div>
        </section>
    )
}
