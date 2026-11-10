import { ChemicalConstant } from './types';

export const CHEMICAL_CONSTANTS: ChemicalConstant[] = [
  {
    name: "অ্যাভোগাড্রো সংখ্যা (Avogadro Constant)",
    symbol: "N_A",
    value: "6.02214076 × 10²³",
    unit: "mol⁻¹",
    description: "যেকোনো পদার্থের এক মোলে বিদ্যমান পরমাণু, অণু বা আয়নের সুনির্দিষ্ট সংখ্যা।"
  },
  {
    name: "মোলার গ্যাস ধ্রুবক (Gas Constant)",
    symbol: "R",
    value: "8.314462",
    unit: "J·mol⁻¹·K⁻¹",
    description: "আদর্শ গ্যাস সমীকরণ PV = nRT এর সার্বজনীন ধ্রুবক (0.0821 L·atm·mol⁻¹·K⁻¹)।"
  },
  {
    name: "বোল্টজম্যান ধ্রুবক (Boltzmann Constant)",
    symbol: "k_B",
    value: "1.380649 × 10⁻²³",
    unit: "J·K⁻¹",
    description: "প্রতি একক কণার জন্য গ্যাস ধ্রুবক (R / N_A)।"
  },
  {
    name: "প্লাঙ্কের ধ্রুবক (Planck's Constant)",
    symbol: "h",
    value: "6.62607015 × 10⁻³⁴",
    unit: "J·s",
    description: "তড়িৎচৌম্বক ফোটনের শক্তি ও কম্পাঙ্কের মধ্যকার গুণক (E = hν)।"
  },
  {
    name: "ফ্যারাডের ধ্রুবক (Faraday Constant)",
    symbol: "F",
    value: "96,485.33",
    unit: "C·mol⁻¹",
    description: "এক মোল ইলেকট্রনের মোট বৈদ্যুতিক আধান (e × N_A)।"
  },
  {
    name: "ইলেকট্রনের আধান (Elementary Charge)",
    symbol: "e",
    value: "1.60217663 × 10⁻¹⁹",
    unit: "C",
    description: "একটি একক ইলেকট্রন বা প্রোটনের আধানের পরম মান।"
  },
  {
    name: "ইলেকট্রনের স্থির ভর (Electron Mass)",
    symbol: "m_e",
    value: "9.1093837 × 10⁻³¹",
    unit: "kg",
    description: "ইলেকট্রনের ভর (প্রায় 0.00054858 amu)।"
  },
  {
    name: "প্রোটনের স্থির ভর (Proton Mass)",
    symbol: "m_p",
    value: "1.6726219 × 10⁻²⁷",
    unit: "kg",
    description: "প্রোটনের ভর (প্রায় 1.007276 amu)।"
  },
  {
    name: "নিউট্রনের স্থির ভর (Neutron Mass)",
    symbol: "m_n",
    value: "1.6749275 × 10⁻²⁷",
    unit: "kg",
    description: "নিউট্রনের ভর (প্রায় 1.008665 amu)।"
  },
  {
    name: "শূন্যস্থানে আলোর দ্রুতি (Speed of Light)",
    symbol: "c",
    value: "2.99792458 × 10⁸",
    unit: "m·s⁻¹",
    description: "শূন্য মাধ্যমে তড়িৎচৌম্বক তরঙ্গের সর্বোচ্চ বেগ।"
  },
  {
    name: "রিডবার্গ ধ্রুবক (Rydberg Constant)",
    symbol: "R_H",
    value: "1.097373 × 10⁷",
    unit: "m⁻¹",
    description: "হাইড্রোজেন বর্ণালীর রেখা তরঙ্গসংখ্যা গণনার ধ্রুবক।"
  },
  {
    name: "বোর ব্যাসার্ধ (Bohr Radius)",
    symbol: "a_0",
    value: "0.529177 × 10⁻¹⁰",
    unit: "m (0.529 Å)",
    description: "হাইড্রোজেন পরমাণুর সর্বনিম্ন শক্তিস্তরে ইলেকট্রনের কক্ষপথ ব্যাসার্ধ।"
  }
];

export const FORMULA_CHEATSHEET = [
  {
    topic: "গ্যাসীয় সূত্রসমূহ",
    items: [
      { name: "আদর্শ গ্যাস সমীকরণ", formula: "PV = nRT" },
      { name: "ভ্যান ডার ওয়ালস সমীকরণ", formula: "(P + \\frac{an^2}{V^2})(V - nb) = nRT" },
      { name: "গ্রাহামের ব্যাপন সূত্র", formula: "\\frac{r_1}{r_2} = \\sqrt{\\frac{M_2}{M_1}}" },
      { name: "ডাল্টনের আংশিক চাপ সূত্র", formula: "P = \\sum p_i = \\sum x_i P" }
    ]
  },
  {
    topic: "তাপগতিবিদ্যা ও রাসায়নিক সাম্যাবস্থা",
    items: [
      { name: "প্রথম সূত্র", formula: "\\Delta U = q + w" },
      { name: "গিবস মুক্ত শক্তি", formula: "\\Delta G = \\Delta H - T\\Delta S" },
      { name: "সাম্যধ্রুবক ও মুক্ত শক্তি", formula: "\\Delta G^\\circ = -RT \\ln K" },
      { name: "ভ্যান্ট হফ সমীকরণ", formula: "\\frac{d\\ln K}{dT} = \\frac{\\Delta H^\\circ}{RT^2}" }
    ]
  },
  {
    topic: "তড়িৎ রসায়ন",
    items: [
      { name: "নার্নস্ট সমীকরণ", formula: "E = E^\\circ - \\frac{0.0592}{n} \\log Q" },
      { name: "ফ্যারাডের প্রথম সূত্র", formula: "W = Z I t = \\frac{M I t}{n F}" },
      { name: "কোষ বিভব ও মুক্ত শক্তি", formula: "\\Delta G^\\circ = -n F E^\\circ_{cell}" }
    ]
  },
  {
    topic: "দ্রবণ ও অম্ল-ক্ষারক",
    items: [
      { name: "pH সংজ্ঞা", formula: "\\text{pH} = -\\log[H^+]" },
      { name: "হেন্ডারসন-হ্যাসেলবালখ (অম্লীয়)", formula: "\\text{pH} = pK_a + \\log\\frac{[\\text{Salt}]}{[\\text{Acid}]}" },
      { name: "অসমোটিক চাপ", formula: "\\Pi = i C R T" },
      { name: "বিয়ার-ল্যাম্বার্ট সূত্র", formula: "A = \\epsilon b c" }
    ]
  }
];
