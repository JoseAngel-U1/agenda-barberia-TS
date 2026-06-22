# Agenda Barberia TS

Documento de contexto generado originalmente el 19/06/2026 a las 02:49 p. m. y recreado para mantener referencia del estado del proyecto.

## Proposito del proyecto

Agenda Barberia TS es una aplicacion web para una barberia con flujo publico de reservas y paneles internos para administracion, barberos y super administracion.

El proyecto viene de una migracion de JavaScript a TypeScript. El foco actual del desarrollo es ordenar componentes, centralizar tipos y reducir codigo repetido mientras se conserva el comportamiento existente.

## Stack principal

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Lucide React
- LocalStorage como persistencia temporal de citas

## Backend previsto

El backend se trabajara con Laravel en:

```text
D:\laragon\www\agenda-barberia-backend
```

La carpeta backend contiene una instalacion Laravel base con `app`, `bootstrap`, `config`, `database`, `public`, `routes`, `storage`, `vendor`, `.env`, `composer.json`, `composer.lock` y `artisan`.

## Scripts del frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

Cuando `npm` o `npx` global fallen, se pueden usar los binarios locales:

```bash
.\node_modules\.bin\tsc.cmd --noEmit --incremental false --pretty false -p tsconfig.app.json
.\node_modules\.bin\eslint.cmd .
```

## Estructura actual

```text
src/
  components/
    admin/
      barbers/
      services/
    Barber/
    Booking/
    Shared/
    ui/
  config/
  layouts/
  Pages/
  routes/
  types/
```

## Componentes principales

### Admin Barbers

La vista `src/Pages/Admin/AdminBarbers.tsx` se esta dividiendo en componentes ubicados en `src/components/admin/barbers/`:

- `BarbersHeader.tsx`: encabezado y accion para agregar barbero.
- `BarbersFilters.tsx`: busqueda, filtro por estado y boton de exportacion.
- `BarbersTable.tsx`: tabla de barberos con paginacion de 5 registros por pagina.
- `BarberFormPanel.tsx`: formulario para crear/editar barberos.

La vista mantiene el estado principal:

- `barbers`
- `selectedBarber`
- `barberForm`
- `formState`
- `createStep`
- `searchTerm`
- `statusFilter`

La lista visible se calcula como `filteredBarbers` y se pasa a `BarbersTable`.

### Admin Services

La vista `src/Pages/Admin/AdminServices.tsx` usa:

- `src/components/admin/services/ServiceCard_Edit.tsx`

Este componente contiene la card editable de servicios y recibe sus acciones por props.

### Barber

Las vistas del modulo barbero usan componentes en `src/components/Barber/`:

- `BarberHeader.tsx`: header reutilizable para vistas del barbero; recibe `title`, `description` y `rightContent`.
- `BarberSchedule.tsx`: lista de horarios del dia en dashboard.
- `CurrentAppointmentCard.tsx`: card lateral del cliente actual.
- `WeekSchedule.tsx`: apoyo para vista semanal.
- `AppointmentCard.tsx`: card reutilizable para citas.

`src/Pages/Barber/BarberDashboard.tsx` mantiene el estado de `appointmentStatus` y pasa datos/handlers a los componentes.

`src/Pages/Barber/BarberWeek.tsx` usa `BarberHeader` para mantener consistencia visual.

### Booking y Home

- `src/components/Booking/ServiceCard.tsx` se usa tanto en landing como en booking.
- `src/Pages/Booking/Booking.tsx` controla el flujo de reserva.
- Las citas se guardan temporalmente en `localStorage` con la clave `appointments`.

## Tipos centralizados

Los tipos estan centralizados en `src/types/`:

- `auth.ts`: roles y usuario.
- `barber.ts`: modelos de barbero, estados, descansos y horarios.
- `booking.ts`: citas, estados de cita, agenda semanal y agrupaciones.
- `service.ts`: servicios publicos y servicios administrables.
- `site.ts`: configuracion del sitio, navegacion y branding.
- `theme.ts`: temas y configuracion visual.
- `ui.ts`: props de componentes compartidos.

Regla recomendada: si una interfaz se usa en mas de un archivo, o representa un contrato de componente separado, debe vivir en `src/types/`.

## Rutas principales

### Publicas

- `/`: home.
- `/reservar`: flujo de reserva.
- `/login`: login.
- `*`: pagina 404.

### Admin

- `/admin`: gestion de barberos.
- `/admin/services`: gestion de servicios.
- `/admin/admin-rest-days`: gestion de descansos.

### Barbero

- `/barber`: dashboard diario.
- `/barber/week`: agenda semanal.

### Super Admin

- `/superadmin`: configuracion de modulos.

## Configuracion importante

- `src/config/siteConfig.ts`: nombre del negocio, rutas, flags y navegacion.
- `src/config/theme.ts`: temas predefinidos y tema custom.
- `src/config/services.ts`: servicios publicos.
- `src/config/barbers.ts`: barberos y horarios para reserva.
- `src/config/branding.ts`: datos derivados de marca.

## Flujo de reserva

`Booking.tsx` permite:

1. Seleccionar servicio.
2. Seleccionar barbero.
3. Elegir fecha.
4. Elegir hora disponible.
5. Confirmar cita con nombre del cliente.

La disponibilidad se calcula cruzando horarios del barbero con citas existentes en `localStorage`.

## Estado tecnico actual

- El tipado ya fue centralizado en `src/types/`.
- Se separaron componentes de Admin Barbers.
- Se separaron componentes del dashboard de Barbero.
- `MetricCard` vive en `src/components/Shared/MetricCard.tsx` y se usa en varias vistas.
- Las validaciones recientes con TypeScript y ESLint se han hecho con binarios locales cuando `npm/npx` global falla.

## Pendientes recomendados

- Conectar autenticacion real en rutas protegidas.
- Reemplazar mocks y `localStorage` por API/base de datos.
- Unificar origen de datos para Admin, Booking y Barber.
- Terminar exportacion real a Excel en Admin Barbers.
- Agregar pruebas para disponibilidad de horarios, creacion/edicion de barberos y paginacion.
- Revisar nombres de carpetas para mantener una convencion unica (`Barber`, `Booking`, `Shared`, `ui`).

## Convenciones sugeridas

- Componentes reutilizables por modulo en `src/components/<modulo>/`.
- Componentes realmente genericos en `src/components/Shared/` o `src/components/ui/`.
- Tipos en `src/types/`.
- Configuracion editable del negocio en `src/config/`.
- Las paginas deben orquestar estado y pasar props; los componentes deben renderizar UI y emitir callbacks.
