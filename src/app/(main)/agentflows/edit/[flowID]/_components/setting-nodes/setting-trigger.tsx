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

export default function SettingTrigger() {
    const { currentNode, saveCurrNodeMetadata } = useCurrFlowNodes();
    const [triggerText, setTriggerText] = useState("");

    const saveTriggerTemplate = () => {
        saveCurrNodeMetadata({ triggerText });
        toast.success("save trigger template successfully");
    };

    return (
        <>
            <div className="px-1 py-4 text-center text-xl font-bold">
                Trigger
                <br />
                {currentNode && (
                    <span className="text-sm font-light">
                        (id: {currentNode.id})
                    </span>
                )}
            </div>

            <Accordion type="multiple">
                <AccordionItem value="Expected Output" className="px-2">
                    <AccordionTrigger className="!no-underline">
                        Action
                    </AccordionTrigger>
                    <Card>
                        <div className="flex flex-col gap-3 px-6 py-3 pb-20">
                            <p>Trigger Message</p>
                            <Input
                                type="text"
                                value={triggerText}
                                onChange={(event) =>
                                    setTriggerText(event.target.value)
                                }
                            />

                            <Button
                                onClick={saveTriggerTemplate}
                                variant="outline"
                            >
                                Save Template
                            </Button>
                        </div>
                    </Card>
                </AccordionItem>
            </Accordion>
        </>
    );
}
