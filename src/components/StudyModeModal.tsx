import React, { useState, useEffect, useCallback } from 'react';
import { X, RotateCw } from 'lucide-react';
import { QuestionItem } from '../data/types';
import { formatQuestionNumber } from '../utils/helpers';

interface StudyModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: QuestionItem[];
  initialQuestion?: QuestionItem | null;
}

export const StudyModeModal: React.FC<StudyModeModalProps> = ({
  isOpen,
  onClose,
  questions,
  initialQuestion,
}) => {
  const [deck, setDeck] = useState<QuestionItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<Set<number>>(new Set());
  const [reviseQueue, setReviseQueue] = useState<QuestionItem[]>([]);
  const [inReviseRound, setInReviseRound] = useState<boolean>(false);

  // Initialize deck
  useEffect(() => {
    if (!isOpen) return;

    if (questions.length === 0) {
      setDeck([]);
      return;
    }

    if (initialQuestion) {
      const idx = questions.findIndex((q) => q.id === initialQuestion.id);
      if (idx !== -1) {
        setDeck(questions);
        setCurrentIndex(idx);
        setIsFlipped(false);
        setInReviseRound(false);
        return;
      }
    }

    setDeck(questions);
    setCurrentIndex(0);
    setIsFlipped(false);
    setInReviseRound(false);
    setMasteredIds(new Set());
    setReviseQueue([]);
  }, [isOpen, questions, initialQuestion]);

  const currentItem = deck[currentIndex];

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleNext = useCallback(() => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  }, [currentIndex, deck.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  }, [currentIndex]);

  const handleMastered = useCallback(() => {
    if (!currentItem) return;
    setMasteredIds((prev) => new Set(prev).add(currentItem.id));

    if (currentIndex < deck.length - 1) {
      handleNext();
    }
  }, [currentItem, currentIndex, deck.length, handleNext]);

  const handleNeedsReview = useCallback(() => {
    if (!currentItem) return;
    setReviseQueue((prev) => {
      if (prev.some((q) => q.id === currentItem.id)) return prev;
      return [...prev, currentItem];
    });

    if (currentIndex < deck.length - 1) {
      handleNext();
    }
  }, [currentItem, currentIndex, deck.length, handleNext]);

  const startReviseQueue = () => {
    if (reviseQueue.length === 0) return;
    setDeck(reviseQueue);
    setReviseQueue([]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setInReviseRound(true);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'ArrowRight' || e.key === 'k') {
        e.preventDefault();
        if (isFlipped) {
          handleMastered();
        } else {
          handleNext();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'j') {
        e.preventDefault();
        if (isFlipped) {
          handleNeedsReview();
        } else {
          handlePrev();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFlipped, handleFlip, handleMastered, handleNeedsReview, handleNext, handlePrev, onClose]);

  if (!isOpen) return null;

  const totalCards = deck.length;
  const progressPercent = totalCards > 0 ? ((currentIndex + 1) / totalCards) * 100 : 0;
  const isLastCard = currentIndex === deck.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white dark:bg-black border-2 border-black dark:border-white rounded shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Simple linear progress bar at the very top */}
        <div className="w-full h-1.5 bg-neutral-300 dark:bg-neutral-800">
          <div
            className="h-full bg-black dark:bg-white transition-all duration-200"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Header - Zero grey, large bold numbers */}
        <div className="px-5 py-3.5 border-b-2 border-black dark:border-white flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm sm:text-base text-black dark:text-white font-mono font-bold">
            <span>
              Card {currentIndex + 1} of {totalCards}
            </span>
            {inReviseRound && (
              <span className="bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                Review Round
              </span>
            )}
            {currentItem && (
              <span className="hidden sm:inline font-bold">
                • #{formatQuestionNumber(currentItem.id)} • {currentItem.category}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1 text-black dark:text-white hover:opacity-75 transition-opacity"
            title="Close (Esc)"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Card Viewport */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto min-h-[320px] flex flex-col justify-between">
          {currentItem ? (
            <div
              onClick={handleFlip}
              className="cursor-pointer select-none flex-1 flex flex-col justify-center py-4"
              role="button"
              tabIndex={0}
            >
              <div className="mb-2.5 text-xs font-mono uppercase tracking-wider text-black dark:text-white font-bold">
                {isFlipped ? 'Answer' : 'Question (Press Space to flip)'}
              </div>

              {!isFlipped ? (
                <div className="text-xl sm:text-2xl font-bold text-black dark:text-white leading-[1.65] font-bengali">
                  {currentItem.question}
                </div>
              ) : (
                <div className="space-y-3 font-bengali">
                  <p className="text-base sm:text-lg font-medium text-black dark:text-white leading-[1.75] whitespace-pre-line">
                    {currentItem.answer}
                  </p>
                  {currentItem.formula && (
                    <div className="mt-3 p-3 bg-neutral-100 dark:bg-neutral-900 border-l-3 border-black dark:border-white rounded-r font-mono text-sm font-semibold text-black dark:text-white">
                      <code>{currentItem.formula}</code>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-base font-bold text-black dark:text-white">
              No questions found for review.
            </div>
          )}

          {/* Prompt cue - High contrast */}
          <div className="pt-4 border-t-2 border-black dark:border-white flex items-center justify-between text-xs sm:text-sm font-bold text-black dark:text-white">
            <span className="flex items-center gap-1.5">
              <RotateCw className="w-4 h-4 stroke-[2]" />
              Tap / Space to flip card
            </span>
            <div className="flex items-center gap-4 font-mono font-bold text-sm">
              <span>Mastered: {masteredIds.size}</span>
              <span>Review: {reviseQueue.length}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 bg-neutral-100 dark:bg-black border-t-2 border-black dark:border-white flex items-center justify-between gap-2 text-xs sm:text-sm font-bold">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-3.5 py-2 rounded border-2 border-black dark:border-white text-black dark:text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={isLastCard}
              className="px-3.5 py-2 rounded border-2 border-black dark:border-white text-black dark:text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-colors"
            >
              Next
            </button>
          </div>

          {/* Assessment / Revise actions */}
          <div className="flex items-center gap-2">
            {isFlipped ? (
              <>
                <button
                  onClick={handleNeedsReview}
                  className="px-3.5 py-2 rounded border-2 border-black dark:border-white text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-colors"
                  title="Revise again (ArrowLeft)"
                >
                  Revise Again
                </button>
                <button
                  onClick={handleMastered}
                  className="px-3.5 py-2 rounded bg-black dark:bg-white text-white dark:text-black font-bold hover:opacity-85 transition-opacity"
                  title="I knew it (ArrowRight)"
                >
                  I Knew It
                </button>
              </>
            ) : (
              <button
                onClick={handleFlip}
                className="px-3.5 py-2 rounded border-2 border-black dark:border-white text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-colors"
              >
                Reveal Answer
              </button>
            )}

            {isLastCard && reviseQueue.length > 0 && (
              <button
                onClick={startReviseQueue}
                className="px-3.5 py-2 rounded bg-black text-white dark:bg-white dark:text-black font-bold hover:opacity-85 transition-opacity ml-2"
              >
                Review Queue ({reviseQueue.length})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
