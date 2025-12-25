interface ProgressBarProps {
    value: number
    max?: number
    color?: 'green' | 'blue' | 'amber' | 'red' | 'auto'
    showValue?: boolean
    label?: string
    size?: 'sm' | 'md' | 'lg'
}

export default function ProgressBar({
    value,
    max = 100,
    color = 'auto',
    showValue = true,
    label,
    size = 'md'
}: ProgressBarProps) {
    const percentage = Math.min((value / max) * 100, 100)

    const getAutoColor = (pct: number) => {
        if (pct >= 80) return 'green'
        if (pct >= 60) return 'blue'
        if (pct >= 40) return 'amber'
        return 'red'
    }

    const actualColor = color === 'auto' ? getAutoColor(percentage) : color

    const colorClasses = {
        green: 'bg-gradient-to-r from-green-500 to-green-400',
        blue: 'bg-gradient-to-r from-blue-500 to-blue-400',
        amber: 'bg-gradient-to-r from-amber-500 to-amber-400',
        red: 'bg-gradient-to-r from-red-500 to-red-400',
    }

    const sizeClasses = {
        sm: 'h-1.5',
        md: 'h-2.5',
        lg: 'h-4',
    }

    return (
        <div className="w-full">
            {(label || showValue) && (
                <div className="flex justify-between items-center mb-1.5">
                    {label && <span className="text-sm text-text-secondary">{label}</span>}
                    {showValue && (
                        <span className="text-sm font-medium text-text-primary">{Math.round(percentage)}%</span>
                    )}
                </div>
            )}
            <div className={`progress-bar ${sizeClasses[size]}`}>
                <div
                    className={`progress-fill ${colorClasses[actualColor]}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}
