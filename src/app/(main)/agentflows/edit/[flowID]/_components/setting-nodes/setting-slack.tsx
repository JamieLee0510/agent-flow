"use client";

import ConnectionCard from "@/app/(main)/connections/_components/connection-card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { CONNECTIONS } from "@/lib/const";
import { fetchBotSlackChannels } from "@/lib/editor-utils";
import { useSlackStore } from "@/store";
import React, { useEffect, useState } from "react";
import ActionButton from "../action-btn";
import { Input } from "@/components/ui/input";
import MultipleSelector from "@/components/ui/multiple-selector";

export default function SettingSlack() {
    const {
        slackChannels,
        setSlackChannels,
        selectedSlackChannels,
        setSelectedSlackChannels,
    } = useSlackStore();
    const [slackMsg, setSlackMsg] = useState("");

    // TODO: while init or slack connection, fetch the slack-channels
    useEffect(() => {
        const token = process.env.NEXT_PUBLIC_SLACK_DEMO_TOKEN as string;
        fetchBotSlackChannels(token, setSlackChannels);
    }, []);

    return (
        <>
            <div className="px-2 py-4 text-center text-xl font-bold">
                Slack(id:{})
            </div>
            <Accordion type="multiple">
                <AccordionItem value="Options" className="border-y-[1px] px-2">
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
                                        Select the slack channels to send
                                        notification and messages:
                                    </div>
                                    <MultipleSelector
                                        value={selectedSlackChannels}
                                        onChange={setSelectedSlackChannels}
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
        </>
    );
}
