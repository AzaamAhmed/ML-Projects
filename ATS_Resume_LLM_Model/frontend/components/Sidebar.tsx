'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    Users,
    Briefcase,
    FileSearch,
    FileEdit,
    Calendar,
    BarChart3,
    Settings,
    Shield
} from 'lucide-react'

const navItems = [
    { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/candidates', icon: Users, label: 'Candidates' },
    { href: '/jobs', icon: Briefcase, label: 'Job Postings' },
    { href: '/resume-checker', icon: FileSearch, label: 'Resume Checker' },
    { href: '/resume-builder', icon: FileEdit, label: 'Resume Builder' },
    { href: '/interviews', icon: Calendar, label: 'Interviews' },
    { href: '/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50">
            {/* Logo */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-primary">ATS Pro</h1>
                        <p className="text-xs text-text-muted">AI-Powered Hiring</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
                <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-medium">
                        EW
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">Emma Wilson</p>
                        <p className="text-xs text-text-muted truncate">Talent Manager</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}
