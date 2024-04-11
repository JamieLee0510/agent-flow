import { AgentType } from "../types";
import { AgentNode } from "./base-agent";

export class TriggerAgentNode<T = any, R = any> extends AgentNode<T, R> {
    agentType = AgentType.Trigger;
    constructor(triggerText: string) {
        super();
        this.setFunc((_) => new Promise((resolve, _) => resolve(triggerText)));
    }
}
