"use client";

import type { SegmentedOption } from "@/lib/types";

type SegmentedControlProps<TValue extends string> = {
  label: string;
  prompt: string;
  value: TValue;
  options: readonly SegmentedOption<TValue>[];
  onChange: (value: TValue) => void;
};

export function SegmentedControl<TValue extends string>({
  label,
  prompt,
  value,
  options,
  onChange
}: SegmentedControlProps<TValue>) {
  return (
    <fieldset className="space-y-3">
      <legend className="label mb-0">{label}</legend>
      <p className="text-sm text-[var(--ink-soft)]">{prompt}</p>
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
        {options.map((option) => {
          const isSelected = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`rounded-lg border px-4 py-3 text-left transition ${
                isSelected
                  ? "border-[var(--brand-deep)] bg-[var(--brand-deep)] text-white"
                  : "border-[var(--line)] bg-white hover:border-[var(--copper)]/40 hover:bg-[#fffaf0]"
              }`}
              aria-pressed={isSelected}
            >
              <span className="block text-sm font-semibold">{option.label}</span>
              <span className={`mt-1 block text-xs ${isSelected ? "text-white/80" : "text-[var(--ink-soft)]"}`}>
                {option.description}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
