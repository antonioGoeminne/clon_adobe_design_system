import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "../components/ui/atoms/Divider";

const meta = {
    title: 'Atoms/Divider',
    component: Divider,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { size: 'small' },
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large'],
        },
    }

} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
    args: {
        size: 'small',
    },
    render: (args) => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            width: '80vw',
        }}>
            <Divider {...args} />
            <span>example</span>
        </div>
    ),
};

export const Medium: Story = {
    args: {
        size: 'medium',
    },
    render: (args) => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            width: '80vw',
        }}>
            <Divider {...args} />
            <span>example</span>
        </div>
    ),
};


export const Large: Story = {
    args: {
        size: 'large',
    },
    render: (args) => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            width: '80vw',
        }}>
            <Divider {...args} />
            <span>example</span>
        </div>
    ),
};
