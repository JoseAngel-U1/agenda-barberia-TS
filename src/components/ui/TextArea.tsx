import type { TextAreaProps } from '../../types/ui';

export default function TextArea({ label, value = "", onChange }: TextAreaProps) {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-400">{label}</span>
            <textarea
                rows={5}
                value={value}
                onChange={(event) => onChange?.(event.target.value)}
                className="w-full resize-none rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-[hsl(var(--primary)/0.7)] focus:ring-4 focus:ring-[hsl(var(--primary)/0.1)]"
            />
        </label>
    )
}
