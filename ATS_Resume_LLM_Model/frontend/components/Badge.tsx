interface BadgeProps {
    children: React.ReactNode
    variant: 'success' | 'warning' | 'error' | 'info' | 'neutral'
}

const variantClasses = {
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    error: 'bg-red-100 text-red-800 border-red-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
    neutral: 'bg-gray-100 text-gray-800 border-gray-200',
}

export default function Badge({ children, variant }: BadgeProps) {
    return (
        <span className={`badge border ${variantClasses[variant]}`}>
            {children}
        </span>
    )
}

// Recommendation Badge
interface RecommendationBadgeProps {
    recommendation: 'Hire' | 'Review' | 'Reject'
}

export function RecommendationBadge({ recommendation }: RecommendationBadgeProps) {
    const variants: Record<string, 'success' | 'warning' | 'error'> = {
        Hire: 'success',
        Review: 'warning',
        Reject: 'error',
    }

    const icons: Record<string, string> = {
        Hire: '✓',
        Review: '◎',
        Reject: '✕',
    }

    return (
        <Badge variant={variants[recommendation]}>
            <span className="mr-1">{icons[recommendation]}</span>
            {recommendation}
        </Badge>
    )
}

// Status Badge
interface StatusBadgeProps {
    status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const getVariant = (status: string): 'success' | 'warning' | 'error' | 'info' | 'neutral' => {
        const statusMap: Record<string, 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
            'Shortlisted': 'success',
            'Interview Scheduled': 'info',
            'Offer Extended': 'success',
            'Under Review': 'warning',
            'Rejected': 'error',
            'Applied': 'neutral',
            'Active': 'success',
            'Closed': 'neutral',
            'Scheduled': 'info',
            'Completed': 'success',
        }
        return statusMap[status] || 'neutral'
    }

    return <Badge variant={getVariant(status)}>{status}</Badge>
}
