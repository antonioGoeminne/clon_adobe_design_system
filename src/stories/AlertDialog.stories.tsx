import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../components/ui/atoms/Button';
import { AlertDialog } from '../components/ui/atoms/AlertDialog';

const meta = {
  title: 'Atoms/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    children: { control: 'text' },
  },
  args: {
    title: 'Title',
    children: 'Description',
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ display: 'grid', gap: 16 }}>
        <Button onClick={() => setOpen(true)} variant="accent" style="solid">
          Open Dialog
        </Button>
        <AlertDialog
          open={open}
          onClose={() => setOpen(false)}
          {...args}
        />
      </div>
    );
  },
};

export const Open: Story = {
  args: {
    // Controlled open state for quick visual test
  },
  render: (args) => (
    <AlertDialog open onClose={() => { }} {...args} />
  ),
};