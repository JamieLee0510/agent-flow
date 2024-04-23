import { GptAgentNode } from "@/lib/agents/gpt-agent";
import { SlackAgentNode } from "@/lib/agents/slack-agent";
import { TriggerAgentNode } from "@/lib/agents/trigger-agent";
import { AgentType } from "@/lib/types";
import { Edge, Node } from "reactflow";
import { toast } from "sonner";

export const validateAgentFlow = (flowNodes: Node[]): boolean => {
    for (let i = 0; i < flowNodes.length; i++) {
        const flowNode = flowNodes[i];
        switch (flowNode.type) {
            case AgentType.Trigger:
                if (!flowNode.data.metadata.triggerText) return false;
                break;

            case AgentType.GPT:
                if (
                    !flowNode.data.metadata.systemPrompt ||
                    !flowNode.data.metadata.openaiKey
                )
                    return false;

                break;
            case AgentType.Slack:
                if (
                    !flowNode.data.metadata.selectedSlackChannels ||
                    !flowNode.data.metadata.selectedSlackChannels.length ||
                    !flowNode.data.metadata.slackToken
                )
                    return false;
                break;
        }
    }

    return true;
};

export const executeAgentFlow = (
    flowNodes: Node[],
    flowEdges: Edge[],
    setCurrExecuteNodeID: (id: string | null) => void,
) => {
    if (!validateAgentFlow(flowNodes)) {
        toast.error("agent setting error");
    }
    const agentList: any[] = [];
    flowNodes.forEach((flowNode) => {
        switch (flowNode.type) {
            case AgentType.Trigger:
                const triggerAgent = new TriggerAgentNode(
                    flowNode.data.metadata.triggerText,
                    flowNode.id,
                    setCurrExecuteNodeID,
                );
                agentList.push(triggerAgent);
                break;
            case AgentType.GPT:
                const gptAgent = new GptAgentNode(
                    flowNode.data.metadata.systemPrompt,
                    flowNode.data.metadata.openaiKey,
                    flowNode.id,

                    setCurrExecuteNodeID,
                );
                agentList.push(gptAgent);
                break;
            case AgentType.Slack:
                const { selectedSlackChannels, slackToken } =
                    flowNode.data.metadata;
                const slackAgent = new SlackAgentNode(
                    selectedSlackChannels,
                    slackToken,
                    flowNode.id,
                    setCurrExecuteNodeID,
                );
                agentList.push(slackAgent);
                break;
        }
    });
    debugger;
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

    // TODO: how to make agent effect the environment
    starterAgent.execute("").then((result: any) => {
        console.log("---excute result:", result);
    });
};
