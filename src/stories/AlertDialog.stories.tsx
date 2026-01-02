import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialog } from '../components/ui/atoms/AlertDialog';

const meta = {
  title: 'Atoms/AlertDialog',
  component: AlertDialog,
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <AlertDialog {...args} />,
  args: {
    title: 'Title',
    open: false,
    onClose: () => { },
    children: 'Body',
  },
};

export const Open: Story = {
  render: (args) => <AlertDialog {...args} />,
  args: {
    ...Playground.args,
    open: true,
  },
};

export const WithActionButtons: Story = {
  render: (args) => <AlertDialog {...args} />,
  args: {
    ...Playground.args,
    open: true,
    actionButtons: (
      <>
        <button>Cancel</button>
        <button>OK</button>
      </>
    ),
  },
};