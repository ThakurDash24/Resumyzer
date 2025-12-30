/**
 * Main App Component
 * Controls the resume analysis flow states
 */

import { useState } from 'react';
import { Layout } from './components/Layout/Layout';
import { UploadForm } from './components/UploadForm/UploadForm';
import { ProcessingState } from './components/ProcessingState/ProcessingState';
import { ScoreDisplay } from './components/ScoreDisplay/ScoreDisplay';
import { ErrorDisplay } from './components/ErrorDisplay/ErrorDisplay';
import { useResumeAnalysis } from './hooks/useResumeAnalysis';
import { LoadingScreen } from './components/LoadingScreen/LoadingScreen';
import { CursorGlow } from './components/UI/CursorGlow';
import { LuxuryBackground } from './components/UI/LuxuryBackground/LuxuryBackground';
import './App.css'; // Ensure we have a CSS file for App animations

function App() {
  const { state, result, error, emailSent, analyze, reset } = useResumeAnalysis();
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to Light Mode

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleSubmit = async (
    resume: File,
    email: string,
    phone: string,
    jobRole?: string
  ) => {
    await analyze(resume, email, phone, jobRole);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} isDarkMode={isDarkMode} />}
      <CursorGlow />
      {isDarkMode && <LuxuryBackground />}

      <div className={`app-content ${!isLoading ? 'app-content--visible' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
        <Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
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
      </div>
    </>
  );
}

export default App;
