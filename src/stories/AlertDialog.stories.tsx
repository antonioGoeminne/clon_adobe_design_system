// @ts-nocheck it fails to render useState
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

export const Playground: Story = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="accent" style="solid">
        Open Dialog
      </Button>
      <AlertDialog
        open={open}
        {...args}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export const Open: Story = (args) => (
  <AlertDialog open {...args} onClose={() => { }} />
);

export const WithActionButtons: Story = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="accent" style="solid">
        Open Dialog
      </Button>
      <AlertDialog
        open={open}
        {...args}
        actionButtons={
          <Button variant="accent" style="solid" onClick={() => setOpen(false)}>
            Confirm
          </Button>
        }
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export const LongContent: Story = {
  args: {
    title: 'Title',
    open: true,
    onClose: () => { },
    children: (
      <div>
        {Array.from({ length: 30 }).map((_, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at ante justo. Cras faucibus eros sit amet lorem aliquam tempor. Duis placerat ac nisi eget hendrerit. Aenean tincidunt pretium aliquam.
          </p>
        ))}
      </div>
    ),
  },
};