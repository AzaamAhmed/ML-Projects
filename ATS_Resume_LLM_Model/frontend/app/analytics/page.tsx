'use client'

import { Download, TrendingUp, TrendingDown, Users, Briefcase, Clock, Target } from 'lucide-react'
import ProgressBar from '@/components/ProgressBar'

// Mock chart data
const pipelineData = [
    { stage: 'Applied', count: 156, color: 'bg-green-500' },
    { stage: 'Screening', count: 89, color: 'bg-blue-500' },
    { stage: 'Interview', count: 34, color: 'bg-amber-500' },
    { stage: 'Offer', count: 12, color: 'bg-purple-500' },
    { stage: 'Hired', count: 8, color: 'bg-green-600' },
]

const sourceData = [
    { source: 'LinkedIn', count: 45, percentage: 29 },
    { source: 'Indeed', count: 30, percentage: 19 },
    { source: 'Referral', count: 32, percentage: 21 },
    { source: 'Company Website', count: 28, percentage: 18 },
    { source: 'Other', count: 21, percentage: 13 },
]

const monthlyTrend = [
    { month: 'Jul', applications: 25, hires: 2 },
    { month: 'Aug', applications: 32, hires: 3 },
    { month: 'Sep', applications: 28, hires: 2 },
    { month: 'Oct', applications: 35, hires: 3 },
    { month: 'Nov', applications: 42, hires: 4 },
    { month: 'Dec', applications: 45, hires: 3 },
]

const departmentStats = [
    { name: 'Data Science', openings: 2, applicants: 42, avgScore: 78 },
    { name: 'Engineering', openings: 1, applicants: 32, avgScore: 75 },
    { name: 'Machine Learning', openings: 1, applicants: 18, avgScore: 82 },
    { name: 'Infrastructure', openings: 1, applicants: 15, avgScore: 80 },
]

const scoreDistribution = [
    { range: '90-100', count: 12, label: 'Excellent' },
    { range: '80-89', count: 28, label: 'Good' },
    { range: '70-79', count: 45, label: 'Average' },
    { range: '60-69', count: 38, label: 'Fair' },
    { range: '<60', count: 33, label: 'Poor' },
]

