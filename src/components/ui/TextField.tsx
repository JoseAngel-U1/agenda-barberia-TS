import type { TextFieldProps } from "../../types/ui"

export default function TextField({
    label,
    type = "text",
    value,
    onChange,
    refValue,
}: TextFieldProps) {
    const valueProps = type === "file"
        ? {}
        : { value: value ?? "" }

    return (
        <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-400">
                {label}
            </span>

            <input
                ref={refValue}
                type={type}
                {...valueProps}
                onChange={(event) =>
                    onChange?.(event.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-[hsl(var(--primary))] file:px-3 file:py-2 file:font-bold file:text-[hsl(var(--primary-foreground))] focus:border-[hsl(var(--primary)/0.7)] focus:ring-4 focus:ring-[hsl(var(--primary)/0.1)]"
            />
        </label>
    )
}

