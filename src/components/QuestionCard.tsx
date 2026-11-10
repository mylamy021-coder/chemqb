import React, { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronRight } from 'lucide-react';
import { QuestionItem } from '../data/types';
import { formatQuestionNumber, HighlightText } from '../utils/helpers';

interface QuestionCardProps {
  item: QuestionItem;
  onOpenInFlashcard: (item: QuestionItem) => void;
  isExpanded: boolean;
  onToggleExpand: (id: number) => void;
  searchQuery: string;
  isFocused?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  item,
  onOpenInFlashcard,
  isExpanded,
  onToggleExpand,
  searchQuery,
  isFocused = false,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `Question ${item.id}: ${item.question}\n\nAnswer: ${item.answer}${
      item.formula ? `\n\nFormula: ${item.formula}` : ''
    }`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const difficultyEnglishMap: Record<string, string> = {
    'সহজ': 'Easy',
    'প্রাথমিক': 'Easy',
    'মাঝারি': 'Medium',
    'মধ্যবর্তী': 'Medium',
    'উন্নত': 'Advanced',
    'উচ্চতর': 'Advanced',
  };

  const difficultyLabel = difficultyEnglishMap[item.difficulty] || item.difficulty;

  return (
    <article
      id={`question-${item.id}`}
      className={`group py-5 px-3 sm:px-5 border-b border-neutral-300 dark:border-neutral-800 transition-colors ${
        isFocused ? 'bg-neutral-100 dark:bg-neutral-900 is-focused-question' : 'hover:bg-neutral-50 dark:hover:bg-neutral-950'
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-5">
        {/* Large, clearly readable Question Number */}
        <div className="pt-0.5 select-none shrink-0 font-mono text-base sm:text-lg font-bold tabular-nums text-black dark:text-white w-12 sm:w-14 text-right">
          #{formatQuestionNumber(item.id)}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {/* Header Row: Question and expand toggle */}
          <div
            onClick={() => onToggleExpand(item.id)}
            className="cursor-pointer select-none group/title flex items-start justify-between gap-3"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onToggleExpand(item.id);
              }
            }}
          >
            <h3 className="text-base sm:text-[17px] font-semibold text-black dark:text-white leading-[1.65] font-bengali">
              <HighlightText text={item.question} query={searchQuery} />
            </h3>

            <span className="text-black dark:text-white mt-1 shrink-0">
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 stroke-[2]" />
              ) : (
                <ChevronRight className="w-5 h-5 stroke-[2]" />
              )}
            </span>
          </div>

          {/* Collapsible Answer Body */}
          {isExpanded && (
            <div className="mt-3 pt-2 text-black dark:text-white text-sm sm:text-[15px] leading-[1.8] font-bengali transition-opacity duration-150 answer-body">
              <p className="whitespace-pre-line">
                <HighlightText text={item.answer} query={searchQuery} />
              </p>

              {/* Chemical Formula / Equation Box */}
              {item.formula && (
                <div className="mt-3 py-2.5 px-3.5 bg-neutral-100 dark:bg-neutral-900 border-l-3 border-black dark:border-white rounded-r font-mono text-sm text-black dark:text-white overflow-x-auto">
                  <span className="text-xs font-sans text-black dark:text-white uppercase tracking-wider block mb-1 select-none font-bold">
                    EQUATION / FORMULA
                  </span>
                  <code className="select-all font-semibold">{item.formula}</code>
                </div>
              )}

              {/* Action Controls and Metadata Row - No grey */}
              <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-black dark:text-white border-t border-neutral-300 dark:border-neutral-800 font-sans">
                {/* Meta details */}
                <div className="flex items-center gap-2 font-medium">
                  <span className="text-black dark:text-white">{item.category}</span>
                  <span className="text-black dark:text-white">•</span>
                  <span className="text-black dark:text-white font-bold">
                    {difficultyLabel}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopy}
                    className="py-1 px-2.5 rounded border border-neutral-400 dark:border-neutral-700 text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1.5 font-medium"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-4 h-4 text-black dark:text-white" /> : <Copy className="w-4 h-4 text-black dark:text-white" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenInFlashcard(item);
                    }}
                    className="py-1 px-2.5 rounded border border-neutral-400 dark:border-neutral-700 text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors font-medium"
                    title="Practice in flashcards"
                  >
                    Practice
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
