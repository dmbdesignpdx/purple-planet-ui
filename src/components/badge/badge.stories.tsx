import type { Meta, StoryObj } from "@storybook/react-vite";
// import { expect, within } from "storybook/test";
import { Badge } from "./badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  render: (args) => <Badge {...args}>Badge</Badge>,
};

export const info: Story = {
  render: (args) => (
    <Badge purpose="info" {...args}>
      Badge
    </Badge>
  ),
};

export const success: Story = {
  render: (args) => (
    <Badge purpose="success" {...args}>
      Badge
    </Badge>
  ),
};

export const warning: Story = {
  render: (args) => (
    <Badge purpose="warning" {...args}>
      Badge
    </Badge>
  ),
};

export const error: Story = {
  render: (args) => (
    <Badge purpose="error" {...args}>
      Badge
    </Badge>
  ),
};
