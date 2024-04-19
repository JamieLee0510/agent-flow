import { create } from "zustand";

export enum TabValue {
    Action = "Action",
    Settings = "Settings",
}

export type PanelContollStore = {
    tabValue: TabValue;
    setTabValue: (tab: TabValue) => void;
    isExecuting: boolean;
    isExecutingID: string | null;
    setIsExcuting: (isExecute: boolean) => void;
};

export const usePanelControllStore = create<PanelContollStore>((set, get) => ({
    tabValue: TabValue.Action,
    setTabValue: (tab: TabValue) => set({ tabValue: tab }),
    isExecuting: false,
    isExecutingID: null,
    setIsExcuting: (isExecuting: boolean) => set({ isExecuting }),
}));
