import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  ALL_QUESTIONS, 
  QuestionItem 
} from './data';
import { Navbar } from './components/Navbar';
import { ChapterNav } from './components/ChapterNav';
import { SearchAndFilters } from './components/SearchAndFilters';
import { QuestionCard } from './components/QuestionCard';
import { StudyModeModal } from './components/StudyModeModal';
import { normalizeDigits } from './utils/helpers';
import { ArrowDown } from 'lucide-react';

const PAGE_SIZE = 30;

export default function App() {
  // Theme state: default to light
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('chem_theme');
      if (savedTheme) return savedTheme === 'dark';
      return false;
    }
    return false;
  });

  // App navigation tab: 'questions' or 'study'
  const [activeTab, setActiveTab] = useState<'questions' | 'study'>('questions');

  // Stored state: chapter and search query
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    try {
      return localStorage.getItem('chem_last_category') || 'all';
    } catch {
      return 'all';
    }
  });

  const [searchQuery, setSearchQuery] = useState<string>(() => {
    try {
      return localStorage.getItem('chem_last_search') || '';
    } catch {
      return '';
    }
  });

  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [page, setPage] = useState<number>(1);

  // Expanded items state: map of question ID to boolean
  const [expandedMap, setExpandedMap] = useState<Record<number, boolean>>({});
  const [allExpanded, setAllExpanded] = useState<boolean>(false);

  // Active keyboard focused question index in visible list
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // Study Modal state
  const [isStudyModalOpen, setIsStudyModalOpen] = useState<boolean>(false);
  const [activeStudyItem, setActiveStudyItem] = useState<QuestionItem | null>(null);

  // Sync theme - pure black dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('chem_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('chem_theme', 'light');
    }
  }, [darkMode]);

  // Sync category
  useEffect(() => {
    try {
      localStorage.setItem('chem_last_category', selectedCategory);
    } catch {
      // ignore
    }
  }, [selectedCategory]);

  // Sync search query
  useEffect(() => {
    try {
      localStorage.setItem('chem_last_search', searchQuery);
    } catch {
      // ignore
    }
  }, [searchQuery]);

  // Reset page when filter changes
  useEffect(() => {
    setPage(1);
    setFocusedIndex(-1);
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  // Filtered Questions with support for English & Bengali digits
  const filteredQuestions = useMemo(() => {
    const rawQuery = searchQuery.trim();
    const normalizedDigitsQuery = normalizeDigits(rawQuery).toLowerCase();
    const isPureNumber = /^\d+$/.test(normalizedDigitsQuery);
    const targetId = isPureNumber ? parseInt(normalizedDigitsQuery, 10) : null;

    return ALL_QUESTIONS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all') {
        const partNum = parseInt(selectedCategory.replace('part-', ''), 10);
        if (item.part !== partNum && item.category !== selectedCategory) {
          return false;
        }
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all') {
        const diff = item.difficulty;
        if (selectedDifficulty === 'easy') {
          if (diff !== 'সহজ' && diff !== 'প্রাথমিক') return false;
        } else if (selectedDifficulty === 'medium') {
          if (diff !== 'মাঝারি' && diff !== 'মধ্যবর্তী') return false;
        } else if (selectedDifficulty === 'advanced') {
          if (diff !== 'উন্নত' && diff !== 'উচ্চতর') return false;
        }
      }

      // Search query filter
      if (!rawQuery) return true;

      // Exact ID match
      if (targetId !== null && item.id === targetId) {
        return true;
      }

      const qLower = item.question.toLowerCase();
      const aLower = item.answer.toLowerCase();
      const fLower = item.formula ? item.formula.toLowerCase() : '';
      const cLower = item.category.toLowerCase();
      const rawLower = rawQuery.toLowerCase();

      // Check both raw query (Bengali text) and normalized query (digits)
      const matchesRaw =
        qLower.includes(rawLower) ||
        aLower.includes(rawLower) ||
        fLower.includes(rawLower) ||
        cLower.includes(rawLower) ||
        item.tags.some((t) => t.toLowerCase().includes(rawLower));

      const matchesNormalized =
        normalizedDigitsQuery.length > 0 &&
        String(item.id).includes(normalizedDigitsQuery);

      return matchesRaw || matchesNormalized;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  // Visible questions slice
  const visibleQuestions = useMemo(() => {
    return filteredQuestions.slice(0, page * PAGE_SIZE);
  }, [filteredQuestions, page]);

  const hasMore = visibleQuestions.length < filteredQuestions.length;

  const handleToggleExpand = useCallback((id: number) => {
    setExpandedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const handleToggleExpandAll = useCallback(() => {
    if (allExpanded) {
      setExpandedMap({});
      setAllExpanded(false);
    } else {
      const all: Record<number, boolean> = {};
      visibleQuestions.forEach((q) => {
        all[q.id] = true;
      });
      setExpandedMap(all);
      setAllExpanded(true);
    }
  }, [allExpanded, visibleQuestions]);

  const handleOpenInFlashcard = useCallback((item: QuestionItem) => {
    setActiveStudyItem(item);
    setIsStudyModalOpen(true);
  }, []);

  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
  }, []);

  // Global Keyboard Navigation: j / k / space / enter / e
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere if typing inside an input or select
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'SELECT' ||
        isStudyModalOpen
      ) {
        return;
      }

      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex((prev) => {
          const next = Math.min(prev + 1, visibleQuestions.length - 1);
          const el = document.getElementById(`question-${visibleQuestions[next]?.id}`);
          el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          return next;
        });
      } else if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex((prev) => {
          const next = Math.max(prev - 1, 0);
          const el = document.getElementById(`question-${visibleQuestions[next]?.id}`);
          el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          return next;
        });
      } else if (e.key === 'Enter' || e.key === ' ') {
        if (focusedIndex >= 0 && focusedIndex < visibleQuestions.length) {
          e.preventDefault();
          const target = visibleQuestions[focusedIndex];
          handleToggleExpand(target.id);
        }
      } else if (e.key === 'e') {
        e.preventDefault();
        handleToggleExpandAll();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    focusedIndex,
    visibleQuestions,
    handleToggleExpand,
    handleToggleExpandAll,
    isStudyModalOpen,
  ]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col font-sans transition-colors">
      {/* Slim Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'study') {
            setActiveStudyItem(null);
            setIsStudyModalOpen(true);
          } else {
            setActiveTab('questions');
          }
        }}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Main Container - Textbook 2-column layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Chapter Navigation Sidebar */}
          <ChapterNav
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            totalCount={ALL_QUESTIONS.length}
          />

          {/* Main Content Pane */}
          <main className="flex-1 min-w-0 w-full">
            {/* Search and Filters Row */}
            <SearchAndFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
              totalFilteredCount={filteredQuestions.length}
              totalQuestionsCount={ALL_QUESTIONS.length}
              allExpanded={allExpanded}
              onToggleExpandAll={handleToggleExpandAll}
              onResetFilters={handleResetFilters}
            />

            {/* Questions List */}
            <section className="bg-white dark:bg-black border-2 border-neutral-300 dark:border-neutral-800 rounded divide-y-2 divide-neutral-300 dark:divide-neutral-800">
              {visibleQuestions.length > 0 ? (
                visibleQuestions.map((item, idx) => (
                  <QuestionCard
                    key={item.id}
                    item={item}
                    onOpenInFlashcard={handleOpenInFlashcard}
                    isExpanded={!!expandedMap[item.id] || allExpanded}
                    onToggleExpand={handleToggleExpand}
                    searchQuery={searchQuery}
                    isFocused={focusedIndex === idx}
                  />
                ))
              ) : (
                <div className="py-20 px-4 text-center text-black dark:text-white">
                  <p className="font-bold text-lg text-black dark:text-white mb-2">
                    No questions found
                  </p>
                  <p className="text-sm font-medium text-black dark:text-white mb-4">
                    Try adjusting your search terms or reset the filters.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="text-sm font-bold text-black dark:text-white underline underline-offset-4"
                  >
                    Show all questions
                  </button>
                </div>
              )}
            </section>

            {/* Load More Pagination */}
            {hasMore && (
              <div className="mt-8 mb-10 text-center">
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-5 py-2.5 text-sm font-bold border-2 border-black dark:border-white rounded text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors inline-flex items-center gap-2"
                >
                  <ArrowDown className="w-4 h-4 stroke-[2.5]" />
                  <span>
                    Load more questions ({filteredQuestions.length - visibleQuestions.length} remaining)
                  </span>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Study Mode Modal */}
      <StudyModeModal
        isOpen={isStudyModalOpen}
        onClose={() => setIsStudyModalOpen(false)}
        questions={filteredQuestions}
        initialQuestion={activeStudyItem}
      />
    </div>
  );
}
