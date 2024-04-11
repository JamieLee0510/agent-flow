import { postMessageToGpt } from "@/app/(main)/agentflows/edit/[flowID]/_action/gpt-action";
import { AgentNode } from "./base-agent";
import { AgentType } from "../types";

export class GptAgentNode<T = any, R = any> extends AgentNode<T, R> {
    agentType = AgentType.GPT;
    constructor(systemPrmpt: string) {
        super();
        this.setFunc((userPrompt) => postMessageToGpt(systemPrmpt, userPrompt));
    }
}
