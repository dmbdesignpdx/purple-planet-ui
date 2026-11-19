import { defineTextStyles } from "@pandacss/dev";

export const textStyles = defineTextStyles({
  body: {
    description: "The body text style - used in paragraphs",
    value: {
      fontFamily: "sans",
      fontWeight: "medium",
      fontSize: "md",
      lineHeight: "base",
      letterSpacing: "loose",
      textDecoration: "none",
      textTransform: "none",
    },
  },
});
