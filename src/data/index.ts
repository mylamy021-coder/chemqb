import { QuestionItem, CategoryMeta } from './types';
import { part1Questions } from './chapters/part1';
import { part2Questions } from './chapters/part2';
import { part3Questions } from './chapters/part3';
import { part4Questions } from './chapters/part4';
import { part5Questions } from './chapters/part5';
import { part6Questions } from './chapters/part6';
import { part7Questions } from './chapters/part7';
import { questionsPart8 } from './chapters/part8';
import { questionsPart9 } from './chapters/part9';
import { questionsPart10 } from './chapters/part10';

export { CHEMICAL_CONSTANTS, FORMULA_CHEATSHEET } from './constants';
export * from './types';

// Standardize parts 8, 9, 10
const p8Formatted: QuestionItem[] = questionsPart8.map(q => ({
  ...q,
  part: 8,
  partTitle: "পর্ব ৮: উন্নত তাপগতিবিদ্যা, কোয়ান্টাম ও কেলাস রসায়ন"
}));

const p9Formatted: QuestionItem[] = questionsPart9.map(q => ({
  ...q,
  part: 9,
  partTitle: "পর্ব ৯: নিউক্লীয়, সমন্বয়, বায়োইনঅর্গানিক ও শক্তি রসায়ন"
}));

const p10Formatted: QuestionItem[] = questionsPart10.map(q => ({
  ...q,
  part: 10,
  partTitle: "পর্ব ১০: রাসায়নিক গণনা, কৃত্রিম বুদ্ধিমত্তা ও সামগ্রিক পর্যালোচনা"
}));

// Combine all 1000 questions
export const ALL_QUESTIONS: QuestionItem[] = [
  ...part1Questions,
  ...part2Questions,
  ...part3Questions,
  ...part4Questions,
  ...part5Questions,
  ...part6Questions,
  ...part7Questions,
  ...p8Formatted,
  ...p9Formatted,
  ...p10Formatted
].sort((a, b) => a.id - b.id);

