import { defineGlobalFontface, defineTokens } from "@pandacss/dev";

export const inter = defineGlobalFontface({
  Inter: {
    src: "url(/src/fonts/Inter.ttf) format('truetype') tech(variations)",
    fontWeight: "400 900",
    fontStyle: "normal",
    fontDisplay: "swap",
  },
});

export const fonts = defineTokens({
  inter: { value: "var(--font-inter)" },
  serif: { value: "Georgia, sans" },
  mono: { value: "Menlo, monospace" },
});

export const fontWeights = defineTokens({
  normal: { value: 400 },
  medium: { value: 500 },
  semibold: { value: 600 },
  bold: { value: 700 },
  extrabold: { value: 800 },
  black: { value: 900 },
});

export const fontSizes = defineTokens({
  xs: { value: "0.75rem" },
  sm: { value: "0.875rem" },
  md: { value: "1rem" },
  lg: { value: "1.125rem" },
  xl: { value: "1.25rem" },
  "2xl": { value: "1.5rem" },
  "3xl": { value: "1.875rem" },
});

export const letterSpacings = defineTokens({
  tight: { value: "-0.03ch" },
  loose: { value: "0.03ch" },
  wide: { value: "0.06ch" },
  wider: { value: "0.1ch" },
});

export const lineHeights = defineTokens({
  flat: { value: "1" },
  short: { value: "1.2" },
  base: { value: "1.5" },
  tall: { value: "1.8" },
});
