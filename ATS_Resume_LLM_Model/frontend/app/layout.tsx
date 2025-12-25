import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export const metadata: Metadata = {
    title: 'ATS Resume Checker | AI-Powered HR Management',
    description: 'AI-powered Applicant Tracking System with resume analysis, JD matching, and HR workflows',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col ml-64">
                    <Header />
                    <main className="flex-1 p-6 overflow-auto">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    )
}
