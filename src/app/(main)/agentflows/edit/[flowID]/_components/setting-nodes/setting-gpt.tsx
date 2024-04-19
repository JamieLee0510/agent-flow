"use client";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import React, { useEffect, useMemo, useState } from "react";
import ConnectionCard from "@/app/(main)/connections/_components/connection-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { postMessageToGpt } from "../../_action/gpt-action";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FlowNodeStore, useFlowNodeStore } from "../../_store/agent-node-store";
import { PencilLine } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

const selector = (state: FlowNodeStore) => ({
    flowNodes: state.flowNodes,
    setFlowNodes: state.setFlowNodes,
    currFlowNodeId: state.currFlowNodeId,
});

export default function SettingGPT() {
    const { flowNodes, setFlowNodes, currFlowNodeId } = useFlowNodeStore(
        useShallow(selector),
    );

    const currentNode = useMemo(
        () => flowNodes.filter((node) => node.id === currFlowNodeId)[0],
        [currFlowNodeId, flowNodes],
    );

    const [currTitle, setCurrTitle] = useState("");
    const [systemPrompt, setSystemPrompt] = useState(
        "You are a helpful assistant.",
    );
    const [testMsg, setTestMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [testGptAnswer, setTestGptAnswer] = useState("");
    const [isEditTitle, setIsEditTitle] = useState(false);
    const [isShowEdit, setShowEdit] = useState(false);

    useEffect(() => {
        if (
            currentNode &&
            currentNode.data.metadata &&
            currentNode.data.metadata.instructPrompt
        ) {
            setSystemPrompt(currentNode.data.metadata.instructPrompt as string);
            setCurrTitle(currentNode.data.title as string);
        }
    }, [currentNode]);

    const saveGptTemplate = () => {
        const newNodeData = {
            ...currentNode,
            data: {
                ...currentNode.data,
                metadata: { ...currentNode.data.metadta, systemPrompt },
            },
        };

        const newFlowNodes = flowNodes.map((node) =>
            node.id === newNodeData.id ? { ...node, ...newNodeData } : node,
        );
        setFlowNodes(newFlowNodes);
        toast.success("save gpt template successfully");
    };

    const testGPTHandler = async () => {
        setTestGptAnswer("");
        setIsLoading(true);
        const message = await postMessageToGpt(systemPrompt, testMsg);
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
                <div className="w-full flex justify-center items-center gap-4 px-2">
                    {isEditTitle ? (
                        <>
                            <Input
                                value={currTitle}
                                onChange={(e) => setCurrTitle(e.target.value)}
                            />
                            <Button>Change</Button>
                            <Button
                                onClick={() => {
                                    setIsEditTitle(false);
                                    setShowEdit(false);
                                }}
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <div
                            className="flex justify-center items-center px-4"
                            onMouseEnter={() => setShowEdit(true)}
                            onMouseLeave={() => setShowEdit(false)}
                        >
                            <span>GPT</span>
                            {isShowEdit && (
                                <PencilLine
                                    className="w-[20px] h-[20px] hover:cursor-pointer hover:bg-secondary hover:text-primary rounded
                    "
                                    onClick={() => setIsEditTitle(true)}
                                />
                            )}
                        </div>
                    )}
                </div>

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
                    <AccordionContent>
                        <Card>
                            <div className="flex flex-col gap-3 px-6 py-3 pb-20">
                                <p>Instructure Prompt</p>
                                <Input
                                    type="text"
                                    value={systemPrompt}
                                    onChange={(event) =>
                                        setSystemPrompt(event.target.value)
                                    }
                                />
                                <Button
                                    onClick={saveGptTemplate}
                                    variant="outline"
                                >
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
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    );
}
