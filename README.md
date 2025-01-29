# BuN: React + TypeScript + Vite + Tailwind for Enefit

### By Robert Efros

## Description

And again as I had noted in backend assignment part, I had little time this week for this assignment, so I had to use my
previous projects with similar premise for it.

Thus, this app is an unholy amalgamation of a variety of my previous projects that used this stack, and commit history
of me removing some stuff proves this statement right.

Otherwise, I tried my best to salvage what I could and made a somewhat alright demo app all things considered.

What I did:

- Major flow of the application follows API 1 to 1 with a little extra
- Somewhat bearable responsive design using tailwind, and it's not great simply due to the chart.js's tendency to be
  very picky with how it renders graphs and charts
- Login session retention through localstorage. Not the most secure solution, but it's not even tokenized anyway.
- Showcase of graphed date per Metering points per user

What I didn't really do that well:

- Error handling is lacking in all the wrong places, especially login screen.

*Could be worse*

## Running locally

Node v21-22

In this project I used bun because it's just faster on Linux. But should still be possible to run it using <code>
yarn</code>

It also uses <code>tailwind</code>, so this also constitutes and additional step of first running in a separate
terminal <code>bun run tw:
watch</code> for development in order for it to fill the css file as you go.

Otherwise, it's standard pre-production React application.

1. <code>bun install</code> to install dependancies
2. (**IN SEPARATE TERMINAL**) <code>bun run tw:watch</code> to keep rebuilding tailwind files
3. <code>bun run dev</code> to run it against localhost

If you run it against my backend, deployed locally (which this app already setup for), then I recommend logging as
either <code>testuser</code> or <code>testuser2</code>. Both of them have <code>admin</code> for password.

Those users have all of the necessary testing data pre-made through database migrations on startup.

New user can be registered with this solution, but those won't have any data linked to them unless you go into the pgsql
db yourself and add it.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
    languageOptions: {
        // other options...
        parserOptions: {
            project: ["./tsconfig.node.json", "./tsconfig.app.json"],
            tsconfigRootDir: import.meta.dirname,
        },
    },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or
  `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
    // Set the react version
    settings: { react: { version: "18.3" } },
    plugins: {
        // Add the react plugin
        react,
    },
    rules: {
        // other rules...
        // Enable its recommended rules
        ...react.configs.recommended.rules,
        ...react.configs["jsx-runtime"].rules,
    },
});
```
