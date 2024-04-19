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
import { useEffect, useMemo, useState } from "react";

import { onDragStart } from "@/lib/editor-utils";
import EditorAgentIcon from "./editor-agent-icon";
import { AgentType } from "@/lib/types";
import { FlowNodeStore, useFlowNodeStore } from "../_store/agent-node-store";
import SettingNodes from "./setting-nodes";
import { Button } from "@/components/ui/button";
import { TriggerAgentNode } from "@/lib/agents/trigger-agent";
import { GptAgentNode } from "@/lib/agents/gpt-agent";
import { SlackAgentNode } from "@/lib/agents/slack-agent";
import { useShallow } from "zustand/react/shallow";
import { TabValue, useSideBarStore } from "../_store/side-bar-store";

const flowSelector = (state: FlowNodeStore) => ({
    flowNodes: state.flowNodes,
    flowEdges: state.flowEdges,
    currFlowNodeId: state.currFlowNodeId,
});

export default function EditorCanvasSidebar() {
    const { flowNodes, flowEdges, currFlowNodeId } = useFlowNodeStore(
        useShallow(flowSelector),
    );

    const { tabValue, setTabValue } = useSideBarStore((state) => ({
        tabValue: state.tabValue,
        setTabValue: state.setTabValue,
    }));

    const currentNode = useMemo(
        () => flowNodes.filter((node) => node.id === currFlowNodeId)[0],
        [currFlowNodeId, flowNodes],
    );

    return (
        <aside>
            <Tabs
                value={tabValue}
                onValueChange={(value) => {
                    console.log(value);
                    setTabValue(value as TabValue);
                }}
                className="h-screen overflow-scroll pb-24"
            >
                <TabsList className="bg-transparent">
                    <TabsTrigger value={TabValue.Action}>Actions</TabsTrigger>
                    <TabsTrigger value={TabValue.Settings}>
                        Settings
                    </TabsTrigger>
                </TabsList>
                <Separator />
                <TabsContent
                    value={TabValue.Action}
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
                <TabsContent value={TabValue.Settings} className="-mt-6">
                    {currentNode ? (
                        <SettingNodes node={currentNode} />
                    ) : (
                        "no data"
                    )}
                </TabsContent>
            </Tabs>
        </aside>
    );
}
