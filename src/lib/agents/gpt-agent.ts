import { postMessageToGpt } from "@/app/(main)/agentflows/edit/[flowID]/_action/gpt-action";
import { AgentNode } from "./base-agent";
import { AgentType } from "../types";

export class GptAgentNode<T = any, R = any> extends AgentNode<T, R> {
    agentType = AgentType.GPT;
    constructor(
        systemPrmpt: string,
        openaiKey: string,
        id: string,
        setCurrExecude: (id: string | null) => void,
    ) {
        super(id, setCurrExecude);
        this.setFunc((userPrompt) =>
            postMessageToGpt(systemPrmpt, userPrompt, openaiKey),
        );
    }
}
