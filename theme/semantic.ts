import { defineSemanticTokens } from "@pandacss/dev";

export const semanticColors = defineSemanticTokens({
  outline: { value: "oklch(68.5% 0.169 237.323)" },
  border: {
    value: {
      base: "oklch(84% 0 0)",
      _dark: "oklch(32% 0 0)",
    },
  },
  primary: {
    DEFAULT: {
      value: {
        base: "{colors.indigo.600}",
        _dark: "{colors.indigo.500}",
      },
    },
    text: {
      value: {
        base: "{colors.neutral.50}",
        _dark: "{colors.neutral.950}",
      },
    },
  },
  secondary: {
    DEFAULT: {
      value: "{colors.violet.500}",
    },
    text: {
      value: "{colors.neutral.50}",
    },
  },
  background: {
    DEFAULT: {
      value: { base: "{colors.olive.50}", _dark: "{colors.olive.950}" },
    },
    text: {
      value: {
        base: "{colors.neutral.900}",
        _dark: "{colors.neutral.100}",
      },
    },
  },
  surface: {
    DEFAULT: {
      value: { base: "{colors.white}", _dark: "{colors.olive.900}" },
    },
    text: {
      value: {
        base: "{colors.neutral.950}",
        _dark: "{colors.neutral.50}",
      },
    },
  },
});
