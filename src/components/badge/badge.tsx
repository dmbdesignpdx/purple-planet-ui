import { ark } from "@ark-ui/react/factory";
import { styled } from "../../../styled-system/jsx";
import { badge } from "../../../styled-system/recipes";

export const Badge = styled(ark.span, badge);

export type BadgeProps = React.ComponentProps<typeof Badge>;
