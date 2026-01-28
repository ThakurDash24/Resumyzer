# RESUMYZER Frontend

Production-ready React + TypeScript frontend for ATS Readiness & Compatibility analysis.

## 🎯 Overview

RESUMYZER is a professional web application that analyzes resumes for ATS (Applicant Tracking System) compatibility. Users upload their PDF resume, receive an instant ATS Readiness Index, and get a detailed report via email.

## ⚠️ What Resumyzer Does & Does NOT Do

### What Resumyzer Does
- Analyzes resume parsing quality
- Measures resume–JD alignment
- Identifies screening risks before human review

### What Resumyzer Does NOT Do
- Predict company-specific ATS decisions
- Emulate proprietary ATS systems

## 🏗️ Architecture

### Tech Stack
- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Vanilla CSS (CSS-first approach)
- **HTTP Client**: Axios
- **Design**: White + Blue professional theme

### Project Structure

```
src/
├── components/           # React components
│   ├── Layout/          # App layout wrapper
│   ├── UploadForm/      # Resume upload form
│   ├── ProcessingState/ # Loading with fade messages
│   ├── ScoreDisplay/    # ATS score result display
│   └── ErrorDisplay/    # Error handling UI
├── services/            # API layer
│   └── api.ts          # Backend communication
├── types/              # TypeScript interfaces
│   └── index.ts        # Type definitions
├── styles/             # CSS design system
│   ├── variables.css   # Design tokens
│   ├── reset.css       # CSS reset
│   └── global.css      # Global styles
├── hooks/              # Custom React hooks
│   └── useResumeAnalysis.ts
├── utils/              # Utility functions
│   ├── validation.ts
│   └── processingMessages.ts
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Style imports
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API running at `https://resumyzer-24.onrender.com`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Configuration

The API base URL is configured in `src/services/api.ts`:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://resumyzer-24.onrender.com';
```

To change the backend URL, update this constant or create an environment variable.

## 📋 Features

### 1. **Upload Form**
- PDF file upload with drag-and-drop
- Email validation
- Optional job role selection
- Real-time form validation
- File size limit: 10MB

### 2. **Processing State**
- Animated spinner
- Fade-in/fade-out status messages
- Progress bar
- Calm, professional animations

### 3. **Score Display**
- Circular ATS Readiness visualization
- Dynamic readiness interpretation
- Email confirmation status
- "Analyze Another" action

### 4. **Error Handling**
- User-friendly error messages
- Retry functionality
- Network error detection

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#3b82f6` (trustworthy, professional)
- **White/Gray**: Clean, minimal background
- **Success**: `#10b981`
- **Error**: `#ef4444`

### Typography
- **Font**: Inter (Google Fonts)
- **Sizes**: Responsive scale from 12px to 36px
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Animations
- **Fade Duration**: 400ms
- **Timing**: `cubic-bezier(0.4, 0, 0.2, 1)`
- **Philosophy**: Soft, calm transitions only

### Design Tokens
All design tokens are centralized in `src/styles/variables.css`:
- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Transitions

## 🔌 API Integration

### Backend Endpoint

```
POST https://resumyzer-24.onrender.com/api/analyze-resume
Content-Type: multipart/form-data

Fields:
- resume: File (PDF)
- email: string
- job_role: string (optional)
```

### Response Format

```typescript
{
  ats_score: number;        // 0-100 (Readiness Index) (Readiness Index)
  email_sent: boolean;      // Email delivery status
  message: string;          // Success message
  analysis_id?: string;     // Optional analysis ID
}
```

### Error Handling

The API service handles:
- Network errors
- Server errors (4xx, 5xx)
- Timeout errors (60s timeout)
- Invalid responses

## 🧩 Component Details

### `<Layout>`
Provides consistent header and footer across all views.

### `<UploadForm>`
- Controlled form with React state
- File validation (PDF, max 10MB)
- Email validation (regex)
- Accessible file input

### `<ProcessingState>`
- Cycles through 6 processing messages
- Each message fades in/out smoothly
- Progress bar animation
- Prevents window close during processing

### `<ScoreDisplay>`
- Circular score visualization
- Score interpretation (5 levels)
- Animated entrance
- Email confirmation badge

### `<ErrorDisplay>`
- Shows error details
- Retry button
- Fade-in animation

## 🪝 Custom Hooks

### `useResumeAnalysis`

Manages the entire analysis flow:

```typescript
const { state, result, error, analyze, reset } = useResumeAnalysis();

// States: 'idle' | 'uploading' | 'processing' | 'success' | 'error'
```

## 🧪 Development

### Code Style
- TypeScript strict mode
- ESLint configured
- Component-scoped CSS
- BEM naming convention for CSS classes

### File Naming
- Components: PascalCase (e.g., `UploadForm.tsx`)
- Utilities: camelCase (e.g., `validation.ts`)
- Styles: kebab-case (e.g., `upload-form.css`)

### Best Practices
1. **Type Safety**: All props and state are typed
2. **Accessibility**: ARIA labels, semantic HTML
3. **Performance**: Lazy loading ready, optimized re-renders
4. **Maintainability**: Clear separation of concerns

## 📱 Responsive Design

Breakpoints:
- Mobile: `max-width: 768px`
- Tablet/Desktop: `> 768px`

All components are fully responsive with mobile-first approach.

## 🌙 Dark Mode (Future)

Dark mode infrastructure is ready in `variables.css`:
```css
[data-theme="dark"] { ... }
```

To enable, add theme toggle and apply `data-theme="dark"` to root element.

## 🔒 Security

- Client-side file validation
- Email format validation
- XSS protection via React
- CORS handled by backend

## 📦 Build & Deployment

### Production Build

```bash
npm run build
```

Output: `dist/` folder

### Deployment Options
- **Vercel**: Zero-config deployment
- **Netlify**: Drag-and-drop dist folder
- **AWS S3 + CloudFront**: Static hosting
- **Docker**: Nginx container

### Environment Variables

Create `.env` file:
```
VITE_API_BASE_URL=http://your-backend-url.com
```

Update `api.ts`:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://resumyzer-24.onrender.com';
```

## 🐛 Troubleshooting

### "No response from server"
- Ensure backend is running at `https://resumyzer-24.onrender.com`
- Check CORS configuration on backend
- Verify network connectivity

### File upload fails
- Check file is PDF format
- Ensure file size < 10MB
- Verify backend accepts multipart/form-data

### Styles not loading
- Clear browser cache
- Check CSS imports in `index.css`
- Verify Vite dev server is running

## 📄 License

This project is part of the RESUMYZER application.

## 🤝 Contributing

1. Follow existing code structure
2. Maintain TypeScript types
3. Use CSS variables for styling
4. Test all states (idle, loading, success, error)
5. Ensure responsive design

## 📞 Support

For issues or questions, please refer to the main RESUMYZER documentation.

---

**Built with ❤️ using React + TypeScript + Vite**
