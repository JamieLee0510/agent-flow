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
import { Input } from "@/components/ui/input";
import MultipleSelector from "@/components/ui/multiple-selector";
import ConnectionCard from "@/app/(main)/connections/_components/connection-card";
import { CONNECTIONS, AgentDefaultCards } from "@/lib/const";
import { useEffect, useState } from "react";
import { useSlackStore } from "@/store";
import { fetchBotSlackChannels } from "@/lib/editor-utils";
import ActionButton from "./action-btn";
import EditorAgentIcon from "./editor-agent-icon";
import { AgentType } from "@/lib/types";

type Props = {
    nodes: any[];
};

export default function EditorCanvasSidebar({ nodes }: Props) {
    // TODO: make it as the store
    const {
        slackChannels,
        setSlackChannels,
        selectedSlackChannels,
        setSelectedSlackChannels,
    } = useSlackStore();

    const [slackMsg, setSlackMsg] = useState("");

    // TODO: while init or slack connection, fetch the slack-channels
    useEffect(() => {
        const token =
            "xoxb-6913220856837-6907375328775-dC2rIjyvIpFkv8ZzjY5sO6Fb";
        fetchBotSlackChannels(token, setSlackChannels);
    }, []);

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
                        ([cardKey, cardValue]) => (
                            <Card
                                key={cardKey}
                                draggable
                                className="w-full cursor-grab border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
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
                            </Card>
                        ),
                    )}
                </TabsContent>
                <TabsContent value="settings" className="-mt-6">
                    <div className="px-2 py-4 text-center text-xl font-bold">
                        node title(Slack)
                    </div>
                    <Accordion type="multiple">
                        <AccordionItem
                            value="Options"
                            className="border-y-[1px] px-2"
                        >
                            <AccordionTrigger className="!no-underline">
                                Account
                            </AccordionTrigger>

                            <AccordionContent>
                                <ConnectionCard
                                    title={CONNECTIONS[0].title}
                                    icon={CONNECTIONS[0].image}
                                    description={CONNECTIONS[0].description}
                                    isConnected={true}
                                />
                                <div className="p-10">
                                    {slackChannels?.length ? (
                                        <>
                                            <div className="mb-4 ml-1">
                                                Select the slack channels to
                                                send notification and messages:
                                            </div>
                                            <MultipleSelector
                                                value={selectedSlackChannels}
                                                onChange={
                                                    setSelectedSlackChannels
                                                }
                                                defaultOptions={slackChannels}
                                                placeholder="Select channels"
                                                emptyIndicator={
                                                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                        no results found.
                                                    </p>
                                                }
                                            />
                                        </>
                                    ) : (
                                        "No Slack channels found. Please add your Slack bot to your Slack channel"
                                    )}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="Expected Output" className="px-2">
                            <AccordionTrigger className="!no-underline">
                                Action
                            </AccordionTrigger>
                            <Card>
                                <div className="flex flex-col gap-3 px-6 py-3 pb-20">
                                    <p>Message</p>
                                    <Input
                                        type="text"
                                        value={slackMsg}
                                        onChange={(event) =>
                                            setSlackMsg(event.target.value)
                                        }
                                    />
                                    <ActionButton
                                        channels={selectedSlackChannels}
                                        content={slackMsg}
                                    />
                                </div>
                            </Card>
                            {/* <RenderOutputAccordion
                                state={state}
                                nodeConnection={nodeConnection}
                            /> */}
                        </AccordionItem>
                    </Accordion>
                </TabsContent>
            </Tabs>
        </aside>
    );
}
