import { create } from "zustand";

export interface Option {
    value: string;
    label: string;
    disable?: boolean;
    /** fixed option that can't be removed. */
    fixed?: boolean;
    /** Group the options by providing key. */
    [key: string]: string | boolean | undefined;
}

type SlackStore = {
    slackChannels: Option[];
    setSlackChannels: (slackChannels: Option[]) => void;
};

export const useSlackStore = create<SlackStore>()((set) => ({
    slackChannels: [],
    setSlackChannels: (slackChannels: Option[]) => set({ slackChannels }),
}));
