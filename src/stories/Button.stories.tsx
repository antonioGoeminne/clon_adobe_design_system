import type { Meta, StoryObj } from '@storybook/react-vite';
import downloadIcon from '../assets/icons/download.svg';

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
      options: ['primary', 'accent', 'negative'],
    },
    style: {
      control: 'select',
      options: ['solid', 'outlined'],
    },
    size: {
      control: 'select',
      options: ['default', 'icon'],
    },
    children: { control: 'text' },
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

export const WithChildren: Story = {
  args: {
    style: 'solid',
    variant: 'accent',
    size: 'icon',
    asChild: true,
    children: <img src={downloadIcon} style={{ width: 40 }} alt="download" />,
  },
};