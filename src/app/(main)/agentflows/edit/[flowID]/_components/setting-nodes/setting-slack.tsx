"use client";

import ConnectionCard from "@/app/(main)/connections/_components/connection-card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { useSlackStore } from "@/store";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import MultipleSelector from "@/components/ui/multiple-selector";
import { Button } from "@/components/ui/button";
import { postMessageToSlack } from "../../_action/slack-actions";
import { toast } from "sonner";
import { getChannelList } from "@/app/_services/slack";
import { useCurrFlowNodes } from "../../_store/agent-node-store";

export default function SettingSlack() {
    const { currentNode, saveCurrNodeMetadata } = useCurrFlowNodes();

    const {
        slackChannels,
        setSlackChannels,
        selectedSlackChannels,
        setSelectedSlackChannels,
    } = useSlackStore();
    const [slackMsg, setSlackMsg] = useState("");
    const [isConnected, setIsConnected] = useState(false);

    // init slack channel options
    useEffect(() => {
        const token = window.sessionStorage.getItem("slack_access_token");
        if (token) {
            getChannelList(token)?.then((channels) => {
                setIsConnected(true);
                setSlackChannels(channels);
            });
        } else {
            setIsConnected(false);
        }
    }, []);

    const onStoreSlackContent = async () => {
        const token = window.sessionStorage.getItem(
            "slack_access_token",
        ) as string;
        const selectedSlackChannelValue = selectedSlackChannels
            .map((channel) => channel?.value)
            .filter((channel) => channel !== undefined);
        console.log("---selectedSlackChannelValue:", selectedSlackChannelValue);
        const response = await postMessageToSlack(
            token,
            selectedSlackChannelValue,
            slackMsg,
        );
        if (response.message == "Success") {
            toast.success("Message sent successfully");
        } else {
            toast.error(response.message);
        }
    };

    const saveSlackTemplate = () => {
        const slackToken = window.sessionStorage.getItem("slack_access_token");
        const selectedSlackChannelValue = selectedSlackChannels
            .map((channel) => channel?.value)
            .filter((channel) => channel !== undefined);
        saveCurrNodeMetadata({
            selectedSlackChannels: selectedSlackChannelValue,
            slackToken,
        });
        toast.success("save slack template successfully");
    };

    return (
        <>
            <div className="px-1 py-4 text-center text-xl font-bold">
                Slack
                <br />
                {currentNode && (
                    <span className="text-sm font-light">
                        (id: {currentNode.id})
                    </span>
                )}
            </div>

            <Accordion type="multiple">
                <AccordionItem value="Options" className="border-y-[1px] px-2">
                    <AccordionTrigger className="!no-underline">
                        Account
                    </AccordionTrigger>

                    <AccordionContent>
                        {currentNode && (
                            <>
                                <ConnectionCard
                                    title={currentNode.data.title}
                                    icon={currentNode.data.image}
                                    description={currentNode.data.description}
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
                            </>
                        )}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="Expected Output" className="px-2">
                    <AccordionTrigger className="!no-underline">
                        Action
                    </AccordionTrigger>
                    <AccordionContent>
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

                                <Button
                                    variant="outline"
                                    onClick={onStoreSlackContent}
                                >
                                    Send Message
                                </Button>
                                <Button
                                    onClick={saveSlackTemplate}
                                    variant="outline"
                                >
                                    Save Template
                                </Button>
                            </div>
                        </Card>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    );
}
