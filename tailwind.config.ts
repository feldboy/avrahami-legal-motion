
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'playfair': ['Playfair Display', 'serif'],
				'assistant': ['Assistant', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				// Custom luxury color palette
				navy: {
					50: '#f0f2f5',
					100: '#d1d9e3',
					200: '#a3b3c7',
					300: '#758dab',
					400: '#47678f',
					500: '#1a4173',
					600: '#15345c',
					700: '#102845',
					800: '#0a1931', // Main navy
					900: '#051018',
				},
				gold: {
					50: '#fdfcf7',
					100: '#f9f5e8',
					200: '#f1e7c4',
					300: '#e9d9a0',
					400: '#e1cb7c',
					500: '#d9bd58',
					600: '#cda434', // Main gold
					700: '#b08d57',
					800: '#8a6d3a',
					900: '#644d1d',
				},
				primary: {
					DEFAULT: '#0a1931', // Navy
					foreground: '#ffffff'
				},
				secondary: {
					DEFAULT: '#cda434', // Gold
					foreground: '#0a1931'
				},
				accent: {
					DEFAULT: '#f8f0e3',
					foreground: '#0a1931'
				},
				muted: {
					DEFAULT: '#f1f5f9',
					foreground: '#64748b'
				},
				destructive: {
					DEFAULT: '#ef4444',
					foreground: '#ffffff'
				},
				card: {
					DEFAULT: '#ffffff',
					foreground: '#0a1931'
				},
				popover: {
					DEFAULT: '#ffffff',
					foreground: '#0a1931'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				// Enhanced animations
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in-down': {
					'0%': {
						opacity: '0',
						transform: 'translateY(-30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in-right': {
					'0%': {
						opacity: '0',
						transform: 'translateX(50px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'slide-in-left': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-50px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.9)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'bounce-gentle': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px rgba(205, 164, 52, 0.3)'
					},
					'50%': {
						boxShadow: '0 0 30px rgba(205, 164, 52, 0.6)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				}
			},
			animation: {
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'fade-in-down': 'fade-in-down 0.6s ease-out',
				'slide-in-right': 'slide-in-right 0.6s ease-out',
				'slide-in-left': 'slide-in-left 0.6s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
