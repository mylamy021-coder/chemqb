import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchAndFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (difficulty: string) => void;
  totalFilteredCount: number;
  totalQuestionsCount: number;
  allExpanded: boolean;
  onToggleExpandAll: () => void;
  onResetFilters: () => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedDifficulty,
  setSelectedDifficulty,
  totalFilteredCount,
  totalQuestionsCount,
  allExpanded,
  onToggleExpandAll,
  onResetFilters,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const hasFilter = searchQuery.trim() !== '' || selectedDifficulty !== 'all';

  return (
    <div className="mb-6 space-y-3.5">
      {/* Search Bar - High Contrast */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black dark:text-white">
          <Search className="w-5 h-5 stroke-[2]" />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search questions or answers (e.g. isotope, pH, SN1, 45)..."
          className="w-full pl-11 pr-16 py-2.5 text-sm sm:text-base font-medium bg-white dark:bg-black border-2 border-black dark:border-white rounded text-black dark:text-white placeholder:text-black/60 dark:placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-black dark:text-white hover:opacity-75 rounded transition-opacity"
              title="Clear search"
            >
              <X className="w-5 h-5 stroke-[2]" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-mono font-bold text-black dark:text-white bg-neutral-200 dark:bg-neutral-800 border border-black dark:border-white rounded">
              /
            </kbd>
          )}
        </div>
      </div>

      {/* Control row: Difficulty filter & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-medium text-black dark:text-white">
        {/* Difficulty segments */}
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-black dark:text-white mr-1 select-none">
            Difficulty:
          </span>
          {(
            [
              { id: 'all', label: 'All' },
              { id: 'easy', label: 'Easy' },
              { id: 'medium', label: 'Medium' },
              { id: 'advanced', label: 'Advanced' },
            ] as const
          ).map((diff) => (
            <button
              key={diff.id}
              onClick={() => setSelectedDifficulty(diff.id)}
              className={`px-3 py-1 rounded border transition-colors ${
                selectedDifficulty === diff.id
                  ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white font-bold'
                  : 'bg-transparent text-black dark:text-white border-neutral-400 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900'
              }`}
            >
              {diff.label}
            </button>
          ))}
        </div>

        {/* Status count and Toggle Expand/Collapse - Large font */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm sm:text-base font-bold text-black dark:text-white">
            {totalFilteredCount} of {totalQuestionsCount} questions
          </span>

          <span className="text-black dark:text-white font-bold">|</span>

          <button
            onClick={onToggleExpandAll}
            className="text-black dark:text-white font-semibold underline underline-offset-3 hover:opacity-80 transition-opacity"
          >
            {allExpanded ? 'Collapse All' : 'Expand All'}
          </button>

          {hasFilter && (
            <>
              <span className="text-black dark:text-white font-bold">|</span>
              <button
                onClick={onResetFilters}
                className="text-black dark:text-white font-bold underline underline-offset-3 hover:opacity-80 transition-opacity"
              >
                Reset
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
