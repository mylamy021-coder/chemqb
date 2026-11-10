import React from 'react';

// Converts Bengali digits to English digits for search inputs
export function normalizeDigits(input: string): string {
  const bengaliToEnglish: Record<string, string> = {
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
    '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
  };
  return input.replace(/[০-৯]/g, (match) => bengaliToEnglish[match] || match);
}

// Converts English digits to Bengali digits
export function toBengaliDigits(input: number | string): string {
  const englishToBengali = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(input).replace(/[0-9]/g, (w) => englishToBengali[+w]);
}

// Pads question number e.g. 1 -> 001, 42 -> 042, 1000 -> 1000
export function formatQuestionNumber(id: number): string {
  return String(id).padStart(3, '0');
}

// Helper to highlight matching substrings cleanly
export function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query || query.trim().length === 0) {
    return <>{text}</>;
  }

  const cleanQuery = query.trim();
  // Escape regex special chars
  const escaped = cleanQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === cleanQuery.toLowerCase() ? (
          <mark
            key={i}
            className="bg-amber-200/70 dark:bg-amber-900/60 text-stone-900 dark:text-stone-100 px-0.5 rounded-xs"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}
