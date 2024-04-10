"use client";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import ActionButton from "../action-btn";
import ConnectionCard from "@/app/(main)/connections/_components/connection-card";
import { CONNECTIONS } from "@/lib/const";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { postMessageToGpt } from "../../_action/gpt-action";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function SettingGPT() {
    const [instructPrompt, setInstructPrompt] = useState(
        "You are a helpful assistant.",
    );
    const [testMsg, setTestMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [testGptAnswer, setTestGptAnswer] = useState("");

    const onGptContent = async () => {
        setTestGptAnswer("");
        setIsLoading(true);
        const { message } = await postMessageToGpt(instructPrompt, testMsg);
        if (message == "Something wrong with GPT") {
            toast.error(message);
        } else {
            setTestGptAnswer(message);
        }
        setIsLoading(false);
    };

    const testGPTHandler = () => {};
    return (
        <>
            <div className="px-2 py-4 text-center text-xl font-bold">GPT</div>
            <Accordion type="multiple">
                <AccordionItem value="Options" className="border-y-[1px] px-2">
                    <AccordionTrigger className="!no-underline">
                        Account
                    </AccordionTrigger>

                    <AccordionContent>
                        <ConnectionCard
                            title={CONNECTIONS[1].title}
                            icon={CONNECTIONS[1].image}
                            description={CONNECTIONS[1].description}
                            isConnected={true}
                        />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="Expected Output" className="px-2">
                    <AccordionTrigger className="!no-underline">
                        Action
                    </AccordionTrigger>
                    <Card>
                        <div className="flex flex-col gap-3 px-6 py-3 pb-20">
                            <p>Instructure Prompt</p>
                            <Input
                                type="text"
                                value={instructPrompt}
                                onChange={(event) =>
                                    setInstructPrompt(event.target.value)
                                }
                            />
                            <p>Test Message</p>
                            <Input
                                type="text"
                                value={testMsg}
                                onChange={(event) =>
                                    setTestMsg(event.target.value)
                                }
                            />

                            <Button
                                variant="outline"
                                onClick={onGptContent}
                                disabled={isLoading}
                            >
                                Test GPT {isLoading && <LoadingSpinner />}
                            </Button>
                            {testGptAnswer && (
                                <>
                                    <p>Test Answer</p>
                                    <Textarea value={testGptAnswer} />
                                </>
                            )}
                        </div>
                    </Card>
                </AccordionItem>
            </Accordion>
        </>
    );
}
