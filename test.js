class Agent {
    constructor() {
        this.func = null; // self exec function
        this.next = null; // next agent
    }

    setFunc(asyncFunction) {
        this.func = asyncFunction;
        return this; // allow chain
    }

    setNext(nextAgent) {
        this.next = nextAgent;
        return this; // allow chain
    }

    async execute(input) {
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

// 定义异步函数
const asyncFunc1 = (content) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(content + " from asyncFunc1");
        }, 1000);
    });

const asyncFunc2 = (content) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(content + " from asyncFunc2");
        }, 1000);
    });

// 实例化Agent并设置其函数和下一个Agent
const agentA = new Agent().setFunc(asyncFunc1);
const agentB = new Agent().setFunc(asyncFunc2);

agentA.setNext(agentB); // 设置agentA的下一个执行者为agentB

// 启动执行链
agentA.execute("Initial content").then((result) => {
    console.log(result); // 输出最终结果
});
