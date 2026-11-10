import React from 'react';
import { CATEGORY_METAS } from '../data';

interface ChapterNavProps {
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  totalCount: number;
}

export const ChapterNav: React.FC<ChapterNavProps> = ({
  selectedCategory,
  onSelectCategory,
  totalCount,
}) => {
  return (
    <div>
      {/* Mobile Chapter Selector (Compact Native Dropdown) */}
      <div className="md:hidden mb-5">
        <label htmlFor="chapter-select" className="block text-sm font-bold text-black dark:text-white mb-1.5">
          Select Chapter
        </label>
        <select
          id="chapter-select"
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
          className="w-full text-sm font-semibold bg-white dark:bg-black border-2 border-black dark:border-white rounded py-2 px-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
        >
          <option value="all">All Chapters (1–1000) — {totalCount} Questions</option>
          {CATEGORY_METAS.map((cat) => (
            <option key={cat.id} value={cat.id}>
              Part {cat.part}: {cat.banglaTitle.split(':')[1]?.trim() || cat.banglaTitle} ({cat.range})
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 shrink-0 text-sm">
        <div className="sticky top-20 border-r-2 border-neutral-300 dark:border-neutral-800 pr-5 pb-8 space-y-1.5">
          <div className="pb-2.5 mb-2.5 border-b-2 border-neutral-300 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-xs font-bold text-black dark:text-white uppercase tracking-wider font-mono">
              Chapters
            </span>
            <span className="font-mono text-black dark:text-white text-xs font-bold">
              {CATEGORY_METAS.length} Parts
            </span>
          </div>

          <button
            onClick={() => onSelectCategory('all')}
            className={`w-full text-left px-3 py-2.5 rounded transition-colors flex items-center justify-between ${
              selectedCategory === 'all'
                ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                : 'text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-900 font-semibold'
            }`}
          >
            <span className="text-sm">All Chapters (1–1000)</span>
            <span className="font-mono text-sm font-bold ml-2">
              {totalCount}
            </span>
          </button>

          {CATEGORY_METAS.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const shortTitle = cat.banglaTitle.split(':')[1]?.trim() || cat.banglaTitle;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full text-left px-3 py-2.5 rounded transition-colors flex flex-col gap-1 relative ${
                  isActive
                    ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                    : 'text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-900 font-medium'
                }`}
              >
                <div className="flex items-baseline justify-between gap-1 w-full">
                  <span className={`font-mono text-sm font-bold shrink-0 ${isActive ? 'text-white dark:text-black' : 'text-black dark:text-white'}`}>
                    Part {cat.part}
                  </span>
                  <span className={`font-mono text-xs font-bold shrink-0 ${isActive ? 'text-white dark:text-black' : 'text-black dark:text-white'}`}>
                    {cat.range}
                  </span>
                </div>
                <span className="text-sm leading-snug line-clamp-2">
                  {shortTitle}
                </span>
              </button>
            );
          })}
        </div>
      </aside>
    </div>
  );
};
