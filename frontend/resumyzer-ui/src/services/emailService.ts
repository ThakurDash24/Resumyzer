import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendAnalysisEmail = async (params: {
  email: string;
  phone?: string;
  atsScore: number;
  summary: string;
  strengths?: string[];
  weaknesses?: string[];
  suggestions?: string[];
}) => {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn('EmailJS not configured');
    return;
  }

  try {
    console.log("Sending email with report content:", params.summary);
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_email: params.email,
        user_name: params.email.split('@')[0],
        report: formatEmailBody(params),
        ats_score: params.atsScore, // Keep this if you add {{ats_score}} later
      },
      PUBLIC_KEY
    );
  } catch (error) {
    console.error('EmailJS Error:', error);
    if (error instanceof Error) {
      console.error('EmailJS Error Details:', error.message);
    }
    throw error;
  }
};

const formatEmailBody = (params: {
  summary: string;
  strengths?: string[];
  weaknesses?: string[];
  suggestions?: string[];
}): string => {
  const separator = "----------------------------------------";

  let body = `SUMMARY\n${separator}\n${(params.summary || "No summary available.").replace(/<[^>]*>?/gm, '')}\n\n`;

  if (params.strengths?.length) {
    body += `KEY STRENGTHS\n${separator}\n${params.strengths.map(s => `• ${s}`).join('\n')}\n\n`;
  }

  if (params.weaknesses?.length) {
    body += `AREAS FOR IMPROVEMENT\n${separator}\n${params.weaknesses.map(s => `• ${s}`).join('\n')}\n\n`;
  }

  if (params.suggestions?.length) {
    body += `RECOMMENDATIONS\n${separator}\n${params.suggestions.map(s => `• ${s}`).join('\n')}`;
  }

  return body;
};
