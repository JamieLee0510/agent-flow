"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { AgentDefaultCards, CurrentDisableAgent } from "@/lib/const";
import { useEffect, useState } from "react";

import { onDragStart } from "@/lib/editor-utils";
import EditorAgentIcon from "./editor-agent-icon";
import { AgentType } from "@/lib/types";
import { useCurrFlowNodes, useFlowNodeStore } from "../_store/agent-node-store";
import SettingNodes from "./setting-nodes";
import { Button } from "@/components/ui/button";
import { TriggerAgentNode } from "@/lib/agents/trigger-agent";
import { GptAgentNode } from "@/lib/agents/gpt-agent";
import { SlackAgentNode } from "@/lib/agents/slack-agent";

type Props = {
    nodes: any[];
};

export default function EditorCanvasSidebar({ nodes }: Props) {
    const { flowNodes, currentNode } = useCurrFlowNodes();
    const testAgent = () => {
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
        for (let i = 0; i < agentList.length - 1; i++) {
            const currAgent = agentList[i];
            const nextAgent = agentList[i + 1];
            currAgent.setNext(nextAgent);
        }
        agentList[0].execute("").then((result: any) => {
            console.log(result); // 输出最终结果
        });
    };

    return (
        <aside>
            <Tabs
                defaultValue="actions"
                className="h-screen overflow-scroll pb-24"
            >
                <TabsList className="bg-transparent">
                    <TabsTrigger value="actions">Actions</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <Separator />
                <TabsContent
                    value="actions"
                    className="flex flex-col gap-4 p-4"
                >
                    {Object.entries(AgentDefaultCards).map(
                        ([cardKey, cardValue]) => {
                            const disable = CurrentDisableAgent.includes(
                                cardKey as AgentType,
                            );
                            return (
                                <Card
                                    key={cardKey}
                                    draggable={!disable}
                                    className="relative w-full cursor-grab border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
                                    onDragStart={(event) => {
                                        if (disable) return;
                                        onDragStart(
                                            event,
                                            cardKey as AgentType,
                                        );
                                    }}
                                >
                                    <CardHeader className="flex flex-row items-center gap-4 p-4">
                                        <EditorAgentIcon
                                            type={cardKey as AgentType}
                                        />
                                        <CardTitle className="text-md">
                                            {cardKey}
                                            <CardDescription>
                                                {cardValue.description}
                                            </CardDescription>
                                        </CardTitle>
                                    </CardHeader>
                                    {disable && (
                                        <div className="absolute cursor-no-drop top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center text-white z-10">
                                            <span>Coming Soon</span>
                                        </div>
                                    )}
                                </Card>
                            );
                        },
                    )}
                </TabsContent>
                <TabsContent value="settings" className="-mt-6">
                    {currentNode ? (
                        <SettingNodes node={currentNode} />
                    ) : (
                        "no data"
                    )}
                </TabsContent>
            </Tabs>
            <Button
                onClick={testAgent}
                className="absolute top-0 right-2 rounded-2xl"
            >
                test agent
            </Button>
        </aside>
    );
}
