"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import ReactFlow, {
    Background,
    Connection,
    Controls,
    Edge,
    EdgeChange,
    MiniMap,
    NodeChange,
    ReactFlowInstance,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    useNodesState,
    useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuidV4 } from "uuid";

import EditorCanvasSidebar from "./editor-canvas-sidebar";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { AgentType, EditorNodeType } from "@/lib/types";
import EditorCanvasItem from "./editot-canvas-item";
import { AgentDefaultCards } from "@/lib/const";
import { FlowNodeStore, useFlowNodeStore } from "../_store/agent-node-store";
import { Button } from "@/components/ui/button";
import { executeAgentFlow } from "../_utils";

// TODO: might need a start node and a end node;
const selector = (state: FlowNodeStore) => ({
    flowNodes: state.flowNodes,
    flowEdges: state.flowEdges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    setFlowNodes: state.setFlowNodes,
});

const nodeTypes = {
    [AgentType.Trigger]: EditorCanvasItem,
    [AgentType.Slack]: EditorCanvasItem,
    [AgentType.GPT]: EditorCanvasItem,
};

export default function EditorCanvas() {
    const {
        flowNodes,
        setFlowNodes,
        onNodesChange,
        flowEdges,
        onEdgesChange,
        onConnect,
    } = useFlowNodeStore(useShallow(selector));

    const [reactFlowInstance, setReactFlowInstance] =
        useState<ReactFlowInstance>();

    const onDrop = useCallback(
        (event: any) => {
            event.preventDefault();

            const type = event.dataTransfer.getData("application/reactflow");
            // check if the dropped element is valid
            if (typeof type === "undefined" || !type) {
                return;
            }

            // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
            // and you don't need to subtract the reactFlowBounds.left/top anymore
            // details: https://reactflow.dev/whats-new/2023-11-10
            if (!reactFlowInstance) return;
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode = {
                id: uuidV4(),
                type,
                position,
                data: {
                    title: type,
                    description:
                        AgentDefaultCards[type as AgentType].description,
                    image: AgentDefaultCards[type as AgentType].image,
                    completed: false,
                    current: false,
                    metadata: {},
                    type: type,
                },
            };
            const newNodes = flowNodes.concat(newNode);
            setFlowNodes(newNodes);
        },
        [flowNodes, reactFlowInstance],
    );

    // react flow example
    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const handleClickCanvas = (data: any) => {
        // TODO: setting info in sidebar
        // so need state of "current node"
    };
    return (
        <>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={30} className="relative sm:block">
                    <EditorCanvasSidebar />
                </ResizablePanel>
                <ResizablePanel defaultSize={70}>
                    <div className="flex h-full items-center justify-center">
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                paddingBottom: "70px",
                            }}
                            className="relative"
                        >
                            <Button
                                onClick={() =>
                                    executeAgentFlow(flowNodes, flowEdges)
                                }
                                className="absolute z-20 top-2 right-2 rounded-2xl"
                            >
                                test agent
                            </Button>
                            <ReactFlow
                                className="w-[300px]"
                                nodes={flowNodes}
                                edges={flowEdges}
                                onDrop={onDrop}
                                onDragOver={onDragOver}
                                onNodesChange={onNodesChange}
                                onEdgesChange={onEdgesChange}
                                onConnect={onConnect}
                                onInit={setReactFlowInstance}
                                fitView
                                onClick={handleClickCanvas}
                                nodeTypes={nodeTypes}
                            >
                                <Controls position="top-left" />
                                <MiniMap
                                    position="bottom-right"
                                    className="!bg-background"
                                    zoomable
                                    pannable
                                />
                                <Background
                                    //@ts-ignore
                                    variant="dots"
                                    gap={12}
                                    size={1}
                                />
                            </ReactFlow>
                        </div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    );
}
