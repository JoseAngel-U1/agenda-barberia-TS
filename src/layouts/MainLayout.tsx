import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="Main-layout">
            <Outlet />
            {/*
                //? Renderiza la ruta hija correspondiente a una ruta padre;
                //? si no encuentra ninguna ruta hija, no renderiza nada.
            */}
        </div>
    );
}