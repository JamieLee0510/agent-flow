import { GptAgentNode } from "@/lib/agents/gpt-agent";
import { SlackAgentNode } from "@/lib/agents/slack-agent";
import { TriggerAgentNode } from "@/lib/agents/trigger-agent";
import { AgentType } from "@/lib/types";
import { Edge, Node } from "reactflow";

export const executeAgentFlow = (flowNodes: Node[], flowEdges: Edge[]) => {
    const agentList: any[] = [];
    flowNodes.forEach((flowNode) => {
        switch (flowNode.type) {
            case AgentType.Trigger:
                const triggerAgent = new TriggerAgentNode(
                    flowNode.data.metadata.triggerText,
                );
                agentList.push(triggerAgent);
                break;
            case AgentType.GPT:
                const gptAgent = new GptAgentNode(
                    flowNode.data.metadata.systemPrompt,
                );
                agentList.push(gptAgent);
                break;
            case AgentType.Slack:
                const { selectedSlackChannels, slackToken } =
                    flowNode.data.metadata;
                const slackAgent = new SlackAgentNode(
                    selectedSlackChannels,
                    slackToken,
                );
                agentList.push(slackAgent);
                break;
        }
    });
    for (let i = 0; i < flowEdges.length; i++) {
        const currEdge = flowEdges[i];
        const agentIdx = flowNodes.findIndex(
            (node) => node.id == currEdge.source,
        );
        const nextAgentIdx = flowNodes.findIndex(
            (node) => node.id == currEdge.target,
        );
        agentList[agentIdx].setNext(agentList[nextAgentIdx]);
    }
    const starterAgent =
        agentList[
            flowNodes.findIndex((node) => node.type == AgentType.Trigger)
        ];
    starterAgent.execute("").then((result: any) => {
        console.log("---excute result:", result);
    });
};
