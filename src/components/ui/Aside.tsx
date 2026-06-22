import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import type { AsideProps } from "../../types/ui";

export default function Aside({
    title,
    subtitle,
    links = [],
    showLogout = true,
    onLogout,
}: AsideProps) {
    const [open, setOpen] = useState<boolean>(false);

    const asideRef = useRef<HTMLElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    // TODO: Cerrar al hacer clic fuera
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;

            const clickedAside =
                asideRef.current?.contains(target);

            const clickedButton =
                buttonRef.current?.contains(target);

            if (!clickedAside && !clickedButton) {
                setOpen(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    // TODO: Cerrar al hacer scroll
    useEffect(() => {
        function handleScroll() {
            setOpen(false);
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);

    return (
        <>
            {/*//TODO: Botón hamburguesa */}
            <button
                ref={buttonRef}
                onClick={() => setOpen(!open)}
                className="
                    fixed
                    top-5
                    right-5
                    z-50
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-[hsl(var(--primary))]
                    text-[hsl(var(--primary-foreground))]
                    shadow-lg
                "
            >
                {open ? <X size={22} /> : <Menu size={22} />}
            </button>

            <AnimatePresence>
                {open && (
                    <motion.aside
                        ref={asideRef}
                        initial={{ opacity: 0, x: 25, y: -25, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 25, y: -25, scale: 0.95 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="
                            fixed
                            top-5
                            right-5
                            z-40
                            w-80
                            rounded-3xl
                            border
                            border-white/10
                            bg-zinc-950/95
                            p-5
                            shadow-2xl
                            backdrop-blur-xl
                        "
                    >
                        <div className="mb-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--primary))]">
                                {subtitle}
                            </p>

                            <h2 className="mt-1 text-2xl font-black text-white">
                                {title}
                            </h2>
                        </div>

                        {/* //TODO: Navegación: "Mapero de rutas de Admin" */}
                        <nav className="space-y-2">
                            {links.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() =>
                                            setOpen(false)
                                        }
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-4
                                            py-3
                                            text-zinc-300
                                            transition
                                            hover:bg-[hsl(var(--primary))]
                                            hover:text-white
                                        "
                                    >
                                        <Icon size={18} className="text-[hsl(var(--accent))]" />

                                        <span>
                                            {item.name}
                                        </span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* //TODO: Cerrar sesión */}
                        {showLogout && (
                            <div className="mt-6 border-t border-white/10 pt-4">
                                <button
                                    onClick={() => {
                                        setOpen(false);

                                        onLogout?.();
                                    }}
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        gap-3
                                        rounded-xl
                                        px-4
                                        py-3
                                        text-red-400
                                        transition
                                        hover:bg-red-500/10
                                    "
                                >
                                    <LogOut size={18} />

                                    <span>
                                        Cerrar sesión
                                    </span>
                                </button>
                            </div>
                        )}
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}
