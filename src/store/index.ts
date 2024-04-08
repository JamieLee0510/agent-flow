import { create } from "zustand";

interface Option {
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
    selectedSlackChannels: Option[];
    setSelectedSlackChannels: (selectedSlackChannels: Option[]) => void;
};

export const useSlackStore = create<SlackStore>()((set) => ({
    slackChannels: [],
    setSlackChannels: (slackChannels: Option[]) => set({ slackChannels }),
    selectedSlackChannels: [],
    setSelectedSlackChannels: (selectedSlackChannels: Option[]) =>
        set({ selectedSlackChannels }),
}));
