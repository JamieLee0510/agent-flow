"use client";
import React from "react";
import {
    Calendar,
    CircuitBoard,
    Database,
    GitBranch,
    HardDrive,
    Mail,
    MousePointerClickIcon,
    Plus,
    Slack,
    Timer,
    Webhook,
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
        case AgentType.LLM:
            return <CircuitBoard className="flex-shrink-0" size={30} />;
        default:
            return <Zap className="flex-shrink-0" size={30} />;
    }
}
