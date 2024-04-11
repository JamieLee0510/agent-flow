import AgentsflowsIcon from "@/components/icons/agentflow";
import ConnectionIcon from "@/components/icons/connection";
import { AgentType } from "./types";

export const sideMenuOptions = [
    { name: "Agent Flows", Component: AgentsflowsIcon, href: "/agentflows" },
    { name: "Connections", Component: ConnectionIcon, href: "/connections" },
];

export const CurrentDisableAgent = [AgentType.Email, AgentType.Condition];

export const AgentDefaultCards: { [key in AgentType]: any } = {
    [AgentType.GPT]: {
        description:
            "Use the power of AI to summarize, respond, create and much more.",
        type: "Action",
        title: AgentType.GPT,
        image: "/chatgpt.png",
    },
    [AgentType.Slack]: {
        description: "Send a notification to slack",
        type: "Action",
        title: AgentType.Slack,
        image: "/slack.png",
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

export const CONNECTIONS = [
    AgentDefaultCards[AgentType.Slack],
    AgentDefaultCards[AgentType.GPT],
];
