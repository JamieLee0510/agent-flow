"use client";

import { useShallow } from "zustand/react/shallow";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FlowNodeStore, useFlowNodeStore } from "../../_store/agent-node-store";

const selector = (state: FlowNodeStore) => ({
    flowNodes: state.flowNodes,
    setFlowNodes: state.setFlowNodes,
    currFlowNodeId: state.currFlowNodeId,
});

export default function SettingTrigger() {
    const { flowNodes, setFlowNodes, currFlowNodeId } = useFlowNodeStore(
        useShallow(selector),
    );

    const currentNode = useMemo(
        () => flowNodes.filter((node) => node.id === currFlowNodeId)[0],
        [currFlowNodeId, flowNodes],
    );
    const [triggerText, setTriggerText] = useState("");

    useEffect(() => {
        setTriggerText(currentNode.data.metadata.triggerText);
    }, [currentNode]);

    const saveTriggerTemplate = () => {
        const newNodeData = {
            ...currentNode,
            data: {
                ...currentNode.data,
                metadata: { triggerText },
            },
        };
        const newFlowNodes = flowNodes.map((node) =>
            node.id === newNodeData.id ? { ...node, ...newNodeData } : node,
        );

        setFlowNodes(newFlowNodes);

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
