import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function ScrollBehavior(): null {
    const location = useLocation()

    useEffect(() => {
        if (location.hash) {
            // querySelector devuelve Element | null — validamos con instanceof
            const target = document.querySelector(location.hash)

            if (target instanceof HTMLElement) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                })
            }

            return
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }, [location.pathname, location.hash])

    return null
}