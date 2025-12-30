/**
 * Main App Component
 * Orchestrates the entire resume analysis flow
 */

import { Layout } from './components/Layout/Layout';
import { UploadForm } from './components/UploadForm/UploadForm';
import { ProcessingState } from './components/ProcessingState/ProcessingState';
import { ScoreDisplay } from './components/ScoreDisplay/ScoreDisplay';
import { ErrorDisplay } from './components/ErrorDisplay/ErrorDisplay';
import { useResumeAnalysis } from './hooks/useResumeAnalysis';

function App() {
  const { state, result, error, analyze, reset } = useResumeAnalysis();

  const handleSubmit = async (resume: File, email: string, jobRole?: string) => {
    await analyze(resume, email, jobRole);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Layout>
      {/* Idle or Uploading State - Show Form */}
      {(state === 'idle' || state === 'uploading') && (
        <UploadForm
          onSubmit={handleSubmit}
          isDisabled={state === 'uploading'}
        />
      )}

      {/* Processing State - Show Loading */}
      {state === 'processing' && <ProcessingState />}

      {/* Success State - Show Score */}
      {state === 'success' && result && (
        <ScoreDisplay result={result} onAnalyzeAnother={handleReset} />
      )}

      {/* Error State - Show Error */}
      {state === 'error' && error && (
        <ErrorDisplay error={error} onRetry={handleReset} />
      )}
    </Layout>
  );
}

export default App;
