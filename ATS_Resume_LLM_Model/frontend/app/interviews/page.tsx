'use client'

import { useState } from 'react'
import { Plus, Video, MapPin, Clock, User, Calendar as CalendarIcon } from 'lucide-react'
import { StatusBadge } from '@/components/Badge'

const interviews = [
    {
        id: 'INT-001',
        candidate: 'James Rodriguez',
        candidateRole: 'Full Stack Developer',
        job: 'Full Stack Developer',
        interviewer: 'David Lee',
        date: '2024-12-28',
        time: '10:00 AM',
        duration: 60,
        type: 'Technical',
        status: 'Scheduled',
        location: 'Video Call - Zoom'
    },
    {
        id: 'INT-002',
        candidate: 'Lisa Brown',
        candidateRole: 'Product Manager',
        job: 'Product Manager',
        interviewer: 'Lisa Brown (HR)',
        date: '2024-12-27',
        time: '2:00 PM',
        duration: 45,
        type: 'Behavioral',
        status: 'Scheduled',
        location: 'Video Call - Google Meet'
    },
    {
        id: 'INT-003',
        candidate: 'Sarah Chen',
        candidateRole: 'DevOps Engineer',
        job: 'DevOps Engineer',
        interviewer: 'Emma Wilson',
        date: '2024-12-23',
        time: '11:00 AM',
        duration: 60,
        type: 'Final',
        status: 'Completed',
        location: 'On-site'
    },
    {
        id: 'INT-004',
        candidate: 'Ayaan Perera',
        candidateRole: 'ML Engineer',
        job: 'Junior Data Scientist',
        interviewer: 'Emma Wilson',
        date: '2024-12-30',
        time: '9:00 AM',
        duration: 60,
        type: 'Technical',
        status: 'Scheduled',
        location: 'Video Call - Zoom'
    }
]

const upcomingDays = [
    { day: 'Mon', date: 23, interviews: 1 },
    { day: 'Tue', date: 24, interviews: 0 },
    { day: 'Wed', date: 25, interviews: 0, isToday: true },
    { day: 'Thu', date: 26, interviews: 0 },
    { day: 'Fri', date: 27, interviews: 1 },
    { day: 'Sat', date: 28, interviews: 1 },
    { day: 'Sun', date: 29, interviews: 0 },
]

const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
]

export default function InterviewsPage() {
    const [selectedDate, setSelectedDate] = useState(28)

    const scheduledInterviews = interviews.filter(i => i.status === 'Scheduled')
    const completedInterviews = interviews.filter(i => i.status === 'Completed')

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Interview Scheduling</h1>
                    <p className="text-text-muted mt-1">Manage and schedule candidate interviews</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Schedule Interview
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Today', value: 0, icon: '📅', sub: 'Dec 25' },
                    { label: 'This Week', value: 3, icon: '📆', sub: 'Scheduled' },
                    { label: 'Completed', value: 12, icon: '✅', sub: 'This month' },
                    { label: 'Pending Feedback', value: 2, icon: '📝', sub: 'Awaiting' },
                ].map(stat => (
                    <div key={stat.label} className="card flex items-center gap-4">
                        <span className="text-3xl">{stat.icon}</span>
                        <div>
                            <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                            <p className="text-sm text-text-muted">{stat.label}</p>
                            <p className="text-xs text-text-muted">{stat.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar View */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Week View */}
                    <div className="card">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-text-primary">December 2024</h2>
                            <div className="flex gap-2">
                                <button className="btn-ghost">← Prev</button>
                                <button className="btn-ghost">Next →</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                            {upcomingDays.map(d => (
                                <button
                                    key={d.date}
                                    onClick={() => setSelectedDate(d.date)}
                                    className={`p-3 rounded-xl text-center transition-all ${selectedDate === d.date
                                            ? 'bg-primary text-white'
                                            : d.isToday
                                                ? 'bg-primary-50 text-primary'
                                                : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <p className="text-xs mb-1">{d.day}</p>
                                    <p className="text-lg font-semibold">{d.date}</p>
                                    {d.interviews > 0 && (
                                        <div className={`w-1.5 h-1.5 rounded-full mx-auto mt-1 ${selectedDate === d.date ? 'bg-white' : 'bg-primary'
                                            }`} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Schedule Grid */}
                    <div className="card">
                        <h2 className="text-lg font-semibold text-text-primary mb-4">
                            December {selectedDate}, 2024
                        </h2>
                        <div className="space-y-2">
                            {timeSlots.map(slot => {
                                const interview = interviews.find(
                                    i => i.time === slot && new Date(i.date).getDate() === selectedDate
                                )
                                return (
                                    <div key={slot} className="flex gap-4">
                                        <div className="w-20 text-sm text-text-muted py-3">{slot}</div>
                                        <div className="flex-1">
                                            {interview ? (
                                                <div className="p-3 bg-primary-50 border-l-4 border-primary rounded-lg">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="font-medium text-text-primary">{interview.candidate}</p>
                                                            <p className="text-sm text-text-muted">{interview.job} • {interview.type}</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm text-text-muted">{interview.duration} min</span>
                                                            <StatusBadge status={interview.status} />
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 mt-2 text-sm text-text-secondary">
                                                        <span className="flex items-center gap-1">
                                                            <Video className="w-4 h-4" />
                                                            {interview.location}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <User className="w-4 h-4" />
                                                            {interview.interviewer}
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="p-3 border border-dashed border-gray-200 rounded-lg text-center text-sm text-text-muted hover:border-primary hover:bg-gray-50 cursor-pointer transition-colors">
                                                    + Add Interview
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    {/* Upcoming Interviews */}
                    <div className="card">
                        <h2 className="text-lg font-semibold text-text-primary mb-4">Upcoming Interviews</h2>
                        <div className="space-y-3">
                            {scheduledInterviews.map(interview => (
                                <div key={interview.id} className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                                            {interview.candidate.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-text-primary truncate">{interview.candidate}</p>
                                            <p className="text-sm text-text-muted">{interview.job}</p>
                                            <div className="flex items-center gap-2 mt-2 text-xs text-text-secondary">
                                                <CalendarIcon className="w-3 h-3" />
                                                {interview.date} at {interview.time}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="card">
                        <h2 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h2>
                        <div className="space-y-2">
                            <button className="w-full btn-secondary text-left flex items-center gap-3">
                                <Video className="w-4 h-4" />
                                Start Video Call
                            </button>
                            <button className="w-full btn-ghost text-left flex items-center gap-3 border border-gray-200">
                                <Clock className="w-4 h-4" />
                                View Available Slots
                            </button>
                            <button className="w-full btn-ghost text-left flex items-center gap-3 border border-gray-200">
                                <MapPin className="w-4 h-4" />
                                Book Meeting Room
                            </button>
                        </div>
                    </div>

                    {/* Recent Completed */}
                    <div className="card">
                        <h2 className="text-lg font-semibold text-text-primary mb-4">Recently Completed</h2>
                        <div className="space-y-3">
                            {completedInterviews.map(interview => (
                                <div key={interview.id} className="flex items-center gap-3 p-2">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-sm">
                                        ✓
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-text-primary truncate">{interview.candidate}</p>
                                        <p className="text-xs text-text-muted">{interview.date}</p>
                                    </div>
                                    <button className="text-xs text-primary hover:underline">Feedback</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
