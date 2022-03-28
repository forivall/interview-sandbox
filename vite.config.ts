import type { UserConfig } from 'vite';
import react from '@vitejs/plugin-react';

/** @see https://vitejs.dev/config */
const config: UserConfig = {
  root: './src',
  publicDir: __dirname + '/public',
  plugins: [react()],
};

export default config;
