module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			keyframes: {
				shake: {
					'0%, 100%': { transform: 'translateX(0)' },
					'25%': { transform: 'translateX(-2px)' },
					'75%': { transform: 'translateX(2px)' },
				},
			},
			animation: {
				shake: 'shake 0.6s infinite ease-in-out',
			},
		},
	},
}