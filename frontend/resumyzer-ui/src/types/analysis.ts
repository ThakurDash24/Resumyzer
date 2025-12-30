export interface AnalysisResult {
  ats_score: number;
  overall_summary: string;
  strengths: string[];
  missing_or_weak_areas: string[];
  ats_keyword_gaps: string[];
  improvement_suggestions: string[];
  structure_feedback: string[];
  final_recommendation: string;
  is_fallback?: boolean;
  extracted_email?: string;
}
