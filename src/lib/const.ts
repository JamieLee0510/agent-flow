import AgentsflowsIcon from "@/components/icons/agentflow";
import ConnectionIcon from "@/components/icons/connection";
import { AgentType } from "./types";

export const sideMenuOptions = [
    { name: "Agent Flows", Component: AgentsflowsIcon, href: "/agentflows" },
    { name: "Connections", Component: ConnectionIcon, href: "/connections" },
];

export const CONNECTIONS = [
    {
        title: "Slack",
        description:
            "Use slack to send notifications to team members through your own custom bot.",
        image: "/slack.png",
        connectionKey: "slackNode",
        accessTokenKey: "slackAccessToken",
        slackSpecial: true,
    },
];

export const CurrentDisableAgent = [AgentType.Email, AgentType.Condition];

export const AgentDefaultCards: { [key in AgentType]: any } = {
    [AgentType.LLM]: {
        description:
            "Use the power of AI to summarize, respond, create and much more.",
        type: "Action",
    },
    [AgentType.Slack]: {
        description: "Send a notification to slack",
        type: "Action",
    },
    [AgentType.Trigger]: {
        description: "An event that starts the workflow.",
        type: "Trigger",
    },
    [AgentType.Email]: {
        description: "Send and email to a user",
        type: "Action",
    },
    [AgentType.Condition]: {
        description:
            "Boolean operator that creates different conditions lanes.",
        type: "Action",
    },
};
