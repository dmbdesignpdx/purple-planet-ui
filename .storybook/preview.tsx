import { withThemeByClassName } from "@storybook/addon-themes";
import type { Decorator, Preview, ReactRenderer } from "@storybook/react-vite";
import { useEffect } from "react";
import { css } from "../styled-system/css";
import "../src/global.css";

const canvasClass = css({ bg: "background", color: "background.text" });

const withCanvasTokens: Decorator = (Story) => {
  useEffect(() => {
    const classes = canvasClass.split(" ");
    document.body.classList.add(...classes);
    return () => document.body.classList.remove(...classes);
  }, []);
  return <Story />;
};

const preview: Preview = {
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
  decorators: [
    withCanvasTokens,
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
