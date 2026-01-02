import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialog } from '../components/ui/atoms/AlertDialog/AlertDialog';

const meta = {
  title: 'Atoms/AlertDialog',
  component: AlertDialog,
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  title: 'Title',
  open: false,
  onClose: () => { },
  children: 'Body',
}

export const Open: Story = {
  render: (args) => <AlertDialog {...args} />,
  args: {
    ...defaultArgs,
    open: true,
  },
};

export const WithActionButtons: Story = {
  render: (args) => <AlertDialog {...args} />,
  args: {
    ...defaultArgs,
    open: true,
    actionButtons: (
      <>
        <button>Cancel</button>
        <button>OK</button>
      </>
    ),
  },
};