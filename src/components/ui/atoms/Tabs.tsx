
import { useCallback, useId, useLayoutEffect, useState, type CSSProperties } from 'react';

interface TabItem {
    label: string;
    value: string;
    panel?: React.ReactNode;
    icon?: React.ReactNode;
}

interface TabsProps {
    defaultValue?: string;
    items: TabItem[];
}


function getTabListItemId(tabsId: string, value: string) {
    return tabsId + '-tab-' + value;
}


function getTabPanelId(tabsId: string, value: string) {
    return tabsId + '-tabpanel-' + value;
}


export const Tabs: React.FC<TabsProps> = ({ defaultValue, items }) => {
    const tabsId = useId();
    const [value, setValue] = useState<string>(
        defaultValue ?? items[0].value,
    );
    const [selectedTabNode, setSelectedTabNode] = useState<HTMLElement | null>(null);

    function setValueViaIndex(index: number) {
        const newValue = items[index].value;
        setValue(newValue);
        const el = document.getElementById(getTabListItemId(tabsId, newValue));
        if (el) {
            (el as HTMLElement).focus();
        }
    }

    // Update selectedTabNode when value changes
    useLayoutEffect(() => {
        const el = document.getElementById(getTabListItemId(tabsId, value));
        if (el) setSelectedTabNode(el as HTMLElement);
    }, [value, tabsId]);

    return (
        <div className="flex flex-col gap-4">
            <div
                className="bg-white flex items-center gap-7 relative"
                role="tablist"
                style={{ minHeight: 40 }}
                onKeyDown={(event) => {
                    switch (event.code) {
                        case 'ArrowLeft': {
                            const index = items.findIndex(
                                ({ value: itemValue }) =>
                                    itemValue === value,
                            );
                            setValueViaIndex(
                                (index - 1 + items.length) % items.length,
                            );
                            break;
                        }
                        case 'ArrowRight': {
                            const index = items.findIndex(
                                ({ value: itemValue }) =>
                                    itemValue === value,
                            );
                            setValueViaIndex((index + 1) % items.length);
                            break;
                        }
                        case 'Home': {
                            setValueViaIndex(0);
                            break;
                        }
                        case 'End': {
                            setValueViaIndex(items.length - 1);
                            break;
                        }
                        default:
                            break;
                    }
                }}>
                {items.map(({ label, value: itemValue, icon }) => {
                    const isActive = itemValue === value;

                    return (
                        <TabItem
                            key={itemValue}
                            id={getTabListItemId(tabsId, itemValue)}
                            type="button"
                            onClick={() => {
                                setValue(itemValue);
                            }}
                            role="tab"
                            isActive={isActive}
                            aria-controls={getTabPanelId(
                                tabsId,
                                itemValue,
                            )}
                            label={label}
                            icon={icon}
                        />
                    );
                })}
                <TabLine selectedTab={selectedTabNode} />
            </div>
            <div>
                {items.map(({ panel, value: itemValue }) => (
                    <div
                        key={itemValue}
                        tabIndex={0}
                        id={getTabPanelId(tabsId, itemValue)}
                        aria-labelledby={getTabListItemId(
                            tabsId,
                            itemValue,
                        )}
                        role="tabpanel"
                        hidden={itemValue !== value}>
                        {panel}
                    </div>
                ))}
            </div>
        </div>
    );
}

interface TabItemProps extends React.HTMLAttributes<HTMLButtonElement> {
    id: string;
    isActive: boolean;
    label: string;
    icon?: React.ReactNode;
    [key: string]: unknown;
}

const TabItem = ({ isActive, label, icon, ...props }: TabItemProps) => {
    return (
        <button
            type="button"
            className={'mb-5 p-1 text-body-s focus:outline-blue-800 flex items-center gap-1'}
            role="tab"
            tabIndex={isActive ? 0 : -1}
            aria-selected={isActive}
            {...props}
        >
            {icon && <span className="mr-1 flex items-center">{icon}</span>}
            {label}
        </button>
    )
}

const TabLine = ({ selectedTab }: { selectedTab: HTMLElement | null }) => {
    const [style, setStyle] = useState<CSSProperties>({
        width: undefined,
        height: undefined,
        transform: undefined
    });

    const onResize = useCallback(() => {
        if (!selectedTab) {
            setStyle({ width: undefined, height: undefined, transform: undefined });
            return;
        }
        const offset = selectedTab.offsetLeft;
        const width = selectedTab.offsetWidth;
        setStyle({
            transform: `translateX(${offset}px)`,
            width: `${width}px`,
        });
    }, [selectedTab]);

    useLayoutEffect(() => {
        onResize();
        // También escucha resize de ventana para mantener la línea alineada
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [onResize]);

    return (
        <>
            <div className='w-full absolute bg-gray-300 h-0.5 bottom-0 rounded-full' />
            <div
                className="bg-gray-900 h-0.5 transition-transform duration-300 absolute left-0 bottom-0 rounded-full"
                style={style}
            />
        </>

    );
}