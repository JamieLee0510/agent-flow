import { AgentType, AsyncFunction } from "../types";

export class AgentNode<T, R> {
    func: AsyncFunction<T> | null = null;
    next: AgentNode<R, any> | null = null;
    agentType: AgentType | null = null;
    id: string;
    setCurrExecude: (id: string | null) => void;
    constructor(id: string, setCurrExecude: (id: string | null) => void) {
        this.func = null; // self exec function
        this.next = null; // next agent
        this.id = id;
        this.setCurrExecude = setCurrExecude;
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
        if (!this.func) {
            throw new Error("Agent function is not defined.");
        }
        this.setCurrExecude(this.id);
        const result = await this.func(input);
        this.setCurrExecude(null);
        if (this.next) {
            return this.next.execute(result); // pass the result to the next Agent
        }
        return result; // if there are no next Agent, just return the result
    }
}
