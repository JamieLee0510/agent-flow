import { postMessageToSlack } from "@/app/(main)/agentflows/edit/[flowID]/_action/slack-actions";
import { AgentNode } from "./base-agent";
import { AgentType } from "../types";

export class SlackAgentNode<T = any, R = any> extends AgentNode<T, R> {
    agentType = AgentType.Slack;

    constructor(
        channelList: string[],
        accessToken: string,
        id: string,
        setCurrExecude: (id: string | null) => void,
    ) {
        super(id, setCurrExecude);

        const asyncFunction: (
            data: string,
        ) => Promise<{ message: string }> = async (data) => {
            return await postMessageToSlack(accessToken, channelList, data);
        };
        this.setFunc(asyncFunction);
    }
}
