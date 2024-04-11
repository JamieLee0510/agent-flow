"use client";
import { AgentType } from "@/lib/types";
import React from "react";
import SettingSlack from "./setting-slack";
import SettingGPT from "./setting-gpt";
import SettingTrigger from "./setting-trigger";

export default function SettingNodex({ node }: { node: any }) {
    if (node.type == AgentType.Slack) return <SettingSlack />;
    if (node.type == AgentType.GPT) return <SettingGPT node={node} />;
    if (node.type == AgentType.Trigger) return <SettingTrigger />;
    return <div>SettingNodex</div>;
}
