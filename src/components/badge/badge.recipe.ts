import { defineRecipe } from "../../utils/define-recipe";

export const badge = defineRecipe({
  className: "badge",
  description: "Styles for the Badge component",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "full",
    border: "1px solid",
    px: "2ch",
    py: "0.5ex",
    fontSize: "sm",
  },
  variants: {
    purpose: {
      neutral: {
        bg: "neutral.100",
        color: "neutral.800",
        borderColor: "neutral.400",
      },
      warning: {
        bg: "amber.100",
        color: "amber.800",
        borderColor: "amber.400",
      },
      success: {
        bg: "emerald.100",
        color: "emerald.800",
        borderColor: "emerald.400",
      },
      info: {
        bg: "violet.100",
        color: "violet.800",
        borderColor: "violet.400",
      },
      error: {
        bg: "rose.100",
        color: "rose.800",
        borderColor: "rose.400",
      },
    },
  },
  defaultVariants: {
    purpose: "neutral",
  },
});
