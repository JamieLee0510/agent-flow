import { AgentType } from "../types";
import { AgentNode } from "./base-agent";

export class TriggerAgentNode<T = any, R = any> extends AgentNode<T, R> {
    agentType = AgentType.Trigger;
    constructor(
        triggerText: string,
        id: string,
        setCurrExecude: (id: string | null) => void,
    ) {
        super(id, setCurrExecude);
        this.setFunc(
            (_) =>
                new Promise((resolve, _) =>
                    setTimeout(() => resolve(triggerText), 1000),
                ),
        );
    }
}
