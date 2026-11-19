import { defineRecipe } from "../../utils/define-recipe";

export const button = defineRecipe({
  className: "button",
  description: "Styles for the Button component",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minBlockSize: "ui",
    py: "1.25ex",
    px: "2ch",
    rounded: "xl",
    fontWeight: "semibold",
    letterSpacing: "loose",
    lineHeight: "flat",
    fontFamily: "inter",
    userSelect: "none",
    borderWidth: "2px",
    borderStyle: "solid",
    outline: "none",
    _focusVisible: {
      outline: "3px solid {colors.outline}",
      outlineOffset: "3px",
    },
    _disabled: { opacity: 0.5, cursor: "not-allowed" },
  },
  variants: {
    variant: {
      solid: {
        bg: "primary",
        color: "primary.text",
        borderColor: "indigo.700",
        _hover: { bg: "indigo.700" },
        _active: {
          bg: "indigo.700",
          scale: 0.95,
        },
      },
      outline: {
        bg: "violet.100",
        borderColor: "violet.700",
        color: "violet.700",
        _hover: { bg: "violet.200" },
        _active: {
          bg: "violet.200",
          scale: 0.95,
        },
      },
      ghost: {
        borderColor: "transparent",
        color: "indigo.700",
        _hover: { bg: "violet.100", borderColor: "violet.200" },
        _active: { bg: "violet.100", borderColor: "violet.200", scale: 0.95 },
      },
    },
    size: {
      sm: { fontSize: "sm" },
      md: { fontSize: "md" },
      lg: { fontSize: "lg" },
    },
  },
  defaultVariants: { variant: "solid", size: "md" },
});
