export enum AgentType {
    GPT = "GPT",
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

export type AsyncFunction<T> = (input: T) => Promise<any>;
