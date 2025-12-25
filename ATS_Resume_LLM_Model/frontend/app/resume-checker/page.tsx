'use client'

import { useState } from 'react'
import { Upload, FileText, CheckCircle, AlertTriangle, Lightbulb, Target, TrendingUp } from 'lucide-react'
import ATSScore from '@/components/ATSScore'
import ProgressBar from '@/components/ProgressBar'
import { RecommendationBadge } from '@/components/Badge'

// Sample resume for demo
const sampleResume = `Ayaan Perera
ML Engineer | ayaan.perera@email.com | +1-555-0123

PROFESSIONAL SUMMARY
Experienced Machine Learning Engineer with 3.2 years of experience in developing 
and deploying ML models. Proficient in Python, TensorFlow, and SQL.

SKILLS
Python, TensorFlow, PyTorch, SQL, Pandas, NumPy, Scikit-learn, 
Machine Learning, Deep Learning, Data Analysis, Git, Docker, AWS

EXPERIENCE
Machine Learning Engineer at TechCorp (2021 - Present)
- Developed and deployed ML models for production
- Improved model accuracy by 25%
- Collaborated with data engineering team

Junior Data Scientist at DataInc (2020 - 2021)
- Built predictive models using Python
- Created data pipelines using SQL

EDUCATION
Master's in Computer Science, Stanford University, 2020
Bachelor's in Mathematics, MIT, 2018

CERTIFICATIONS
AWS Certified Machine Learning Specialty
TensorFlow Developer Certificate`

const sampleJD = `Junior Data Scientist

We are looking for a Junior Data Scientist to join our analytics team.

Requirements:
- 1-3 years of experience in data science or related field
- Proficiency in Python and SQL
- Experience with Pandas, NumPy, and Scikit-learn
- Knowledge of Machine Learning algorithms
- Strong understanding of Statistics

Preferred:
- Experience with TensorFlow or PyTorch
- Exposure to cloud platforms (AWS, GCP)
- Data visualization skills (Tableau, Power BI)`

