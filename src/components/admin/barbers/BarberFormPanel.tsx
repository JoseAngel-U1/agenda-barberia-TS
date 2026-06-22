import { ArrowLeft, Save, UserRound } from "lucide-react"
import { useEffect, useRef } from "react"

import TextField from "../../ui/TextField"
import TextArea from "../../ui/TextArea"
import SelectField from "../../ui/SelectField"
import type { AdminBarberFormPanelProps } from "../../../types/ui"

export default function BarberFormPanel({
    formState,
    createStep,
    setCreateStep,
    barberForm,
    setBarberForm,
    saveBarber,
}: AdminBarberFormPanelProps) {

    const nameInputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (formState === "create") {
            nameInputRef.current?.focus()
        }
    }, [formState])

    return (
        <aside className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
            {formState === "empty" && (
                <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                    <UserRound className="mb-4 h-16 w-16 text-zinc-700" />
                    <p className="text-lg font-bold text-zinc-400">Selecciona o crea un barbero</p>
                    <p className="mt-2 max-w-sm text-sm text-zinc-600">
                        Aqui podras editar datos, imagen y horarios de atencion.
                    </p>
                </div>
            )}

            {formState === "create" && (
                <>
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(var(--primary))]">
                                Paso {createStep} de 2
                            </p>
                            <h2 className="mt-1 text-2xl font-black text-white">
                                {createStep === 1 ? "Nuevo barbero" : "Horarios"}
                            </h2>
                        </div>
                        <UserRound className="h-6 w-6 text-[hsl(var(--primary))]" />
                    </div>

                    {createStep === 1 ? (
                        <div className="space-y-4">
                            <TextField
                                refValue={nameInputRef}
                                label="Nombre"
                                value={barberForm.name}
                                onChange={(value) =>
                                    setBarberForm((prev) => ({
                                        ...prev,
                                        name: value,
                                    }))
                                }
                            />
                            <TextField label="Imagen" type="file" />
                            <TextArea
                                label="Descripcion"
                                value={barberForm.description}
                                onChange={(value) =>
                                    setBarberForm((prev) => ({
                                        ...prev,
                                        description: value,
                                    }))
                                }
                            />

                            <button
                                onClick={() => setCreateStep(2)}
                                disabled={!barberForm.name.trim()}
                                className="w-full rounded-xl bg-[hsl(var(--primary))] py-3 font-black text-[hsl(var(--primary-foreground))] transition disabled:cursor-not-allowed disabled:opacity-50 hover:bg-[hsl(var(--primary)/0.9)]"
                            >
                                Siguiente
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <SelectField
                                label="Hora entrada"
                                value={barberForm.entry}
                                onChange={(value) =>
                                    setBarberForm((prev) => ({
                                        ...prev,
                                        entry: value,
                                    }))
                                }
                            />
                            <SelectField
                                label="Hora salida"
                                value={barberForm.exit}
                                onChange={(value) =>
                                    setBarberForm((prev) => ({
                                        ...prev,
                                        exit: value,
                                    }))
                                }
                            />
                            <SelectField
                                label="Hora descanso"
                                value={barberForm.breakTime}
                                onChange={(value) =>
                                    setBarberForm((prev) => ({
                                        ...prev,
                                        breakTime: value,
                                    }))
                                }
                            />

                            {/*//TODO: Botone: */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setCreateStep(1)}
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-900 py-3 font-black text-zinc-300 transition hover:border-[hsl(var(--primary)/0.45)] hover:text-white"
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                    Regresar
                                </button>

                                <button
                                    onClick={saveBarber}
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] py-3 font-black text-[hsl(var(--primary-foreground))] transition hover:bg-[hsl(var(--primary)/0.9)]"
                                >
                                    <Save className="h-5 w-5" />
                                    Guardar
                                </button>
                            </div>

                        </div>
                    )}
                </>
            )}

            {formState === "edit" && (
                <>
                    <div className="mb-6">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(var(--primary))]">
                            Editar
                        </p>
                        <h2 className="mt-1 text-2xl font-black text-white">Editar barbero</h2>
                    </div>
                    <div className="space-y-4">
                        <TextField
                            label="Nombre"
                            value={barberForm.name}
                            onChange={(value) =>
                                setBarberForm((prev) => ({
                                    ...prev,
                                    name: value,
                                }))
                            }
                        />
                        <TextArea
                            label="Descripcion"
                            value={barberForm.description}
                            onChange={(value) =>
                                setBarberForm((prev) => ({
                                    ...prev,
                                    description: value,
                                }))
                            }
                        />
                        <SelectField
                            label="Hora entrada"
                            value={barberForm.entry}
                            onChange={(value) =>
                                setBarberForm((prev) => ({
                                    ...prev,
                                    entry: value,
                                }))
                            }
                        />
                        <SelectField
                            label="Hora salida"
                            value={barberForm.exit}
                            onChange={(value) =>
                                setBarberForm((prev) => ({
                                    ...prev,
                                    exit: value,
                                }))
                            }
                        />
                        <SelectField
                            label="Hora descanso"
                            value={barberForm.breakTime}
                            onChange={(value) =>
                                setBarberForm((prev) => ({
                                    ...prev,
                                    breakTime: value,
                                }))
                            }
                        />
                        <button
                            onClick={saveBarber}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] py-3 font-black text-[hsl(var(--primary-foreground))] transition hover:bg-[hsl(var(--primary)/0.9)]"
                        >
                            <Save className="h-5 w-5" />
                            Guardar cambios
                        </button>
                    </div>
                </>
            )}
        </aside>
    )
}
