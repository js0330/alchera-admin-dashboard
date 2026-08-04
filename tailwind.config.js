/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-navy': '#000038',
        'primary-blue': '#0000A5',
        'accent-blue': '#1D4ED8',
        'text-gray': '#666666',
        'text-light': '#595959',
        'border-gray': '#E0E5F0',
        'bg-panel': '#F5F7FC',
        'bg-white': '#FFFFFF',
        'status-normal': '#22C55E',
        'status-caution': '#F1A11D',
        'status-danger': '#E84B55',
      },
      fontFamily: {
        sans: [
          'Pretendard',
          'Noto Sans KR',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        caption: ['13px', { lineHeight: '18px' }],
        base: ['16px', { lineHeight: '24px' }],
        'card-title': ['19px', { lineHeight: '26px', fontWeight: '600' }],
        kpi: ['36px', { lineHeight: '42px', fontWeight: '700' }],
        'page-title': ['30px', { lineHeight: '38px', fontWeight: '700' }],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(0, 0, 56, 0.04)',
      },
    },
  },
  plugins: [],
}