export default function ResumeCheckerPage() {
    const [resumeText, setResumeText] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analysisResult, setAnalysisResult] = useState<{
        atsScore: number
        matchScore: number
        recommendation: 'Hire' | 'Review' | 'Reject'
        skills: { matched: string[], missing: string[], extra: string[] }
        suggestions: { category: string, title: string, items: string[] }[]
        scoreBreakdown: { label: string, score: number }[]
    } | null>(null)

    const handleAnalyze = () => {
        setIsAnalyzing(true)

        // Simulate API call
        setTimeout(() => {
            setAnalysisResult({
                atsScore: 85,
                matchScore: 88,
                recommendation: 'Hire',
                skills: {
                    matched: ['Python', 'SQL', 'Machine Learning', 'TensorFlow', 'Pandas', 'NumPy'],
                    missing: ['Statistics', 'Tableau', 'Power BI'],
                    extra: ['PyTorch', 'Docker', 'AWS', 'Deep Learning']
                },
                suggestions: [
                    {
                        category: 'Keywords',
                        title: 'Add Missing Keywords',
                        items: [
                            'Include "Statistics" in your skills section',
                            'Mention data visualization experience',
                            'Add quantitative achievements'
                        ]
                    },
                    {
                        category: 'Experience',
                        title: 'Enhance Experience Section',
                        items: [
                            'Use more action verbs',
                            'Include metrics and numbers',
                            'Highlight relevant projects'
                        ]
                    },
                    {
                        category: 'Format',
                        title: 'Improve Formatting',
                        items: [
                            'Keep resume to 1-2 pages',
                            'Use consistent date formatting',
                            'Add a professional summary'
                        ]
                    }
                ],
                scoreBreakdown: [
                    { label: 'Skills Match', score: 88 },
                    { label: 'Experience', score: 85 },
                    { label: 'Education', score: 90 },
                    { label: 'Keywords', score: 80 },
                    { label: 'Format', score: 85 }
                ]
            })
            setIsAnalyzing(false)
        }, 2000)
    }

    const loadSampleData = () => {
        setResumeText(sampleResume)
        setJobDescription(sampleJD)
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Resume Checker</h1>
                    <p className="text-text-muted mt-1">Analyze resumes against job descriptions with AI</p>
                </div>
                <button onClick={loadSampleData} className="btn-secondary">
                    Load Sample Data
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <div className="space-y-4">
                    {/* Resume Input */}
                    <div className="card">
                        <div className="flex items-center gap-2 mb-4">
                            <FileText className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-semibold text-text-primary">Resume</h2>
                        </div>
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 mb-4 text-center hover:border-primary transition-colors cursor-pointer">
                            <Upload className="w-8 h-8 text-text-muted mx-auto mb-2" />
                            <p className="text-sm text-text-muted">Drop resume file or click to upload</p>
                            <p className="text-xs text-text-muted mt-1">PDF, DOC, DOCX, TXT</p>
                        </div>
                        <textarea
                            value={resumeText}
                            onChange={(e) => setResumeText(e.target.value)}
                            placeholder="Or paste resume text here..."
                            className="input-field h-48 resize-none"
                        />
                    </div>

                    {/* Job Description Input */}
                    <div className="card">
                        <div className="flex items-center gap-2 mb-4">
                            <Target className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-semibold text-text-primary">Job Description</h2>
                        </div>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste job description here..."
                            className="input-field h-48 resize-none"
                        />
                    </div>

                    {/* Analyze Button */}
                    <button
                        onClick={handleAnalyze}
                        disabled={!resumeText || !jobDescription || isAnalyzing}
                        className="btn-primary w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isAnalyzing ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Analyzing...
                            </span>
                        ) : (
                            'Analyze Resume'
                        )}
                    </button>
                </div>

                {/* Results Section */}
                <div className="space-y-4">
                    {analysisResult ? (
                        <>
                            {/* Score Card */}
                            <div className="card">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-text-primary">Analysis Results</h2>
                                    <RecommendationBadge recommendation={analysisResult.recommendation} />
                                </div>

                                <div className="flex items-center gap-8">
                                    <ATSScore score={analysisResult.atsScore} size="lg" />
                                    <div className="flex-1">
                                        <div className="mb-4">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm text-text-secondary">Match Score</span>
                                                <span className="text-sm font-semibold text-primary">{analysisResult.matchScore}%</span>
                                            </div>
                                            <ProgressBar value={analysisResult.matchScore} color="green" showValue={false} />
                                        </div>
                                        <p className="text-sm text-text-muted">
                                            This resume is a <span className="text-primary font-medium">strong match</span> for the job description.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Score Breakdown */}
                            <div className="card">
                                <h3 className="font-semibold text-text-primary mb-4">Score Breakdown</h3>
                                <div className="space-y-3">
                                    {analysisResult.scoreBreakdown.map(item => (
                                        <ProgressBar
                                            key={item.label}
                                            value={item.score}
                                            label={item.label}
                                            color="auto"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Skills Analysis */}
                            <div className="card">
                                <h3 className="font-semibold text-text-primary mb-4">Skills Analysis</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            <span className="text-sm font-medium text-text-secondary">Matched Skills ({analysisResult.skills.matched.length})</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {analysisResult.skills.matched.map(skill => (
                                                <span key={skill} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                                            <span className="text-sm font-medium text-text-secondary">Missing Skills ({analysisResult.skills.missing.length})</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {analysisResult.skills.missing.map(skill => (
                                                <span key={skill} className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <TrendingUp className="w-4 h-4 text-blue-500" />
                                            <span className="text-sm font-medium text-text-secondary">Extra Skills ({analysisResult.skills.extra.length})</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {analysisResult.skills.extra.map(skill => (
                                                <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Suggestions */}
                            <div className="card">
                                <div className="flex items-center gap-2 mb-4">
                                    <Lightbulb className="w-5 h-5 text-amber-500" />
                                    <h3 className="font-semibold text-text-primary">Improvement Suggestions</h3>
                                </div>
                                <div className="space-y-4">
                                    {analysisResult.suggestions.map((suggestion, idx) => (
                                        <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                                            <p className="font-medium text-text-primary mb-2">{suggestion.title}</p>
                                            <ul className="space-y-1">
                                                {suggestion.items.map((item, i) => (
                                                    <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                                                        <span className="text-primary">•</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="card h-full min-h-96 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-soft flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-10 h-10 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold text-text-primary">Ready to Analyze</h3>
                                <p className="text-text-muted mt-2 max-w-xs mx-auto">
                                    Paste your resume and job description, then click Analyze to get AI-powered insights
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
