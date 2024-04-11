import { AgentType, AsyncFunction } from "../types";

export class AgentNode<T, R> {
    func: AsyncFunction<T> | null = null;
    next: AgentNode<R, any> | null = null;
    agentType: AgentType | null = null;
    constructor() {
        this.func = null; // self exec function
        this.next = null; // next agent
    }

    setFunc(func: AsyncFunction<any>): this {
        this.func = func;
        return this; // allow chain
    }

    setNext<N>(nextAgent: AgentNode<R, N>): AgentNode<R, N> {
        this.next = nextAgent;
        return nextAgent; // allow chain
    }

    async execute(input: T): Promise<R> {
        console.log("---while execute, agent type:", this.agentType);
        console.log("---while execute, get data:", input);
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
