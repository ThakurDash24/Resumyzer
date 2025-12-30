/**
 * Processing messages that fade in/out during resume analysis
 */

import type { ProcessingMessage } from '../types';

export const PROCESSING_MESSAGES: ProcessingMessage[] = [
    {
        id: 1,
        text: 'Uploading your resume...',
        duration: 2000,
    },
    {
        id: 2,
        text: 'Analyzing document structure...',
        duration: 2500,
    },
    {
        id: 3,
        text: 'Extracting key information...',
        duration: 2500,
    },
    {
        id: 4,
        text: 'Evaluating ATS compatibility...',
        duration: 2500,
    },
    {
        id: 5,
        text: 'Calculating your score...',
        duration: 2000,
    },
    {
        id: 6,
        text: 'Preparing detailed report...',
        duration: 2000,
    },
];
