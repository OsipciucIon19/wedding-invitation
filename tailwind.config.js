/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                wedding: {
                    cream: '#FFF8F0',
                    ivory: '#FFFFF0',
                    blush: '#FFE4E1',
                    champagne: '#F7E7CE',
                    green: '#9CAF88',
                    'green-light': '#C8D5B9',
                    rose: '#FFC1CC',
                    'rose-dark': '#E6A1A7',
                },
            },
            fontFamily: {
                script: ['Dancing Script', 'cursive'],
                serif: ['Playfair Display', 'serif'],
                sans: ['Montserrat', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 1s ease-in-out',
                'slide-up': 'slideUp 0.8s ease-out',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(50px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
    plugins: [],
};
