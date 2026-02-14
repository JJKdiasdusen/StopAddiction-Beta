
export interface SurveyData {
  // Personal
  class: string;
  gender: string;
  leisure: string;
  
  // Awareness
  definition: string;
  healthAwareness: string;
  infoSource: string;
  lifestyleImportance: string;
  
  // Environment & Risks
  reasons: string[];
  seenUsers: string;
  onlineAds: string;
  trustPerson: string;
  
  // Actions & Solutions
  reactionToOffer: string;
  schoolPrevention: string;
  preventionSuggestions: string;
  madeMeThink: string;
}

export interface StoredResult extends SurveyData {
  id: string;
  submittedAt: string;
}

export type Step = 'intro' | 'form' | 'success' | 'admin';
