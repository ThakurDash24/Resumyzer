/**
 * Main App Component
 * Controls the resume analysis flow states
 */

import { Layout } from './components/Layout/Layout';
import { UploadForm } from './components/UploadForm/UploadForm';
import { ProcessingState } from './components/ProcessingState/ProcessingState';
import { ScoreDisplay } from './components/ScoreDisplay/ScoreDisplay';
import { ErrorDisplay } from './components/ErrorDisplay/ErrorDisplay';
import { useResumeAnalysis } from './hooks/useResumeAnalysis';

function App() {
  const { state, result, error, emailSent, analyze, reset } = useResumeAnalysis();

  const handleSubmit = async (
    resume: File,
    email: string,
    phone: string,
    jobRole?: string
  ) => {
    await analyze(resume, email, phone, jobRole);
  };

  return (
    <Layout>
      {/* Upload form */}
      {(state === 'idle' || state === 'uploading') && (
        <UploadForm
          onSubmit={handleSubmit}
          isDisabled={state === 'uploading'}
        />
      )}

      {/* Processing */}
      {state === 'processing' && <ProcessingState />}

      {/* Success */}
      {state === 'success' && result && (
        <ScoreDisplay
          result={result}
          emailSent={emailSent}
          onAnalyzeAnother={reset}
        />
      )}

      {/* Error */}
      {state === 'error' && error && (
        <ErrorDisplay
          error={error}
          onRetry={reset}
        />
      )}
    </Layout>
  );
}

export default App;
