import { siteConfig } from "../../config/siteConfig"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="py-12 border-t border-white/5 bg-background/50">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">

                {/*//* BRAND */}
                <div className="flex items-center gap-2 opacity-60">
                    <span className="font-headline font-bold text-lg tracking-tight uppercase text-foreground">
                        {siteConfig.business.name}
                    </span>
                </div>

                {/*//* COPYRIGHT */}
                <p className="text-muted-foreground/60 text-sm font-medium">
                    &copy; {currentYear} {siteConfig.business.name}. Todos los derechos reservados.
                </p>

                {/*//* LINKS */}
                <div className="flex gap-8 text-xs text-muted-foreground/40 font-medium">
                    <a
                        href="#"
                        className="hover:text-[hsl(var(--primary))] transition-colors"
                    >
                        Terminos
                    </a>

                    <a
                        href="#"
                        className="hover:text-[hsl(var(--primary))] transition-colors"
                    >
                        Privacidad
                    </a>

                    <a
                        href="#"
                        className="hover:text-[hsl(var(--primary))] transition-colors"
                    >
                        Contacto
                    </a>
                </div>

                {/*//* AUTHOR */}
                <div className="pt-4 text-[10px] text-center text-muted-foreground/30 tracking-widest uppercase">
                    Sistema desarrollado por: Jose Angel Meza
                </div>

            </div>
        </footer>
    )
}