"use client";

import type { RatingValue } from "@/lib/types";

type RatingSelectProps = {
  label: string;
  value: RatingValue;
  onChange: (value: RatingValue) => void;
};

export function RatingSelect({ label, value, onChange }: RatingSelectProps) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <select
        className="input"
        value={value}
        onChange={(event) => onChange(Number(event.target.value) as RatingValue)}
      >
        {[1, 2, 3, 4, 5].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
