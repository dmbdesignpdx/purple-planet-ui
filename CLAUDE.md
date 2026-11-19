# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A React component library / design system, developed and documented in Storybook (Vite) and styled with Panda CSS. It was scaffolded with Create Next App, but the Next.js app has been removed (`src/app` and `next.config.ts` are gone). Treat it as a Storybook-only project. `README.md` is just a title stub, so it has no setup guidance.

The library is early. Two components serve as templates for new ones: `Button` (a single recipe) and `Card` (a slot recipe). Both are exported from `src/index.ts`.

## Commands

Package manager is **bun** (`bun.lock`, `packageManager: bun@1.4.4`).

```bash
bun run dev           # Storybook dev server on :6006
bun run build         # static build -> storybook-static/
bun run codegen       # panda codegen -> regenerates ./styled-system
bun run lint          # biome check (lint + import ordering)
bun run format        # biome format --write
```

- **Tests** are Storybook stories run through Vitest in headless Chromium (Playwright), configured in `vitest.config.ts` via `storybookTest` from `@storybook/addon-vitest`. There is no `test` script. Run `bunx vitest run` (all) or `bunx vitest run --project storybook -t "<story name>"` (single story). The Playwright browser must be installed first with `bunx playwright install chromium`.
- No typecheck script; use `bunx tsc --noEmit`. It should currently pass with no errors, so treat any output as a real problem. Run `bun run codegen` first if `panda.config.ts` or a recipe changed. Stale generated types in `styled-system/` produce false errors.
- Biome ignores `styled-system`, `.claude` and `.storybook`, so `bun run lint` doesn't cover them.
- `cspell.json` holds the project dictionary; add new technical terms there.
- `vite.config.ts` also holds a library build config (entry `src/index.ts`, ES format, with `react`, `react-dom` and `@ark-ui/react` external) that outputs `dist/design-system.js`. No package script runs it, and `dist/` is committed.

## Styling architecture (Panda CSS)

- `panda.config.ts` uses only the `@pandacss/preset-base` preset, with `preflight: true`. `@pandacss/preset-panda` is installed but not listed in `presets`, so Panda's default colour palette is **not** available. It scans `theme/**/*.ts`, `src/**/*.{ts,tsx}` and `.storybook/**/*.{ts,tsx}`, and writes to `styled-system/`. The JSX framework is `react`. The `optimize` options are on, so unused tokens and keyframes are removed from the output.
- Design tokens live in `theme/`, one file per category (colours, fonts, sizes, spacing, radii, text styles), re-exported from `theme/index.ts` and wired into `theme.extend` in `panda.config.ts`. Add new tokens there, not inline in the config.
  - Primitive colours are `indigo`, `violet`, `olive` and `neutral` (50–950), plus `white` and `black`.
  - Semantic colours are in `theme/semantic.ts`: `outline`, `primary`, `secondary`, `background` and `surface`. Everything except `outline` has a `DEFAULT` and a `text` variant, and values that differ by theme use `{ base, _dark }`. Components consume them by name, for example `bg: "primary"` and `color: "primary.text"`.
  - The Inter variable font is `src/fonts/Inter.ttf`, declared through `globalFontface` and exposed as the `inter` font token (`--font-inter`).
- `styled-system/` is **generated** output and git-ignored. It must exist before components import from it (`../../styled-system/css`, `../../styled-system/types`, `../../styled-system/jsx`). Re-run `bun run codegen` after changing `panda.config.ts` or a recipe, and on a fresh checkout. The `@pandacss/vite` plugin in `vite.config.ts` keeps it current while Storybook runs. Read the codegen output, because Panda reports config mistakes there as warnings.
- `src/global.css` only declares the cascade layers: `@layer reset, base, tokens, recipes, utilities;`. Panda's generated CSS is injected through the PostCSS plugin (`postcss.config.cjs`, which uses `@pandacss/dev/postcss`) and the Vite plugin.
- Dark mode is class-based. The Storybook theme switcher (`withThemeByClassName` from `@storybook/addon-themes`, in `.storybook/preview.tsx`) adds a `dark` class to the root for dark mode. The light theme adds no class. Panda's `_dark` condition must match the `dark` class.
- `.storybook/preview.tsx` also applies the `background` and `background.text` tokens to `document.body` through a decorator, so every story gets the canvas colours.

