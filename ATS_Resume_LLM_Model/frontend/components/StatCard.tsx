interface StatCardProps {
    title: string
    value: string | number
    change?: string
    changeType?: 'positive' | 'negative' | 'neutral'
    icon: React.ReactNode
    color: 'green' | 'blue' | 'amber' | 'purple'
}

const colorClasses = {
    green: 'border-l-primary bg-primary-50/30',
    blue: 'border-l-blue-500 bg-blue-50/30',
    amber: 'border-l-amber-500 bg-amber-50/30',
    purple: 'border-l-purple-500 bg-purple-50/30',
}

const iconBgClasses = {
    green: 'bg-primary-100 text-primary',
    blue: 'bg-blue-100 text-blue-600',
    amber: 'bg-amber-100 text-amber-600',
    purple: 'bg-purple-100 text-purple-600',
}

export default function StatCard({ title, value, change, changeType, icon, color }: StatCardProps) {
    return (
        <div className={`stat-card ${colorClasses[color]}`}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-text-muted">{title}</p>
                    <p className="text-2xl font-bold text-text-primary mt-1">{value}</p>
                    {change && (
                        <p className={`text-sm mt-1 ${changeType === 'positive' ? 'text-green-600' :
                                changeType === 'negative' ? 'text-red-600' : 'text-text-muted'
                            }`}>
                            {change}
                        </p>
                    )}
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBgClasses[color]}`}>
                    {icon}
                </div>
            </div>
        </div>
    )
}
