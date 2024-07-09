/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				'.no-spinner': {
					'&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
						'-webkit-appearance': 'none',
						margin: '0'
					},
					'&[type="number"]': {
						'-moz-appearance': 'textfield'
					}
				},
				'.caret-thick': {
					position: 'relative',
					'&::before': {
						content: '""',
						position: 'absolute',
						width: '2px', // Adjust thickness as needed
						height: '80%', // Adjust height as needed
						backgroundColor: 'gray', // Adjust color as needed
						top: '10%', // Adjust position to center vertically
						left: '0',
						right: '0',
						margin: 'auto',
						zIndex: '1' // Ensure the caret is above the text
					}
				}
			});
		}
	]
};
