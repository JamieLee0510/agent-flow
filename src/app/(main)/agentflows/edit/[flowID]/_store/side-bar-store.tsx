import { create } from "zustand";

export enum TabValue {
    Action = "Action",
    Settings = "Settings",
}

export type SideBarStore = {
    tabValue: TabValue;
    setTabValue: (tab: TabValue) => void;
};

export const useSideBarStore = create<SideBarStore>((set, get) => ({
    tabValue: TabValue.Action,
    setTabValue: (tab: TabValue) => set({ tabValue: tab }),
}));