## Components and recipes

Each component lives in `src/components/<name>/` as `<name>.recipe.ts` (styles), `<name>.tsx` (component) and `<name>.stories.tsx`. Headless behaviour comes from Ark UI (`@ark-ui/react/factory`), styled by the recipe. Export new components from `src/index.ts`.

### Writing a recipe

Define recipes with `defineRecipe` (single recipe) or `defineSlotRecipe` (multi-part), both from `src/utils/define-recipe.ts`. Give every recipe a `className`; `description` is optional.

```ts
export const button = defineRecipe({
  className: "button",
  base: { /* ... */ },
  variants: { variant: { solid: { /* ... */ } } },
  defaultVariants: { variant: "solid" },
});
```

- The helpers are identity functions that type-check the recipe against the generated, token-aware types in `styled-system/types`, plus Panda's config metadata (`className`, `description`, `jsx`, `staticCss`). The combined types, `RecipeConfig` and `SlotRecipeConfig`, are in `src/utils/recipe-types.ts`.
- Typos are caught in the recipe itself: a variant value in `defaultVariants` or `compoundVariants` that doesn't exist, a slot key that isn't in `slots`, an unknown top-level key, and a missing `className`.
- Don't import `RecipeConfig`, `defineRecipe` or `defineSlotRecipe` from `@pandacss/dev` for component recipes. Panda's own types use its generic style types, not the token-aware ones.
- Don't wrap the result in `satisfies` or annotate it as `RecipeConfig<T>`. The helpers return the literal config type on purpose. The generated `SystemStyleObject` is an interface, so an annotated `RecipeConfig<T>` isn't assignable to Panda's `defineConfig` types. Plain `satisfies RecipeConfig` can't infer the variants, so it doesn't check `defaultVariants`.
- `panda.config.ts` imports the recipe files, so `define-recipe.ts` and the recipe files must not import anything at runtime from `styled-system/`, which may not exist yet on a fresh checkout. Type-only imports are fine.

### Registering a recipe

Register recipes in `theme` in `panda.config.ts`, and use the right bucket:

- Single recipes go in `theme.recipes`, for example `recipes: { button }`.
- Slot recipes go in `theme.slotRecipes`, for example `slotRecipes: { card }`.

The types don't catch the wrong bucket. A slot recipe in `recipes` compiles, but codegen warns that a slot name (such as `root`) "is not a condition or selector", and its styles never apply.

### Using a recipe

- `Button` passes the recipe to the generated factory: `styled(ark.button, button)` from `styled-system/jsx`.
- `Card` uses `createSlotRecipeContext(card)` from `styled-system/jsx`, then builds `Card.Root`, `Card.Header` and so on with `withProvider` (root) and `withContext` (the other slots).

## Storybook

- `.storybook/main.ts` uses the `@storybook/react-vite` framework. It picks up `../src/components/**/*.stories.@(ts|tsx)` and enables these addons: `@chromatic-com/storybook`, `@storybook/addon-vitest`, `@storybook/addon-mcp`, `@storybook/addon-themes`, `@storybook/addon-docs` and `@storybook/addon-a11y`.
- `.storybook/preview.tsx` sets `a11y: { test: "error" }`, so accessibility violations fail the Vitest story tests. Stories use `layout: "centered"`.
- Stories use CSF3 with `satisfies Meta<typeof X>`, the `autodocs` tag, the title `Components/<Name>`, and `fn()` from `storybook/test` for event-handler args.
- `.claude/launch.json` holds the dev-server configuration for the preview tools.

## Dependencies worth knowing

- React 19 (`react` and `react-dom` 19.3.0), Vite 8, Storybook 10, Vitest 4, Panda CSS 2 (2.6), Ark UI 5.
- `package.json` sets `ignoreScripts` and `trustedDependencies` for `sharp` and `unrs-resolver`. Don't remove these without checking why they're there.
- `package.json` `exports` maps `./css`, `./recipes`, `./patterns`, `./jsx`, `./tokens`, `./helpers` and `./types` to `styled-system/`, so consumers import the generated Panda output through this package.