export default function AnalyticsPage() {
    const maxApplications = Math.max(...monthlyTrend.map(m => m.applications))
    const maxPipelineCount = Math.max(...pipelineData.map(p => p.count))

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Analytics Dashboard</h1>
                    <p className="text-text-muted mt-1">Track hiring metrics and performance insights</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Report
                </button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-text-muted">Total Candidates</p>
                            <p className="text-3xl font-bold text-text-primary mt-1">156</p>
                            <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                                <TrendingUp className="w-4 h-4" /> +12% from last month
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                            <Users className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-text-muted">Open Positions</p>
                            <p className="text-3xl font-bold text-text-primary mt-1">5</p>
                            <p className="text-sm text-blue-600 flex items-center gap-1 mt-1">
                                2 new this week
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-text-muted">Avg. Time to Hire</p>
                            <p className="text-3xl font-bold text-text-primary mt-1">18<span className="text-lg">d</span></p>
                            <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                                <TrendingDown className="w-4 h-4" /> -3 days vs last quarter
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-amber-600" />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-text-muted">Avg. ATS Score</p>
                            <p className="text-3xl font-bold text-text-primary mt-1">76.5</p>
                            <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                                <TrendingUp className="w-4 h-4" /> +5.2% improvement
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                            <Target className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Hiring Pipeline */}
                <div className="card">
                    <h2 className="text-lg font-semibold text-text-primary mb-6">Hiring Pipeline</h2>
                    <div className="space-y-4">
                        {pipelineData.map((stage, idx) => (
                            <div key={stage.stage} className="flex items-center gap-4">
                                <div className="w-24 text-sm text-text-secondary">{stage.stage}</div>
                                <div className="flex-1">
                                    <div className="h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                                        <div
                                            className={`h-full ${stage.color} transition-all duration-500 flex items-center justify-end pr-3`}
                                            style={{ width: `${(stage.count / maxPipelineCount) * 100}%` }}
                                        >
                                            <span className="text-white text-sm font-medium">{stage.count}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-12 text-right text-sm text-text-muted">
                                    {idx > 0 ? `${Math.round((stage.count / pipelineData[idx - 1].count) * 100)}%` : '100%'}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="flex justify-between text-sm">
                            <span className="text-text-muted">Conversion Rate (Applied → Hired)</span>
                            <span className="font-semibold text-primary">5.1%</span>
                        </div>
                    </div>
                </div>

                {/* Application Trend */}
                <div className="card">
                    <h2 className="text-lg font-semibold text-text-primary mb-6">Application Trend</h2>
                    <div className="flex items-end gap-4 h-48">
                        {monthlyTrend.map(month => (
                            <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className="w-full bg-gradient-to-t from-primary to-primary-300 rounded-t-lg transition-all hover:from-primary-600"
                                    style={{ height: `${(month.applications / maxApplications) * 100}%` }}
                                />
                                <span className="text-xs text-text-muted">{month.month}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded bg-primary" />
                                <span className="text-sm text-text-muted">Applications</span>
                            </div>
                        </div>
                        <span className="text-sm text-green-600">+80% YoY Growth</span>
                    </div>
                </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Source Distribution */}
                <div className="card">
                    <h2 className="text-lg font-semibold text-text-primary mb-6">Candidate Sources</h2>
                    <div className="space-y-4">
                        {sourceData.map(source => (
                            <div key={source.source}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm text-text-secondary">{source.source}</span>
                                    <span className="text-sm font-medium text-text-primary">{source.count}</span>
                                </div>
                                <ProgressBar value={source.percentage} max={100} color="green" showValue={false} size="sm" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ATS Score Distribution */}
                <div className="card">
                    <h2 className="text-lg font-semibold text-text-primary mb-6">ATS Score Distribution</h2>
                    <div className="space-y-3">
                        {scoreDistribution.map(item => (
                            <div key={item.range} className="flex items-center gap-3">
                                <div className="w-16 text-sm text-text-secondary">{item.range}</div>
                                <div className="flex-1 h-6 bg-gray-100 rounded relative overflow-hidden">
                                    <div
                                        className={`h-full rounded ${item.label === 'Excellent' ? 'bg-green-500' :
                                                item.label === 'Good' ? 'bg-blue-500' :
                                                    item.label === 'Average' ? 'bg-amber-500' :
                                                        item.label === 'Fair' ? 'bg-orange-500' : 'bg-red-500'
                                            }`}
                                        style={{ width: `${(item.count / 50) * 100}%` }}
                                    />
                                </div>
                                <div className="w-8 text-sm text-text-muted text-right">{item.count}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Department Stats */}
                <div className="card">
                    <h2 className="text-lg font-semibold text-text-primary mb-6">By Department</h2>
                    <div className="space-y-4">
                        {departmentStats.map(dept => (
                            <div key={dept.name} className="p-3 bg-gray-50 rounded-xl">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium text-text-primary">{dept.name}</span>
                                    <span className="text-xs text-text-muted">{dept.openings} open</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="text-text-muted">Applicants:</span>
                                        <span className="ml-1 font-medium text-text-primary">{dept.applicants}</span>
                                    </div>
                                    <div>
                                        <span className="text-text-muted">Avg Score:</span>
                                        <span className="ml-1 font-medium text-primary">{dept.avgScore}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Diversity & Bias-Free Screening */}
            <div className="card">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-semibold text-text-primary">Bias-Free Screening Metrics</h2>
                        <p className="text-sm text-text-muted">Anonymized screening enabled for fair evaluation</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        ✓ Active
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gradient-soft rounded-xl text-center">
                        <p className="text-3xl font-bold text-primary">57%</p>
                        <p className="text-sm text-text-muted mt-1">Screening Pass Rate</p>
                    </div>
                    <div className="p-4 bg-gradient-soft rounded-xl text-center">
                        <p className="text-3xl font-bold text-primary">35%</p>
                        <p className="text-sm text-text-muted mt-1">Interview-to-Offer Rate</p>
                    </div>
                    <div className="p-4 bg-gradient-soft rounded-xl text-center">
                        <p className="text-3xl font-bold text-primary">4</p>
                        <p className="text-sm text-text-muted mt-1">Diverse Candidate Pools</p>
                    </div>
                    <div className="p-4 bg-gradient-soft rounded-xl text-center">
                        <p className="text-3xl font-bold text-primary">100%</p>
                        <p className="text-sm text-text-muted mt-1">Anonymous Screening</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
