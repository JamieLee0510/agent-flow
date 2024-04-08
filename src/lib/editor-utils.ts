import { Option } from "@/components/ui/multiple-selector";
import {
    getChannelList,
    postMessageInSlackChannel,
} from "@/app/_services/slack";

export const fetchBotSlackChannels = async (
    token: string,
    setSlackChannels: (slackChannels: Option[]) => void,
) => {
    await getChannelList(token)?.then((channels) => setSlackChannels(channels));
};
