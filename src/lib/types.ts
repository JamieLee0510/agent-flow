export enum AgentType {
    LLM = "LLM",
    Slack = "Slack",
    Trigger = "Trigger",
    Email = "Email",
    Condition = "Condition",
}

export type EditorNodeType = {
    id: string;
    type: AgentType;
    position: {
        x: number;
        y: number;
    };

    data: any; // TODO:
};
