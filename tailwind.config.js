/** @type {import("tailwindcss").Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    safelist: ["blur-0", "blur-sm"],
    theme: {
        extend: {
            screens: {
                xs: "490px",
            },
            fontSize: {
                "body-sm": "0.8rem",
                "body-md": "0.9rem",
                body: "1rem",
                "body-xl": "1.1rem",
            },
            keyframes: {
                "card-grow": {
                    "0%": { height: "0rem" },
                    "50%": { height: "25rem" },
                    "100%": { height: "max-content" },
                },
                "card-shrink": {
                    "0%": { height: "max-content" },
                    "50%": { height: "25rem" },
                    "100%": { height: "0rem" },
                },
                appear: {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
                "blur-in": {
                    "0%": {
                        filter: "blur(0) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)",
                    },
                    "100%": {
                        filter: "blur(4px) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)",
                    },
                },
                "blur-out": {
                    "0%": {
                        filter: "blur(4px) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)",
                    },
                    "100%": {
                        filter: "blur(0) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)",
                    },
                },
                "move-from-bottom": {
                    "0%": { transform: "translate(-50%, 200%)" },
                    "100%": { transform: "translate(-50%, -50%)" },
                },
            },
            animation: {
                "card-grow": "card-grow 350ms ease-in-out",
                "card-shrink": "card-shrink 350ms ease-in-out",
                "blur-in": "blur-in 500ms ease-in-out",
                "blur-out": "blur-out 500ms ease-in-out",
                appear: "appear 500ms ease-in-out",
                "modal-in": "move-from-bottom 200ms ease-in-out",
            },
        },
    },
    plugins: [],
};
