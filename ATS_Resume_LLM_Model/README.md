# ATS Resume Checker & HR Management System

An AI-powered full-stack Applicant Tracking System with machine learning capabilities for resume analysis, candidate ranking, and HR workflow management.

![ATS Dashboard](./docs/dashboard.png)

## 🚀 Features

### Core Features
- **ATS Resume Scoring (0-100)**: Comprehensive scoring based on skills, experience, education, and keyword optimization
- **JD-Resume Semantic Matching**: TF-IDF vectorization and cosine similarity for intelligent matching
- **Keyword Gap Detection**: Identifies missing critical keywords from job descriptions
- **Resume Parser**: Extracts skills, education, experience, and certifications from resume text
- **Candidate Ranking**: Automatic ranking based on ATS scores and match percentages
- **Shortlisting Recommendation**: AI-driven Hire/Review/Reject recommendations

### HR Management
- **Job Posting Management**: Create, edit, and manage job postings
- **Candidate Tracking**: Full candidate lifecycle management
- **Interview Scheduling**: Calendar-based scheduling with time slots
- **Analytics Dashboard**: Hiring pipeline, source analysis, and performance metrics
- **Bias-Free Screening**: Anonymized candidate evaluation for fair hiring

### Resume Builder
- **ATS-Safe Templates**: Professional, Modern, and Technical templates
- **Live Preview**: Real-time resume preview as you type
- **Export Options**: PDF export (mocked)

## 🏗️ Architecture

```
ATS_Resume_LLM_Model/
├── frontend/          # Next.js 14 (App Router)
├── backend/           # Node.js Express API
├── ml-service/        # Python FastAPI ML Service
└── README.md
```

### Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| ML Service | Python 3.9+, FastAPI, Scikit-learn |
| Styling | Tailwind CSS with custom design system |

## 🎨 Design System

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Primary Green | `#0F9D58` | Primary actions, highlights |
| Accent Green | `#34A853` | Secondary elements |
| Soft Background | `#E8F5E9` | Page background |
| White | `#FFFFFF` | Cards, surfaces |
| Text Primary | `#1F2937` | Main text |
| Text Muted | `#6B7280` | Secondary text |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd ATS_Resume_LLM_Model
```

2. **Start ML Service** (Python FastAPI)
```bash
cd ml-service
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

3. **Start Backend** (Node.js Express)
```bash
cd backend
npm install
npm run dev
```

4. **Start Frontend** (Next.js)
```bash
cd frontend
npm install
npm run dev
```

5. **Open the application**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📡 API Endpoints

### ML Service (Port 8000)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/resume/parse` | POST | Parse resume text |
| `/api/resume/analyze` | POST | Full resume analysis |
| `/api/matching/match` | POST | Match resume to JD |
| `/api/scoring/score` | POST | Calculate ATS score |
| `/api/suggestions/generate` | POST | Generate improvements |

### Backend API (Port 3001)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/candidates` | GET/POST | Candidate CRUD |
| `/api/jobs` | GET/POST | Job posting management |
| `/api/interviews` | GET/POST | Interview scheduling |
| `/api/analytics/*` | GET | Analytics endpoints |

## 📊 Sample Data

### Candidates
| Name | Role | Experience | ATS Score |
|------|------|------------|-----------|
| Ayaan Perera | ML Engineer | 3.2 years | 85 |
| Priya Sharma | Data Analyst | 2.5 years | 78 |
| James Rodriguez | Full Stack Dev | 4.0 years | 82 |
| Sarah Chen | DevOps Engineer | 5.1 years | 91 |

### Jobs
| Title | Department | Required Skills |
|-------|------------|-----------------|
| Junior Data Scientist | Data Science | Python, Pandas, ML, Statistics |
| Senior ML Engineer | Machine Learning | Python, TensorFlow, PyTorch |
| Full Stack Developer | Engineering | React, Node.js, TypeScript |

## 🧮 Scoring Algorithm

```
ATS Score = (Skills × 40%) + (Experience × 30%) + (Education × 15%) + (Keywords × 10%) + (Format × 5%)
```

### Recommendation Thresholds
| Score | Recommendation |
|-------|----------------|
| 80-100 | ✅ Hire |
| 60-79 | 🔍 Review |
| 0-59 | ❌ Reject |

## 📁 Project Structure

### Frontend (`/frontend`)
```
frontend/
├── app/
│   ├── page.tsx              # Dashboard
│   ├── candidates/           # Candidate management
│   ├── jobs/                 # Job postings
│   ├── resume-checker/       # Resume analysis
│   ├── resume-builder/       # Resume builder
│   ├── interviews/           # Interview scheduling
│   ├── analytics/            # Analytics dashboard
│   └── settings/             # Settings page
├── components/               # Reusable components
└── tailwind.config.js        # Theme configuration
```

### Backend (`/backend`)
```
backend/
├── src/
│   ├── server.ts             # Express server
│   ├── routes/               # API routes
│   │   ├── candidates.ts
│   │   ├── jobs.ts
│   │   ├── interviews.ts
│   │   └── analytics.ts
│   └── data/
│       └── mock-data.json    # Mock database
└── package.json
```

### ML Service (`/ml-service`)
```
ml-service/
├── app/
│   ├── main.py               # FastAPI app
│   ├── routers/              # API routers
│   ├── services/             # Business logic
│   │   ├── resume_parser.py
│   │   ├── matcher.py
│   │   ├── scorer.py
│   │   └── suggestions.py
│   └── models/               # Pydantic models
└── requirements.txt
```

## 🔒 Security & Privacy

- **Bias-Free Screening**: Names and demographics can be anonymized
- **No Real Personal Data**: Uses mock data only
- **No External API Calls**: All processing is local
- **CORS Configured**: Secure cross-origin requests

## 🛠️ Development

### Running Tests
```bash
# ML Service
cd ml-service && python -m pytest

# Backend
cd backend && npm test

# Frontend
cd frontend && npm run test
```

### Building for Production
```bash
# Frontend
cd frontend && npm run build

# Backend
cd backend && npm run build
```

## 📝 License

This project is for educational and demonstration purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

Built with ❤️ using Next.js, FastAPI, and Express
