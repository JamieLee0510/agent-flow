"use client";
import React, { useCallback, useEffect, useState } from "react";

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
import { useAgentNodeStore } from "../_store/agent-node-store";

const initialNodes: EditorNodeType[] = [];

const initialEdges: { id: string; source: string; target: string }[] = [];

const nodeTypes = {
    [AgentType.Trigger]: EditorCanvasItem,
    [AgentType.Slack]: EditorCanvasItem,
    [AgentType.GPT]: EditorCanvasItem,
};

export default function EditorCanvas() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { setFlowNodes } = useAgentNodeStore();

    useEffect(() => {
        setFlowNodes(nodes);
    }, [nodes]);

    const [reactFlowInstance, setReactFlowInstance] =
        useState<ReactFlowInstance>();

    const onDrop = useCallback(
        (event: any) => {
            event.preventDefault();

            const type = event.dataTransfer.getData("application/reactflow");
            console.log("---onDrop type:", type);
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

            console.log(
                "--desc:",
                AgentDefaultCards[type as AgentType].description,
            );
            const newNode = {
                id: uuidV4(),
                type,
                position,
                data: {
                    title: type,
                    description:
                        AgentDefaultCards[type as AgentType].description,
                    completed: false,
                    current: false,
                    metadata: {},
                    type: type,
                },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance],
    );

    // react flow example
    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onConnect = useCallback((params: any) => {
        setEdges((eds) => addEdge(params, eds));
    }, []);
    const handleClickCanvas = (data: any) => {
        // TODO: setting info in sidebar
        // so need state of "current node"
    };
    return (
        <ResizablePanelGroup direction="horizontal">
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
                        <ReactFlow
                            className="w-[300px]"
                            nodes={nodes}
                            edges={edges}
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
                                position="bottom-left"
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
            <ResizablePanel defaultSize={40} className="relative sm:block">
                <EditorCanvasSidebar nodes={nodes} />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