// Category metadata for high-level browsing
export const CATEGORY_METAS: CategoryMeta[] = [
  {
    id: "part-1",
    title: "Part 1: Foundational & General Chemistry",
    banglaTitle: "পর্ব ১: রসায়নের মৌলিক ভিত্তি ও সাধারণ রসায়ন",
    part: 1,
    range: "১ - ১০০",
    count: 100,
    description: "পদার্থের অবস্থা, পরমাণুর মৌলিক গঠন, ডাল্টন ও বোর মডেল, কোয়ান্টাম সংখ্যা এবং পর্যায় সারণি।",
    iconName: "Atom"
  },
  {
    id: "part-2",
    title: "Part 2: Chemical Bonding & Molecular Structure",
    banglaTitle: "পর্ব ২: রাসায়নিক বন্ধন ও আণবিক গঠন",
    part: 2,
    range: "১০১ - ২০০",
    count: 100,
    description: "আয়নিক, সমযোজী ও সন্নিবেশ বন্ধন, VSEPR তত্ত্ব, সংকরায়ন (Hybridization), এবং আণবিক অরবিটাল তত্ত্ব।",
    iconName: "Share2"
  },
  {
    id: "part-3",
    title: "Part 3: States of Matter & Thermodynamics",
    banglaTitle: "পর্ব ৩: পদার্থের অবস্থা ও তাপগতিবিদ্যা",
    part: 3,
    range: "২০১ - ৩০০",
    count: 100,
    description: "গ্যাসীয় সূত্রাবলী, বাস্তব গ্যাস, এনথ্যালপি, এনট্রপি, গিবস মুক্ত শক্তি এবং হেসের সূত্র।",
    iconName: "Flame"
  },
  {
    id: "part-4",
    title: "Part 4: Chemical Equilibrium & Electrochemistry",
    banglaTitle: "পর্ব ৪: রাসায়নিক সাম্যাবস্থা ও তড়িৎ রসায়ন",
    part: 4,
    range: "৩০১ - ৪২০",
    count: 120,
    description: "লা-শাতেলিয়ার নীতি, অ্যাসিড-ক্ষারক সাম্যাবস্থা, বাফার দ্রবণ, নার্নস্ট সমীকরণ ও ব্যাটারি প্রযুক্তি।",
    iconName: "Zap"
  },
  {
    id: "part-5",
    title: "Part 5: Chemical Kinetics & Surface Chemistry",
    banglaTitle: "পর্ব ৫: রাসায়নিক গতিবিদ্যা ও পৃষ্ঠ রসায়ন",
    part: 5,
    range: "৪২১ - ৫০০",
    count: 80,
    description: "বিক্রিয়ার হার ও ক্রম, আরহেনিয়াস সমীকরণ, প্রভাবন (Catalysis), অধিশোষণ এবং কলয়েড।",
    iconName: "Activity"
  },
  {
    id: "part-6",
    title: "Part 6: Organic Chemistry Foundations",
    banglaTitle: "পর্ব ৬: জৈব রসায়নের মৌলিক ধারণা ও হাইড্রোকার্বন",
    part: 6,
    range: "৫০১ - ৬০০",
    count: 100,
    description: "IUPAC নামকরণ, সমাণুতা (Isomerism), কার্বোক্যাটায়ন, মুক্তমূলক, অ্যালকেন, অ্যালকিন, অ্যালকাইন ও অ্যারোমেটিক যৌগ।",
    iconName: "FlaskConical"
  },
  {
    id: "part-7",
    title: "Part 7: Functional Groups & Biomolecules",
    banglaTitle: "পর্ব ৭: কার্যকরী মূলক ও জীবঅণু",
    part: 7,
    range: "৬০১ - ৭০০",
    count: 100,
    description: "অ্যালকোহল, অ্যালডিহাইড, কিটোন, কার্বক্সিলিক এসিড, অ্যামিন, অ্যামিনো এসিড, প্রোটিন, কার্বোহাইড্রেট ও পলিমার।",
    iconName: "Dna"
  },
  {
    id: "part-8",
    title: "Part 8: Advanced Physical & Quantum Chemistry",
    banglaTitle: "পর্ব ৮: উন্নত তাপগতিবিদ্যা, কোয়ান্টাম ও কেলাস রসায়ন",
    part: 8,
    range: "৭০১ - ৮০০",
    count: 100,
    description: "ম্যাক্সওয়েল সম্পর্ক, শ্রোডিঞ্জার সমীকরণ, DFT, শটকি ও ফ্রেনকেল ত্রুটি, সুপারকন্ডাক্টর ও সবুজ রসায়ন।",
    iconName: "Sparkles"
  },
  {
    id: "part-9",
    title: "Part 9: Nuclear, Coordination & Energy Chemistry",
    banglaTitle: "পর্ব ৯: নিউক্লীয়, সমন্বয়, বায়োইনঅর্গানিক ও শক্তি রসায়ন",
    part: 9,
    range: "৮০১ - ৯০০",
    count: 100,
    description: "তেজস্ক্রিয় ক্ষয়, কার্বন ডেটিং, CFSE, হিমোগ্লোবিন, ক্লোরোফিল, লিথিয়াম ব্যাটারি ও পরিবেশ দূষণ।",
    iconName: "Radio"
  },
  {
    id: "part-10",
    title: "Part 10: Calculations, AI & Grand Synthesis",
    banglaTitle: "পর্ব ১০: রাসায়নিক গণনা, কৃত্রিম বুদ্ধিমত্তা ও সামগ্রিক পর্যালোচনা",
    part: 10,
    range: "৯০১ - ১০০০",
    count: 100,
    description: "স্টয়কিওমেট্রি, আলফাফোল্ড ও মলিকুলার ডকিং, ড্রাগ ডিজাইন, ওষুধ রসায়ন এবং দৈনন্দিন জীবনের অনন্য রসায়ন।",
    iconName: "BookOpen"
  }
];

// Helper to convert English digits to Bengali digits
export function toBengaliNumber(num: number | string): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (w) => bengaliDigits[+w]);
}

// Quick search filter function
export function searchQuestions(
  query: string,
  selectedCategory: string = 'all',
  selectedDifficulty: string = 'all',
  bookmarksOnly: boolean = false,
  bookmarks: { [id: number]: boolean } = {}
): QuestionItem[] {
  const cleanQuery = query.trim().toLowerCase();
  const isNumberQuery = /^\d+$/.test(cleanQuery);
  const targetId = isNumberQuery ? parseInt(cleanQuery, 10) : null;

  return ALL_QUESTIONS.filter((item) => {
    // Bookmark filter
    if (bookmarksOnly && !bookmarks[item.id]) {
      return false;
    }

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

    // Query match
    if (!cleanQuery) return true;

    // Exact ID match prioritizes direct access
    if (targetId !== null && item.id === targetId) {
      return true;
    }

    // Question / Answer / Formula / Tag search
    const inId = String(item.id).includes(cleanQuery);
    const inQuestion = item.question.toLowerCase().includes(cleanQuery);
    const inAnswer = item.answer.toLowerCase().includes(cleanQuery);
    const inFormula = item.formula ? item.formula.toLowerCase().includes(cleanQuery) : false;
    const inTags = item.tags.some(t => t.toLowerCase().includes(cleanQuery));
    const inCategory = item.category.toLowerCase().includes(cleanQuery);

    return inId || inQuestion || inAnswer || inFormula || inTags || inCategory;
  });
}
