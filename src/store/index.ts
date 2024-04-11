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

type ConnectionStore = {
    slackAccessToken: string;
    setSlackAccessToken: (slackAccessToken: string) => void;
    openaiKey: string;
    setOpenaiKey: (openaiKey: string) => void;
};

// TODO: if DB, should save in DB
// 應該沒辦法用store來看有沒有connected，因為是跨頁面的，不是同一個路由下
// 所以應急的話，就先用sesstion storage之類的；
export const useConnectionStore = create<ConnectionStore>()((set) => ({
    slackAccessToken: "",
    setSlackAccessToken: (slackAccessToken: string) =>
        set({ slackAccessToken }),
    openaiKey: "",
    setOpenaiKey: (openaiKey: string) => set({ openaiKey }),
}));
