import path from "path";

import { defineConfig, loadEnv } from "vite";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from 'vite-plugin-svgr';



const STRICT_MODE = process.env.STRICT_MODE === '1';
const OPEN_SOURCE_URL = process.env.OPEN_SOURCE_URL;


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
  ],
	define: {
		__STRICT_MODE__: JSON.stringify(STRICT_MODE),
    __OPEN_SOURCE_URL__: JSON.stringify(OPEN_SOURCE_URL),
	},
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});