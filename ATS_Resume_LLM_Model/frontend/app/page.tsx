'use client'

import { Users, Briefcase, Calendar, TrendingUp, Award, Clock } from 'lucide-react'
import StatCard from '@/components/StatCard'
import ATSScore from '@/components/ATSScore'
import ProgressBar from '@/components/ProgressBar'
import { RecommendationBadge, StatusBadge } from '@/components/Badge'

// Mock data
const stats = {
    totalCandidates: 156,
    activeJobs: 5,
    interviewsScheduled: 8,
    offersExtended: 3,
    avgAtsScore: 76.5,
    avgTimeToHire: 18
}

const recentCandidates = [
    { id: 'CAND-001', name: 'Ayaan Perera', role: 'ML Engineer', atsScore: 85, status: 'Shortlisted', recommendation: 'Hire' as const },
    { id: 'CAND-006', name: 'Emily Watson', role: 'Data Scientist', atsScore: 89, status: 'Shortlisted', recommendation: 'Hire' as const },
    { id: 'CAND-003', name: 'James Rodriguez', role: 'Full Stack Dev', atsScore: 82, status: 'Interview Scheduled', recommendation: 'Hire' as const },
    { id: 'CAND-002', name: 'Priya Sharma', role: 'Data Analyst', atsScore: 78, status: 'Under Review', recommendation: 'Review' as const },
]

const activeJobs = [
    { id: 'JOB-001', title: 'Junior Data Scientist', applicants: 24, shortlisted: 5, department: 'Data Science' },
    { id: 'JOB-002', title: 'Senior ML Engineer', applicants: 18, shortlisted: 3, department: 'Machine Learning' },
    { id: 'JOB-003', title: 'Full Stack Developer', applicants: 32, shortlisted: 8, department: 'Engineering' },
]

const pipeline = {
    applied: 156,
    screening: 89,
    interview: 34,
    offer: 12,
    hired: 8
}

export default function Dashboard() {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
                    <p className="text-text-muted mt-1">Welcome back! Here's what's happening with your hiring.</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Post New Job
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Candidates"
                    value={stats.totalCandidates}
                    change="+12% from last month"
                    changeType="positive"
                    icon={<Users className="w-6 h-6" />}
                    color="green"
                />
                <StatCard
                    title="Active Jobs"
                    value={stats.activeJobs}
                    change="2 new this week"
                    changeType="positive"
                    icon={<Briefcase className="w-6 h-6" />}
                    color="blue"
                />
                <StatCard
                    title="Interviews Scheduled"
                    value={stats.interviewsScheduled}
                    change="3 this week"
                    changeType="neutral"
                    icon={<Calendar className="w-6 h-6" />}
                    color="amber"
                />
                <StatCard
                    title="Offers Extended"
                    value={stats.offersExtended}
                    change="+1 pending"
                    changeType="positive"
                    icon={<Award className="w-6 h-6" />}
                    color="purple"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Candidates */}
                <div className="lg:col-span-2 card">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-text-primary">Recent Candidates</h2>
                        <a href="/candidates" className="text-sm text-primary hover:underline">View all →</a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b border-gray-100">
                                    <th className="pb-3 text-sm font-semibold text-text-secondary">Candidate</th>
                                    <th className="pb-3 text-sm font-semibold text-text-secondary">ATS Score</th>
                                    <th className="pb-3 text-sm font-semibold text-text-secondary">Status</th>
                                    <th className="pb-3 text-sm font-semibold text-text-secondary">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentCandidates.map((candidate) => (
                                    <tr key={candidate.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-medium">
                                                    {candidate.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-text-primary">{candidate.name}</p>
                                                    <p className="text-sm text-text-muted">{candidate.role}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16">
                                                    <ProgressBar value={candidate.atsScore} size="sm" showValue={false} />
                                                </div>
                                                <span className="text-sm font-medium text-text-primary">{candidate.atsScore}</span>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <StatusBadge status={candidate.status} />
                                        </td>
                                        <td className="py-4">
                                            <RecommendationBadge recommendation={candidate.recommendation} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Hiring Pipeline */}
                <div className="card">
                    <h2 className="text-lg font-semibold text-text-primary mb-6">Hiring Pipeline</h2>
                    <div className="space-y-4">
                        {[
                            { label: 'Applied', value: pipeline.applied, color: 'green' as const },
                            { label: 'Screening', value: pipeline.screening, color: 'blue' as const },
                            { label: 'Interview', value: pipeline.interview, color: 'amber' as const },
                            { label: 'Offer', value: pipeline.offer, color: 'purple' as const },
                            { label: 'Hired', value: pipeline.hired, color: 'green' as const },
                        ].map((stage) => (
                            <div key={stage.label}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-text-secondary">{stage.label}</span>
                                    <span className="text-sm font-medium text-text-primary">{stage.value}</span>
                                </div>
                                <ProgressBar
                                    value={stage.value}
                                    max={pipeline.applied}
                                    color={stage.color}
                                    showValue={false}
                                    size="sm"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Active Jobs */}
            <div className="card">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-text-primary">Active Job Postings</h2>
                    <a href="/jobs" className="text-sm text-primary hover:underline">Manage →</a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {activeJobs.map((job) => (
                        <div key={job.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="font-medium text-text-primary">{job.title}</h3>
                                    <p className="text-sm text-text-muted">{job.department}</p>
                                </div>
                                <StatusBadge status="Active" />
                            </div>
                            <div className="flex items-center gap-4 text-sm text-text-secondary">
                                <span className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {job.applicants} applicants
                                </span>
                                <span className="flex items-center gap-1">
                                    <TrendingUp className="w-4 h-4" />
                                    {job.shortlisted} shortlisted
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Average ATS Score */}
                <div className="card flex items-center gap-6">
                    <ATSScore score={Math.round(stats.avgAtsScore)} size="lg" />
                    <div>
                        <h3 className="text-lg font-semibold text-text-primary">Average ATS Score</h3>
                        <p className="text-text-muted mt-1">Across all candidates this month</p>
                        <p className="text-sm text-green-600 mt-2">↑ 5.2% improvement from last month</p>
                    </div>
                </div>

                {/* Time to Hire */}
                <div className="card flex items-center gap-6">
                    <div className="w-28 h-28 rounded-full bg-gradient-soft flex items-center justify-center">
                        <div className="text-center">
                            <Clock className="w-6 h-6 text-primary mx-auto mb-1" />
                            <span className="text-2xl font-bold text-primary">{stats.avgTimeToHire}</span>
                            <span className="text-sm text-text-muted block">days</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-text-primary">Average Time to Hire</h3>
                        <p className="text-text-muted mt-1">From application to offer</p>
                        <p className="text-sm text-green-600 mt-2">↓ 3 days faster than last quarter</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
