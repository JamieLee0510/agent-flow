import { Option } from "@/components/ui/multiple-selector";
import {
    getChannelList,
    postMessageInSlackChannel,
} from "@/app/_services/slack";
import { AgentType } from "./types";

export const fetchBotSlackChannels = async (
    token: string,
    setSlackChannels: (slackChannels: Option[]) => void,
) => {
    await getChannelList(token)?.then((channels) => setSlackChannels(channels));
};

export const onDragStart = (event: any, nodeType: AgentType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
};
