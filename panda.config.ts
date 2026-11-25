import { defineConfig } from "@pandacss/dev";
import { badge } from "./src/components/badge/badge.recipe";
import { button } from "./src/components/button/button.recipe";
import { card } from "./src/components/card/card.recipe";
import {
  colors,
  fontSizes,
  fonts,
  fontWeights,
  inter,
  letterSpacings,
  lineHeights,
  radii,
  semanticColors,
  sizes,
  spacing,
  textStyles,
} from "./theme";

export default defineConfig({
  presets: ["@pandacss/preset-base"],
  preflight: true,
  include: [
    "./theme/**/*.ts",
    "./src/**/*.{ts,tsx}",
    "./.storybook/**/*.{ts,tsx}",
  ],
  exclude: [],
  outdir: "styled-system",
  optimize: {
    removeUnusedTokens: true,
    removeUnusedKeyframes: true,
    smartCompoundVariants: true,
    treeshakeDesignSystem: true,
  },
  minify: process.env.NODE_ENV === "production",
  jsxFramework: "react",
  globalFontface: { ...inter },
  globalVars: {
    "--font-inter": "Inter, sans-serif",
  },
  theme: {
    extend: {
      tokens: {
        colors,
        fonts,
        fontWeights,
        fontSizes,
        letterSpacings,
        lineHeights,
        sizes,
        spacing,
        radii,
      },
      semanticTokens: {
        colors: semanticColors,
      },
      textStyles,
    },
    recipes: { button, badge },
    slotRecipes: { card },
  },
});
