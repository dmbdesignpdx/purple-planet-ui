import { defineSlotRecipe } from "../../utils/define-recipe";

export const card = defineSlotRecipe({
  className: "card",
  slots: ["root", "header", "footer", "body"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      p: "md",
      bg: "surface",
      color: "surface.text",
      rounded: "xl",
      border: "1px solid",
      borderColor: "border",
      gap: "md",
      shadow: "0 2px 5px rgb(0 0 20 / .1)",
    },
    header: {
      "& :where(h2,h3,h4)": {
        fontSize: "xl",
        fontWeight: "bold",
        textAlign: "left",
        marginBlockStart: "0.25ex",
        textBox: "trim-both cap alphabetic",
      },
    },
    body: {
      "& img": {
        inlineSize: "100%",
        blockSize: "auto",
        aspectRatio: "16/10",
        objectFit: "cover",
        rounded: "md",
      },
    },
    footer: { display: "flex", flexWrap: "wrap" },
  },
});
