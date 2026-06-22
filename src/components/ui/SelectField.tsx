import type { SelectFieldProps } from '../../types/ui'

export default function SelectField({ label, value = "", onChange }: SelectFieldProps) {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-400">{label}</span>
            <select
                value={value}
                onChange={(event) => onChange?.(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900 p-3 text-white outline-none transition focus:border-[hsl(var(--primary)/0.7)]"
            >
                <option value="">Seleccionar</option>
                <option value="08:00">08:00</option>
                <option value="14:00">14:00</option>
                <option value="18:00">18:00</option>
            </select>
        </label>
    )
}
