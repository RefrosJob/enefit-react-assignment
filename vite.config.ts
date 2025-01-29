/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/

export default defineConfig({
    plugins: [react(), svgr()],
    test: {
        globals: true,
        environment: "jsdom",
        exclude: ["node_modules"],
        setupFiles: ["./vitest.setup.ts"],
        alias: {
            "@/": new URL("./src/", import.meta.url).pathname,
        },
    },
});
