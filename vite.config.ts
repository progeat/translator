import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		proxy: {
			'/yandex-translate-api': {
				target: 'https://translate.api.cloud.yandex.net',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/yandex-translate-api/, ''),
			},
			'/yandex-tts-api': {
				target: 'https://tts.api.cloud.yandex.net',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/yandex-tts-api/, ''),
				secure: true,
			},
		},
	},
});
