
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorWheel } from "../components/ui/atoms/ColorWheel/ColorWheel";

const meta = {
    title: "Atoms/ColorWheel",
    component: ColorWheel,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof ColorWheel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <div>
            <div
                style={{
                    background: "#f5f5f5",
                    color: "#333",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    marginBottom: "16px",
                    fontSize: "15px",
                    fontWeight: 500,
                    border: "1px solid #e0e0e0",
                    maxWidth: 400,
                }}
            >
                Puedes usar <b>Tab</b> para enfocar y las <b>flechas</b> para navegar el selector de color.
            </div>
            <ColorWheel {...args} />
        </div>
    ),
    args: {
        size: 200,
        defaultValue: 0,
        isDisabled: false,
        "aria-label": "Color wheel",
    },
};