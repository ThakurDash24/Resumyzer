import emailjs from "emailjs-com";

export async function sendResumeEmail(
  toEmail: string,
  analysis: any,
  jobRole: string
) {
  const templateParams = {
    to_email: toEmail,
    job_role: jobRole || "General Evaluation",
    ats_score: analysis.ats_score,
    overall_summary: analysis.overall_summary,
    strengths: analysis.strengths.map((s: string) => `<li>${s}</li>`).join(""),
    improvement_suggestions: analysis.improvement_suggestions
      .map((s: string) => `<li>${s}</li>`)
      .join("")
  };

  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    templateParams,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
}
