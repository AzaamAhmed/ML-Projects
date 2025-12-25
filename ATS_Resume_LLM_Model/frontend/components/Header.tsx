'use client'

import { Bell, Search, HelpCircle } from 'lucide-react'

export default function Header() {
    return (
        <header className="h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-xl">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search candidates, jobs, or keywords..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary
                     text-sm transition-all duration-200"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 ml-4">
                <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Bell className="w-5 h-5 text-text-muted" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <HelpCircle className="w-5 h-5 text-text-muted" />
                </button>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="text-right">
                    <p className="text-sm font-medium text-text-primary">Dec 25, 2024</p>
                    <p className="text-xs text-text-muted">5:19 PM</p>
                </div>
            </div>
        </header>
    )
}
