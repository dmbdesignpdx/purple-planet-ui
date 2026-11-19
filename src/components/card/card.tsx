import { ark } from "@ark-ui/react/factory";
import { createSlotRecipeContext } from "../../../styled-system/jsx";

import { card } from "../../../styled-system/recipes";

const { withContext, withProvider } = createSlotRecipeContext(card);

export const Card = {
  Root: withProvider(ark.article, "root"),
  Header: withContext(ark.header, "header"),
  Footer: withContext(ark.footer, "footer"),
  Body: withContext(ark.div, "body"),
};

export type CardProps = React.ComponentProps<(typeof Card)["Root"]>;
