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

type AsyncFunction<T, R> = (input: T) => Promise<R>;

export class AgentNode<T, R> {
    func: AsyncFunction<T, R> | null = null;
    next: AgentNode<R, any> | null = null;
    constructor() {
        this.func = null; // self exec function
        this.next = null; // next agent
    }

    setFunc(func: AsyncFunction<T, R>): this {
        this.func = func;
        return this; // allow chain
    }

    setNext<N>(nextAgent: AgentNode<R, N>): AgentNode<R, N> {
        this.next = nextAgent;
        return nextAgent; // allow chain
    }

    async execute(input: T): Promise<R> {
        if (!this.func) {
            throw new Error("Agent function is not defined.");
        }

        const result = await this.func(input);
        if (this.next) {
            return this.next.execute(result); // pass the result to the next Agent
        }
        return result; // if there are no next Agent, just return the result
    }
}
