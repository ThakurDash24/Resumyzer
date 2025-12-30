import type { AnalysisResult } from '../../types';

interface ScoreDisplayProps {
  result: AnalysisResult;
}

export function ScoreDisplay({ result }: ScoreDisplayProps) {
  return (
    <section>
      <h2>ATS Score</h2>
      <h1>{result.ats_score}/100</h1>
      <p>{result.overall_summary}</p>
    </section>
  );
}
