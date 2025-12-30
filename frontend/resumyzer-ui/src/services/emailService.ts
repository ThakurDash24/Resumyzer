import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendAnalysisEmail = async (params: {
  email: string;
  phone?: string;
  atsScore: number;
  summary: string;
}) => {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn('EmailJS not configured');
    return;
  }

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        user_email: params.email,
        user_phone: params.phone,
        ats_score: params.atsScore,
        summary: params.summary,
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
