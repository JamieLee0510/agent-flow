import AgentsflowsIcon from "@/components/icons/agentflow";
import ConnectionIcon from "@/components/icons/connection";

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
