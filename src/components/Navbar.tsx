import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activeTab: 'questions' | 'study';
  setActiveTab: (tab: 'questions' | 'study') => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  toggleDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-black border-b-2 border-black dark:border-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('questions')}
              className="flex items-baseline gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white rounded"
            >
              <span className="font-bold text-lg sm:text-xl text-black dark:text-white tracking-tight font-serif">
                ChemQB
              </span>
              <span className="text-sm text-black dark:text-white font-mono font-bold hidden sm:inline">
                1000 Q&A
              </span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-2" aria-label="Main Navigation">
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-3.5 py-1.5 text-sm font-bold rounded transition-colors ${
                activeTab === 'questions'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800'
              }`}
            >
              Questions
            </button>

            <button
              onClick={() => setActiveTab('study')}
              className={`px-3.5 py-1.5 text-sm font-bold rounded transition-colors ${
                activeTab === 'study'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800'
              }`}
            >
              Flashcards
            </button>
          </nav>

          {/* Theme Toggle */}
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-black dark:text-white rounded border border-black dark:border-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors focus:outline-none"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={darkMode ? "Light mode" : "Dark mode"}
            >
              {darkMode ? <Sun className="w-5 h-5 stroke-[2]" /> : <Moon className="w-5 h-5 stroke-[2]" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
