import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Button } from '../components/ui/atoms/Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['accent', 'negative'],
    },
    style: {
      control: 'select',
      options: ['solid', 'outlined'],
    },
  },
  args: { onClick: fn(), disabled: false, variant: 'accent', style: 'solid' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    style: 'solid',
    children: 'Primary',
  },
};

export const Accent: Story = {
  args: {
    variant: 'accent',
    style: 'solid',
    children: 'Accent',
  },
};

export const Negative: Story = {
  args: {
    variant: 'negative',
    style: 'solid',
    children: 'Negative',
  },
};
