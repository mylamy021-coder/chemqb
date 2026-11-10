export type DifficultyLevel = 'সহজ' | 'মাঝারি' | 'উন্নত' | 'প্রাথমিক' | 'মধ্যবর্তী' | 'উচ্চতর';

export interface QuestionItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  part?: number;
  partTitle?: string;
  formula?: string;
  keyPoints?: string[];
  tags: string[];
  difficulty: DifficultyLevel;
}

export interface CategoryMeta {
  id: string;
  title: string;
  banglaTitle: string;
  part: number;
  range: string;
  count: number;
  description: string;
  iconName: string;
}

export interface ChemicalConstant {
  name: string;
  symbol: string;
  value: string;
  unit: string;
  description: string;
}

export interface BookmarkState {
  [id: number]: boolean;
}

export interface StudyCard {
  id: number;
  question: string;
  answer: string;
  category: string;
  formula?: string;
  difficulty: string;
}
