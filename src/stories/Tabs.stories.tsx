
import type { Meta } from "@storybook/react-vite";
import { Tabs } from "../components/ui/atoms/Tabs";
import DownloadIcon from "../assets/icons/DownloadIcon";


const meta = {
    title: "Atoms/Tabs",
    component: Tabs,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;

export const Default = {
    render: (args) => <Tabs {...args} items={[
        {
            value: 'tab1',
            label: 'Tab 1',

        },
        {
            value: 'tab2',
            label: 'Tab 2',
        },
        {
            value: 'tab3',
            label: 'Tab 3',
        },
    ]} />,
}

export const WithIcon = {
    render: (args) => <Tabs {...args} items={[
        {
            value: 'tab1',
            label: 'Tab 1',
            icon: <DownloadIcon style={{ width: 16, height: 16 }} />,
        },
        {
            value: 'tab2',
            label: 'Tab 2',
            icon: <DownloadIcon style={{ width: 16, height: 16 }} />,
        },
        {
            value: 'tab3',
            label: 'Tab 3',
            icon: <DownloadIcon style={{ width: 16, height: 16 }} />,
        },
    ]} />,
}