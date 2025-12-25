'use client'

import { useState } from 'react'
import { Search, Filter, Download, MoreHorizontal, Eye, Mail, Calendar } from 'lucide-react'
import ATSScore from '@/components/ATSScore'
import ProgressBar from '@/components/ProgressBar'
import { RecommendationBadge, StatusBadge } from '@/components/Badge'

// Mock data
const candidates = [
    {
        id: 'CAND-001',
        name: 'Ayaan Perera',
        email: 'ayaan.perera@email.com',
        role: 'ML Engineer',
        experience: 3.2,
        skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Pandas'],
        education: "Master's in CS, Stanford",
        atsScore: 85,
        matchScore: 88,
        status: 'Shortlisted',
        recommendation: 'Hire' as const,
        appliedJob: 'Junior Data Scientist',
        appliedDate: '2024-12-20'
    },
    {
        id: 'CAND-002',
        name: 'Priya Sharma',
        email: 'priya.sharma@email.com',
        role: 'Data Analyst',
        experience: 2.5,
        skills: ['Python', 'Pandas', 'SQL', 'Tableau', 'Excel'],
        education: "Bachelor's in Statistics, UCLA",
        atsScore: 78,
        matchScore: 75,
        status: 'Under Review',
        recommendation: 'Review' as const,
        appliedJob: 'Junior Data Scientist',
        appliedDate: '2024-12-19'
    },
    {
        id: 'CAND-003',
        name: 'James Rodriguez',
        email: 'james.rodriguez@email.com',
        role: 'Full Stack Developer',
        experience: 4.0,
        skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL'],
        education: "Bachelor's in CS, MIT",
        atsScore: 82,
        matchScore: 85,
        status: 'Interview Scheduled',
        recommendation: 'Hire' as const,
        appliedJob: 'Full Stack Developer',
        appliedDate: '2024-12-18'
    },
    {
        id: 'CAND-004',
        name: 'Sarah Chen',
        email: 'sarah.chen@email.com',
        role: 'DevOps Engineer',
        experience: 5.1,
        skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
        education: "Master's in CE, Berkeley",
        atsScore: 91,
        matchScore: 92,
        status: 'Offer Extended',
        recommendation: 'Hire' as const,
        appliedJob: 'DevOps Engineer',
        appliedDate: '2024-12-15'
    },
    {
        id: 'CAND-005',
        name: 'Mike Johnson',
        email: 'mike.johnson@email.com',
        role: 'Junior Developer',
        experience: 1.0,
        skills: ['JavaScript', 'HTML', 'CSS', 'React', 'Git'],
        education: "Bachelor's in IT",
        atsScore: 65,
        matchScore: 60,
        status: 'Rejected',
        recommendation: 'Reject' as const,
        appliedJob: 'Full Stack Developer',
        appliedDate: '2024-12-17'
    },
    {
        id: 'CAND-006',
        name: 'Emily Watson',
        email: 'emily.watson@email.com',
        role: 'Data Scientist',
        experience: 3.5,
        skills: ['Python', 'R', 'Machine Learning', 'Deep Learning', 'SQL'],
        education: 'Ph.D. in Statistics, Columbia',
        atsScore: 89,
        matchScore: 90,
        status: 'Shortlisted',
        recommendation: 'Hire' as const,
        appliedJob: 'Senior ML Engineer',
        appliedDate: '2024-12-21'
    }
]

const filters = ['All', 'Shortlisted', 'Interview Scheduled', 'Under Review', 'Offer Extended', 'Rejected']

