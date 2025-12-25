/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0F9D58',
                    50: '#E8F5E9',
                    100: '#C8E6C9',
                    200: '#A5D6A7',
                    300: '#81C784',
                    400: '#66BB6A',
                    500: '#0F9D58',
                    600: '#0D8A4D',
                    700: '#0A7742',
                    800: '#086437',
                    900: '#05512C',
                },
                accent: {
                    DEFAULT: '#34A853',
                    light: '#4CAF50',
                    dark: '#2E7D32',
                },
                background: {
                    DEFAULT: '#E8F5E9',
                    soft: '#F1F8E9',
                    card: '#FFFFFF',
                },
                text: {
                    primary: '#1F2937',
                    secondary: '#4B5563',
                    muted: '#6B7280',
                },
                status: {
                    success: '#10B981',
                    warning: '#F59E0B',
                    error: '#EF4444',
                    info: '#3B82F6',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
                'card-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
                'button': '0 2px 4px rgba(15, 157, 88, 0.2)',
            },
            borderRadius: {
                'card': '12px',
                'button': '8px',
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #0F9D58 0%, #34A853 100%)',
                'gradient-soft': 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
            }
        },
    },
    plugins: [],
}
