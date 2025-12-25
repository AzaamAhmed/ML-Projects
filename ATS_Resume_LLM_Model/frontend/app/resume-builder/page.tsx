'use client'

import { useState } from 'react'
import { Download, Eye, FileText, User, Briefcase, GraduationCap, Award, Plus, Trash2 } from 'lucide-react'

const templates = [
    { id: 'professional', name: 'Professional', description: 'Clean, traditional format', icon: '📄' },
    { id: 'modern', name: 'Modern', description: 'Contemporary design', icon: '✨' },
    { id: 'technical', name: 'Technical', description: 'Skills-focused format', icon: '💻' },
]

export default function ResumeBuilderPage() {
    const [selectedTemplate, setSelectedTemplate] = useState('professional')
    const [formData, setFormData] = useState({
        name: 'Ayaan Perera',
        email: 'ayaan.perera@email.com',
        phone: '+1-555-0123',
        location: 'San Francisco, CA',
        summary: 'Experienced Machine Learning Engineer with 3+ years of experience in developing and deploying ML models.',
        skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Machine Learning'],
        experience: [
            {
                title: 'ML Engineer',
                company: 'TechCorp',
                duration: '2021 - Present',
                description: 'Developed and deployed ML models for production'
            }
        ],
        education: [
            {
                degree: "Master's in Computer Science",
                school: 'Stanford University',
                year: '2020'
            }
        ],
        certifications: ['AWS Certified ML Specialty', 'TensorFlow Developer']
    })

    const [newSkill, setNewSkill] = useState('')

    const addSkill = () => {
        if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
            setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] })
            setNewSkill('')
        }
    }

    const removeSkill = (skill: string) => {
        setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) })
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Resume Builder</h1>
                    <p className="text-text-muted mt-1">Create ATS-optimized resumes with AI assistance</p>
                </div>
                <div className="flex gap-2">
                    <button className="btn-secondary flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Preview
                    </button>
                    <button className="btn-primary flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export PDF
                    </button>
                </div>
            </div>

            {/* Template Selection */}
            <div className="card">
                <h2 className="text-lg font-semibold text-text-primary mb-4">Choose Template</h2>
                <div className="grid grid-cols-3 gap-4">
                    {templates.map(template => (
                        <button
                            key={template.id}
                            onClick={() => setSelectedTemplate(template.id)}
                            className={`p-4 rounded-xl border-2 transition-all text-left ${selectedTemplate === template.id
                                    ? 'border-primary bg-primary-50'
                                    : 'border-gray-200 hover:border-primary-200'
                                }`}
                        >
                            <span className="text-2xl mb-2 block">{template.icon}</span>
                            <p className="font-medium text-text-primary">{template.name}</p>
                            <p className="text-sm text-text-muted">{template.description}</p>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Form */}
                <div className="space-y-4">
                    {/* Personal Info */}
                    <div className="card">
                        <div className="flex items-center gap-2 mb-4">
                            <User className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-semibold text-text-primary">Personal Information</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">Phone</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">Location</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    className="input-field"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-text-secondary mb-1">Professional Summary</label>
                            <textarea
                                value={formData.summary}
                                onChange={e => setFormData({ ...formData, summary: e.target.value })}
                                className="input-field h-24 resize-none"
                            />
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="card">
                        <div className="flex items-center gap-2 mb-4">
                            <Award className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-semibold text-text-primary">Skills</h2>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {formData.skills.map(skill => (
                                <span key={skill} className="px-3 py-1.5 bg-primary-50 text-primary rounded-full flex items-center gap-2">
                                    {skill}
                                    <button onClick={() => removeSkill(skill)} className="hover:text-red-500">
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newSkill}
                                onChange={e => setNewSkill(e.target.value)}
                                placeholder="Add a skill..."
                                className="input-field flex-1"
                                onKeyPress={e => e.key === 'Enter' && addSkill()}
                            />
                            <button onClick={addSkill} className="btn-primary px-4">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Experience */}
                    <div className="card">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-primary" />
                                <h2 className="text-lg font-semibold text-text-primary">Experience</h2>
                            </div>
                            <button className="btn-ghost text-sm">+ Add Experience</button>
                        </div>
                        {formData.experience.map((exp, idx) => (
                            <div key={idx} className="p-4 bg-gray-50 rounded-xl mb-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        value={exp.title}
                                        placeholder="Job Title"
                                        className="input-field"
                                        onChange={e => {
                                            const newExp = [...formData.experience]
                                            newExp[idx].title = e.target.value
                                            setFormData({ ...formData, experience: newExp })
                                        }}
                                    />
                                    <input
                                        type="text"
                                        value={exp.company}
                                        placeholder="Company"
                                        className="input-field"
                                        onChange={e => {
                                            const newExp = [...formData.experience]
                                            newExp[idx].company = e.target.value
                                            setFormData({ ...formData, experience: newExp })
                                        }}
                                    />
                                </div>
                                <input
                                    type="text"
                                    value={exp.duration}
                                    placeholder="Duration (e.g., 2021 - Present)"
                                    className="input-field mt-3"
                                    onChange={e => {
                                        const newExp = [...formData.experience]
                                        newExp[idx].duration = e.target.value
                                        setFormData({ ...formData, experience: newExp })
                                    }}
                                />
                                <textarea
                                    value={exp.description}
                                    placeholder="Description"
                                    className="input-field mt-3 h-20 resize-none"
                                    onChange={e => {
                                        const newExp = [...formData.experience]
                                        newExp[idx].description = e.target.value
                                        setFormData({ ...formData, experience: newExp })
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Education */}
                    <div className="card">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-primary" />
                                <h2 className="text-lg font-semibold text-text-primary">Education</h2>
                            </div>
                            <button className="btn-ghost text-sm">+ Add Education</button>
                        </div>
                        {formData.education.map((edu, idx) => (
                            <div key={idx} className="p-4 bg-gray-50 rounded-xl mb-3">
                                <input
                                    type="text"
                                    value={edu.degree}
                                    placeholder="Degree"
                                    className="input-field mb-3"
                                    onChange={e => {
                                        const newEdu = [...formData.education]
                                        newEdu[idx].degree = e.target.value
                                        setFormData({ ...formData, education: newEdu })
                                    }}
                                />
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        value={edu.school}
                                        placeholder="Institution"
                                        className="input-field"
                                        onChange={e => {
                                            const newEdu = [...formData.education]
                                            newEdu[idx].school = e.target.value
                                            setFormData({ ...formData, education: newEdu })
                                        }}
                                    />
                                    <input
                                        type="text"
                                        value={edu.year}
                                        placeholder="Year"
                                        className="input-field"
                                        onChange={e => {
                                            const newEdu = [...formData.education]
                                            newEdu[idx].year = e.target.value
                                            setFormData({ ...formData, education: newEdu })
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Preview */}
                <div className="lg:sticky lg:top-6 h-fit">
                    <div className="card">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-text-primary">Live Preview</h2>
                            <span className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full">
                                {templates.find(t => t.id === selectedTemplate)?.name}
                            </span>
                        </div>

                        {/* Resume Preview */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-inner max-h-[600px] overflow-y-auto">
                            <div className="border-b pb-4 mb-4">
                                <h1 className="text-xl font-bold text-text-primary">{formData.name}</h1>
                                <p className="text-sm text-text-muted mt-1">
                                    {formData.email} • {formData.phone} • {formData.location}
                                </p>
                            </div>

                            {formData.summary && (
                                <div className="mb-4">
                                    <h2 className="text-sm font-semibold text-primary uppercase mb-2">Summary</h2>
                                    <p className="text-sm text-text-secondary">{formData.summary}</p>
                                </div>
                            )}

                            <div className="mb-4">
                                <h2 className="text-sm font-semibold text-primary uppercase mb-2">Skills</h2>
                                <p className="text-sm text-text-secondary">{formData.skills.join(' • ')}</p>
                            </div>

                            <div className="mb-4">
                                <h2 className="text-sm font-semibold text-primary uppercase mb-2">Experience</h2>
                                {formData.experience.map((exp, idx) => (
                                    <div key={idx} className="mb-3">
                                        <div className="flex justify-between">
                                            <p className="text-sm font-medium text-text-primary">{exp.title}</p>
                                            <p className="text-xs text-text-muted">{exp.duration}</p>
                                        </div>
                                        <p className="text-sm text-text-secondary">{exp.company}</p>
                                        <p className="text-xs text-text-muted mt-1">{exp.description}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mb-4">
                                <h2 className="text-sm font-semibold text-primary uppercase mb-2">Education</h2>
                                {formData.education.map((edu, idx) => (
                                    <div key={idx} className="mb-2">
                                        <div className="flex justify-between">
                                            <p className="text-sm font-medium text-text-primary">{edu.degree}</p>
                                            <p className="text-xs text-text-muted">{edu.year}</p>
                                        </div>
                                        <p className="text-sm text-text-secondary">{edu.school}</p>
                                    </div>
                                ))}
                            </div>

                            {formData.certifications.length > 0 && (
                                <div>
                                    <h2 className="text-sm font-semibold text-primary uppercase mb-2">Certifications</h2>
                                    <ul className="text-sm text-text-secondary">
                                        {formData.certifications.map((cert, idx) => (
                                            <li key={idx}>• {cert}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* ATS Score Indicator */}
                        <div className="mt-4 p-4 bg-gradient-soft rounded-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-text-primary">ATS Compatibility</p>
                                    <p className="text-sm text-text-muted">Based on format and keywords</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-primary">92%</p>
                                    <p className="text-xs text-green-600">Excellent</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