export default function CandidatesPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('All')
    const [selectedCandidate, setSelectedCandidate] = useState<typeof candidates[0] | null>(null)

    const filteredCandidates = candidates.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
        const matchesFilter = selectedFilter === 'All' || c.status === selectedFilter
        return matchesSearch && matchesFilter
    })

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Candidates</h1>
                    <p className="text-text-muted mt-1">Manage and review all candidate applications</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Report
                </button>
            </div>

            {/* Filters */}
            <div className="card">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                        <input
                            type="text"
                            placeholder="Search by name or skills..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-field pl-10"
                        />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                        {filters.map(filter => (
                            <button
                                key={filter}
                                onClick={() => setSelectedFilter(filter)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
                  ${selectedFilter === filter
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-text-secondary hover:bg-gray-200'}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Candidates List */}
                <div className="lg:col-span-2 space-y-4">
                    {filteredCandidates.map(candidate => (
                        <div
                            key={candidate.id}
                            onClick={() => setSelectedCandidate(candidate)}
                            className={`card cursor-pointer transition-all ${selectedCandidate?.id === candidate.id
                                    ? 'ring-2 ring-primary shadow-card-hover'
                                    : 'hover:shadow-card-hover'
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                {/* Avatar */}
                                <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center text-white text-lg font-medium flex-shrink-0">
                                    {candidate.name.split(' ').map(n => n[0]).join('')}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="font-semibold text-text-primary">{candidate.name}</h3>
                                            <p className="text-sm text-text-muted">{candidate.role} • {candidate.experience} years</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RecommendationBadge recommendation={candidate.recommendation} />
                                            <button className="p-1 hover:bg-gray-100 rounded">
                                                <MoreHorizontal className="w-5 h-5 text-text-muted" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {candidate.skills.slice(0, 5).map(skill => (
                                            <span key={skill} className="px-2 py-0.5 bg-primary-50 text-primary text-xs rounded-full">
                                                {skill}
                                            </span>
                                        ))}
                                        {candidate.skills.length > 5 && (
                                            <span className="px-2 py-0.5 bg-gray-100 text-text-muted text-xs rounded-full">
                                                +{candidate.skills.length - 5} more
                                            </span>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <p className="text-xs text-text-muted">ATS Score</p>
                                                <div className="flex items-center gap-1">
                                                    <ProgressBar value={candidate.atsScore} size="sm" showValue={false} />
                                                    <span className="text-sm font-semibold text-text-primary ml-2">{candidate.atsScore}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs text-text-muted">Match</p>
                                                <span className="text-sm font-semibold text-primary">{candidate.matchScore}%</span>
                                            </div>
                                        </div>
                                        <StatusBadge status={candidate.status} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Candidate Detail Panel */}
                <div className="lg:col-span-1">
                    {selectedCandidate ? (
                        <div className="card sticky top-6">
                            <div className="text-center pb-4 border-b border-gray-100">
                                <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-medium mx-auto">
                                    {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h3 className="text-xl font-semibold text-text-primary mt-4">{selectedCandidate.name}</h3>
                                <p className="text-text-muted">{selectedCandidate.role}</p>
                                <p className="text-sm text-text-muted mt-1">{selectedCandidate.email}</p>
                            </div>

                            <div className="py-4 border-b border-gray-100">
                                <div className="flex justify-center">
                                    <ATSScore score={selectedCandidate.atsScore} size="lg" />
                                </div>
                            </div>

                            <div className="py-4 space-y-4">
                                <div>
                                    <p className="text-sm font-medium text-text-secondary mb-2">Experience</p>
                                    <p className="text-text-primary">{selectedCandidate.experience} years</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-text-secondary mb-2">Education</p>
                                    <p className="text-text-primary">{selectedCandidate.education}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-text-secondary mb-2">Applied For</p>
                                    <p className="text-text-primary">{selectedCandidate.appliedJob}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-text-secondary mb-2">Skills</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {selectedCandidate.skills.map(skill => (
                                            <span key={skill} className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 space-y-2">
                                <button className="btn-primary w-full flex items-center justify-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Schedule Interview
                                </button>
                                <button className="btn-secondary w-full flex items-center justify-center gap-2">
                                    <Eye className="w-4 h-4" />
                                    View Resume
                                </button>
                                <button className="btn-ghost w-full flex items-center justify-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Send Email
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="card text-center py-12">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                                <Eye className="w-8 h-8 text-text-muted" />
                            </div>
                            <h3 className="text-lg font-medium text-text-primary">Select a Candidate</h3>
                            <p className="text-text-muted mt-1">Click on a candidate to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
