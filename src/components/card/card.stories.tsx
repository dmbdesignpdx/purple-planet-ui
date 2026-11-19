import type { Meta, StoryObj } from "@storybook/react-vite";
// import { expect, fn, userEvent, within } from "storybook/test";
import { Card } from "./card";

const meta = {
  title: "Components/Card",
  component: Card.Root,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  render: (args) => (
    <Card.Root {...args}>
      <Card.Header>
        <h2>Card Component</h2>
      </Card.Header>
      <Card.Body>
        <img src="https://picsum.photos/id/237/400/300" alt="" />
      </Card.Body>
      <Card.Footer>
        <p>Footer for the card.</p>
      </Card.Footer>
    </Card.Root>
  ),
};
