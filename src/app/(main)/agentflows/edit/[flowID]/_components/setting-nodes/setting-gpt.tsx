"use client";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import ConnectionCard from "@/app/(main)/connections/_components/connection-card";
import { CONNECTIONS } from "@/lib/const";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { postMessageToGpt } from "../../_action/gpt-action";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useCurrFlowNodes } from "../../_store/agent-node-store";

export default function SettingGPT() {
    const { currentNode, saveCurrNodeMetadata } = useCurrFlowNodes();
    const [instructPrompt, setInstructPrompt] = useState(
        "You are a helpful assistant.",
    );
    const [testMsg, setTestMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [testGptAnswer, setTestGptAnswer] = useState("");

    useEffect(() => {
        if (
            currentNode &&
            currentNode.data.metadata &&
            currentNode.data.metadata.instructPrompt
        ) {
            setInstructPrompt(
                currentNode.data.metadata.instructPrompt as string,
            );
        }
    }, [currentNode]);

    const saveGptTemplate = () => {
        saveCurrNodeMetadata({ instructPrompt });
        toast.success("save gpt template successfully");
    };

    const testGPTHandler = async () => {
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

    return (
        <>
            <div className="px-2 py-4 text-center text-xl font-bold">
                GPT
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
                            <ConnectionCard
                                title={currentNode.data.title}
                                icon={currentNode.data.image}
                                description={currentNode.data.description}
                            />
                        )}
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
                            <Button onClick={saveGptTemplate} variant="outline">
                                Save Template
                            </Button>
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
                                onClick={testGPTHandler}
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
