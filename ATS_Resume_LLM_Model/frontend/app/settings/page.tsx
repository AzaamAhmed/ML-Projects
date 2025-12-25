'use client'

import { useState } from 'react'
import { User, Bell, Shield, Palette, Database, Globe, Save } from 'lucide-react'

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        slackNotifications: false,
        anonymousScreening: true,
        autoRanking: true,
        theme: 'light',
        language: 'en'
    })

    return (
        <div className="space-y-6 animate-fade-in max-w-4xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
                <p className="text-text-muted mt-1">Manage your account and application preferences</p>
            </div>

            {/* Profile Section */}
            <div className="card">
                <div className="flex items-center gap-3 mb-6">
                    <User className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold text-text-primary">Profile Settings</h2>
                </div>
                <div className="flex items-start gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-medium">
                        EW
                    </div>
                    <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
                                <input type="text" defaultValue="Emma Wilson" className="input-field" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                                <input type="email" defaultValue="emma.wilson@company.com" className="input-field" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">Role</label>
                                <input type="text" defaultValue="Talent Manager" className="input-field" disabled />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">Department</label>
                                <input type="text" defaultValue="Human Resources" className="input-field" disabled />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="card">
                <div className="flex items-center gap-3 mb-6">
                    <Bell className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold text-text-primary">Notifications</h2>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                            <p className="font-medium text-text-primary">Email Notifications</p>
                            <p className="text-sm text-text-muted">Receive updates about candidates and interviews</p>
                        </div>
                        <button
                            onClick={() => setSettings(s => ({ ...s, emailNotifications: !s.emailNotifications }))}
                            className={`w-12 h-6 rounded-full transition-colors ${settings.emailNotifications ? 'bg-primary' : 'bg-gray-300'
                                }`}
                        >
                            <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${settings.emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
                                }`} />
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                            <p className="font-medium text-text-primary">Slack Notifications</p>
                            <p className="text-sm text-text-muted">Get notified in Slack for important updates</p>
                        </div>
                        <button
                            onClick={() => setSettings(s => ({ ...s, slackNotifications: !s.slackNotifications }))}
                            className={`w-12 h-6 rounded-full transition-colors ${settings.slackNotifications ? 'bg-primary' : 'bg-gray-300'
                                }`}
                        >
                            <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${settings.slackNotifications ? 'translate-x-6' : 'translate-x-0.5'
                                }`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* AI & Screening */}
            <div className="card">
                <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold text-text-primary">AI & Screening Settings</h2>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                            <p className="font-medium text-text-primary">Anonymous Screening</p>
                            <p className="text-sm text-text-muted">Hide candidate names and demographics for bias-free evaluation</p>
                        </div>
                        <button
                            onClick={() => setSettings(s => ({ ...s, anonymousScreening: !s.anonymousScreening }))}
                            className={`w-12 h-6 rounded-full transition-colors ${settings.anonymousScreening ? 'bg-primary' : 'bg-gray-300'
                                }`}
                        >
                            <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${settings.anonymousScreening ? 'translate-x-6' : 'translate-x-0.5'
                                }`} />
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                            <p className="font-medium text-text-primary">Auto-Ranking</p>
                            <p className="text-sm text-text-muted">Automatically rank candidates based on ATS score</p>
                        </div>
                        <button
                            onClick={() => setSettings(s => ({ ...s, autoRanking: !s.autoRanking }))}
                            className={`w-12 h-6 rounded-full transition-colors ${settings.autoRanking ? 'bg-primary' : 'bg-gray-300'
                                }`}
                        >
                            <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${settings.autoRanking ? 'translate-x-6' : 'translate-x-0.5'
                                }`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Appearance */}
            <div className="card">
                <div className="flex items-center gap-3 mb-6">
                    <Palette className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold text-text-primary">Appearance</h2>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {['light', 'dark', 'system'].map(theme => (
                        <button
                            key={theme}
                            onClick={() => setSettings(s => ({ ...s, theme }))}
                            className={`p-4 rounded-xl border-2 transition-all text-center capitalize ${settings.theme === theme
                                    ? 'border-primary bg-primary-50'
                                    : 'border-gray-200 hover:border-primary-200'
                                }`}
                        >
                            {theme === 'light' && '☀️'}
                            {theme === 'dark' && '🌙'}
                            {theme === 'system' && '💻'}
                            <p className="mt-2 font-medium text-text-primary">{theme}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Data & Privacy */}
            <div className="card">
                <div className="flex items-center gap-3 mb-6">
                    <Database className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold text-text-primary">Data & Privacy</h2>
                </div>
                <div className="space-y-3">
                    <button className="w-full text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <p className="font-medium text-text-primary">Export All Data</p>
                        <p className="text-sm text-text-muted">Download all your data in JSON format</p>
                    </button>
                    <button className="w-full text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <p className="font-medium text-text-primary">Clear Cache</p>
                        <p className="text-sm text-text-muted">Clear locally stored data and cache</p>
                    </button>
                    <button className="w-full text-left p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                        <p className="font-medium text-red-600">Delete Account</p>
                        <p className="text-sm text-red-400">Permanently delete your account and all data</p>
                    </button>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button className="btn-primary flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                </button>
            </div>
        </div>
    )
}
