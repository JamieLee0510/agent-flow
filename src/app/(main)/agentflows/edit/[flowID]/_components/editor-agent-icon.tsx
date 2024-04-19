"use client";
import React from "react";
import {
    CircuitBoard,
    GitBranch,
    Mail,
    MousePointerClickIcon,
    Slack,
    Zap,
} from "lucide-react";
import { AgentType } from "@/lib/types";

type Props = { type: AgentType };

export default function EditorAgentIcon({ type }: Props) {
    switch (type) {
        case AgentType.Trigger:
            return (
                <MousePointerClickIcon className="flex-shrink-0" size={30} />
            );
        case AgentType.Slack:
            return <Slack className="flex-shrink-0" size={30} />;
        case AgentType.Condition:
            return <GitBranch className="flex-shrink-0" size={30} />;
        case AgentType.Email:
            return <Mail className="flex-shrink-0" size={30} />;
        case AgentType.GPT:
            return <CircuitBoard className="flex-shrink-0" size={30} />;
        default:
            return <Zap className="flex-shrink-0" size={30} />;
    }
}
