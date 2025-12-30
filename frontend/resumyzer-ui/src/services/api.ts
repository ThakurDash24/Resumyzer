const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function analyzeResume(formData: FormData) {
  const response = await fetch(`${API_BASE_URL}/api/analyze-resume`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err || "Analysis failed");
  }

  return response.json();
}
