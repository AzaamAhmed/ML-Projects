'use client'

import { useState } from 'react'
import { Plus, Users, TrendingUp, Clock, MapPin, DollarSign, MoreHorizontal } from 'lucide-react'
import { StatusBadge } from '@/components/Badge'
import ProgressBar from '@/components/ProgressBar'

const jobs = [
    {
        id: 'JOB-001',
        title: 'Junior Data Scientist',
        department: 'Data Science',
        location: 'San Francisco, CA',
        type: 'Full-time',
        salary: '$80,000 - $100,000',
        description: 'Looking for a Junior Data Scientist to join our analytics team.',
        requiredSkills: ['Python', 'Pandas', 'Machine Learning', 'Statistics', 'SQL'],
        preferredSkills: ['TensorFlow', 'Tableau', 'AWS'],
        experience: '1-3 years',
        applicants: 24,
        shortlisted: 5,
        status: 'Active',
        postedDate: '2024-12-01'
    },
    {
        id: 'JOB-002',
        title: 'Senior ML Engineer',
        department: 'Machine Learning',
        location: 'Remote',
        type: 'Full-time',
        salary: '$150,000 - $200,000',
        description: 'Senior ML Engineer role for building production ML systems.',
        requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'MLOps', 'Docker'],
        preferredSkills: ['Kubernetes', 'AWS SageMaker'],
        experience: '4+ years',
        applicants: 18,
        shortlisted: 3,
        status: 'Active',
        postedDate: '2024-12-05'
    },
    {
        id: 'JOB-003',
        title: 'Full Stack Developer',
        department: 'Engineering',
        location: 'New York, NY',
        type: 'Full-time',
        salary: '$120,000 - $160,000',
        description: 'Full Stack Developer for our product team.',
        requiredSkills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
        preferredSkills: ['Next.js', 'GraphQL', 'Docker'],
        experience: '3-6 years',
        applicants: 32,
        shortlisted: 8,
        status: 'Active',
        postedDate: '2024-12-10'
    },
    {
        id: 'JOB-004',
        title: 'DevOps Engineer',
        department: 'Infrastructure',
        location: 'Seattle, WA',
        type: 'Full-time',
        salary: '$140,000 - $180,000',
        description: 'DevOps Engineer to manage cloud infrastructure.',
        requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
        preferredSkills: ['GCP', 'Azure', 'Ansible'],
        experience: '4-8 years',
        applicants: 15,
        shortlisted: 4,
        status: 'Active',
        postedDate: '2024-12-08'
    }
]

export default function JobsPage() {
    const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null)

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Job Postings</h1>
                    <p className="text-text-muted mt-1">Create and manage job postings</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Create New Job
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Active Jobs', value: 5, icon: '📋' },
                    { label: 'Total Applicants', value: 156, icon: '👥' },
                    { label: 'Interviews This Week', value: 8, icon: '📅' },
                    { label: 'Offers Pending', value: 3, icon: '✉️' },
                ].map(stat => (
                    <div key={stat.label} className="card flex items-center gap-4">
                        <span className="text-3xl">{stat.icon}</span>
                        <div>
                            <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                            <p className="text-sm text-text-muted">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Jobs List */}
                <div className="lg:col-span-2 space-y-4">
                    {jobs.map(job => (
                        <div
                            key={job.id}
                            onClick={() => setSelectedJob(job)}
                            className={`card cursor-pointer transition-all ${selectedJob?.id === job.id
                                    ? 'ring-2 ring-primary shadow-card-hover'
                                    : 'hover:shadow-card-hover'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-semibold text-text-primary">{job.title}</h3>
                                        <StatusBadge status={job.status} />
                                    </div>
                                    <p className="text-text-muted mt-1">{job.department}</p>
                                </div>
                                <button className="p-1 hover:bg-gray-100 rounded">
                                    <MoreHorizontal className="w-5 h-5 text-text-muted" />
                                </button>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-4">
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {job.location}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {job.experience}
                                </span>
                                <span className="flex items-center gap-1">
                                    <DollarSign className="w-4 h-4" />
                                    {job.salary}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {job.requiredSkills.slice(0, 4).map(skill => (
                                    <span key={skill} className="px-2 py-0.5 bg-primary-50 text-primary text-xs rounded-full">
                                        {skill}
                                    </span>
                                ))}
                                {job.requiredSkills.length > 4 && (
                                    <span className="px-2 py-0.5 bg-gray-100 text-text-muted text-xs rounded-full">
                                        +{job.requiredSkills.length - 4} more
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <Users className="w-4 h-4 text-text-muted" />
                                        <span className="text-sm font-medium text-text-primary">{job.applicants}</span>
                                        <span className="text-sm text-text-muted">applicants</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <TrendingUp className="w-4 h-4 text-green-500" />
                                        <span className="text-sm font-medium text-text-primary">{job.shortlisted}</span>
                                        <span className="text-sm text-text-muted">shortlisted</span>
                                    </div>
                                </div>
                                <p className="text-xs text-text-muted">Posted {job.postedDate}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Job Detail Panel */}
                <div className="lg:col-span-1">
                    {selectedJob ? (
                        <div className="card sticky top-6">
                            <h3 className="text-xl font-semibold text-text-primary">{selectedJob.title}</h3>
                            <p className="text-text-muted mt-1">{selectedJob.department}</p>

                            <div className="mt-6 space-y-4">
                                <div>
                                    <p className="text-sm font-medium text-text-secondary mb-2">Description</p>
                                    <p className="text-text-primary text-sm">{selectedJob.description}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-text-secondary mb-2">Required Skills</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {selectedJob.requiredSkills.map(skill => (
                                            <span key={skill} className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-text-secondary mb-2">Preferred Skills</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {selectedJob.preferredSkills.map(skill => (
                                            <span key={skill} className="px-2 py-1 bg-gray-100 text-text-secondary text-xs rounded-full">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-text-secondary mb-2">Applicant Funnel</p>
                                    <div className="space-y-2">
                                        <ProgressBar value={selectedJob.applicants} max={selectedJob.applicants} label="Applied" color="green" />
                                        <ProgressBar value={selectedJob.shortlisted} max={selectedJob.applicants} label="Shortlisted" color="blue" />
                                        <ProgressBar value={Math.round(selectedJob.shortlisted * 0.6)} max={selectedJob.applicants} label="Interview" color="amber" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                                <button className="btn-primary w-full">View Candidates</button>
                                <button className="btn-secondary w-full">Edit Job</button>
                            </div>
                        </div>
                    ) : (
                        <div className="card text-center py-12">
                            <div className="text-4xl mb-4">📋</div>
                            <h3 className="text-lg font-medium text-text-primary">Select a Job</h3>
                            <p className="text-text-muted mt-1">Click on a job to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
