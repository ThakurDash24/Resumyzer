import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendAnalysisEmail = async (params: {
  email: string;
  phone?: string;
  atsScore: number;
  overall_summary: string;
  strengths?: string[];
  weaknesses?: string[];
  suggestions?: string[];
}) => {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn('EmailJS not configured');
    return;
  }

  try {
    console.log("Sending email with report content:", params.overall_summary);
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
  overall_summary: string;
  strengths?: string[];
  weaknesses?: string[];
  suggestions?: string[];
}): string => {
  // Helper to convert Markdown-style formatting to HTML
  const formatText = (text: string) => {
    if (!text) return "";
    // Bold: **text** -> <strong>text</strong>
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic: *text* -> <em>text</em>
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    return formatted;
  };

  const sectionStyle = "margin-bottom: 24px;";
  const headerStyle = "color: #0f172a; font-size: 18px; font-weight: bold; border-bottom: 2px solid #d4af37; padding-bottom: 8px; margin-bottom: 12px; font-family: 'Cinzel', serif;";
  const listStyle = "padding-left: 20px; margin: 0;";
  const itemStyle = "margin-bottom: 8px; line-height: 1.5; color: #334155;";
  const textStyle = "line-height: 1.6; color: #334155;";

  let html = `<div style="font-family: 'Inter', sans-serif; color: #333; max-width: 600px;">`;

  // Summary
  html += `<div style="${sectionStyle}">`;
  html += `<h2 style="${headerStyle}">SUMMARY</h2>`;
  html += `<p style="${textStyle}">${formatText(params.overall_summary || "No summary available.")}</p>`;
  html += `</div>`;

  // Strengths
  if (params.strengths?.length) {
    html += `<div style="${sectionStyle}">`;
    html += `<h3 style="${headerStyle}">KEY STRENGTHS</h3>`;
    html += `<ul style="${listStyle}">`;
    params.strengths.forEach(s => {
      html += `<li style="${itemStyle}">${formatText(s)}</li>`;
    });
    html += `</ul>`;
    html += `</div>`;
  }

  // Weaknesses
  if (params.weaknesses?.length) {
    html += `<div style="${sectionStyle}">`;
    html += `<h3 style="${headerStyle}">AREAS FOR IMPROVEMENT</h3>`;
    html += `<ul style="${listStyle}">`;
    params.weaknesses.forEach(s => {
      html += `<li style="${itemStyle}">${formatText(s)}</li>`;
    });
    html += `</ul>`;
    html += `</div>`;
  }

  // Suggestions
  if (params.suggestions?.length) {
    html += `<div style="${sectionStyle}">`;
    html += `<h3 style="${headerStyle}">RECOMMENDATIONS</h3>`;
    html += `<ul style="${listStyle}">`;
    params.suggestions.forEach(s => {
      html += `<li style="${itemStyle}">${formatText(s)}</li>`;
    });
    html += `</ul>`;
    html += `</div>`;
  }

  html += `</div>`;
  return html;
};
