import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "./button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: { onClick: fn() },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["solid", "outline", "ghost"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const solid: Story = {
  render: (args) => (
    <Button type="button" {...args}>
      Button
    </Button>
  ),
};

export const outline: Story = {
  render: (args) => (
    <Button {...args} variant="outline">
      Button
    </Button>
  ),
};

export const ghost: Story = {
  render: (args) => (
    <Button {...args} variant="ghost">
      Button
    </Button>
  ),
};

export const sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const disabled: Story = {
  args: { disabled: true, children: "Button" },
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const clickable: Story = {
  args: { children: "Button" },
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Button" }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const keyboardActivation: Story = {
  args: { children: "Button" },
  play: async ({ canvasElement, args }) => {
    await userEvent.tab();
    await expect(within(canvasElement).getByRole("button")).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
