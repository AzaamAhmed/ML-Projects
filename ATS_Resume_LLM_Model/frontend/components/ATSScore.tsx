interface ATSScoreProps {
    score: number
    size?: 'sm' | 'md' | 'lg'
    showLabel?: boolean
}

export default function ATSScore({ score, size = 'md', showLabel = true }: ATSScoreProps) {
    const getScoreColor = (score: number) => {
        if (score >= 80) return { bg: 'bg-green-500', text: 'text-green-600', label: 'Excellent' }
        if (score >= 60) return { bg: 'bg-blue-500', text: 'text-blue-600', label: 'Good' }
        if (score >= 40) return { bg: 'bg-amber-500', text: 'text-amber-600', label: 'Fair' }
        return { bg: 'bg-red-500', text: 'text-red-600', label: 'Poor' }
    }

    const colors = getScoreColor(score)

    const sizes = {
        sm: { circle: 'w-12 h-12', text: 'text-sm', label: 'text-xs' },
        md: { circle: 'w-20 h-20', text: 'text-xl', label: 'text-sm' },
        lg: { circle: 'w-28 h-28', text: 'text-3xl', label: 'text-base' },
    }

    const circumference = 2 * Math.PI * 45
    const strokeDashoffset = circumference - (score / 100) * circumference

    return (
        <div className="flex flex-col items-center">
            <div className={`relative ${sizes[size].circle}`}>
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="8"
                    />
                    <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className={colors.text}
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: strokeDashoffset,
                            transition: 'stroke-dashoffset 1s ease-out',
                        }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`font-bold ${colors.text} ${sizes[size].text}`}>{score}</span>
                </div>
            </div>
            {showLabel && (
                <p className={`mt-2 font-medium ${colors.text} ${sizes[size].label}`}>
                    {colors.label}
                </p>
            )}
        </div>
    )
}
