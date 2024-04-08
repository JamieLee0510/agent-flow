"use client";
import React from "react";

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
} from "reactflow";
import "reactflow/dist/style.css";
import EditorCanvasSidebar from "./editor-canvas-sidebar";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

const initialNodes = [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
    { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function EditorCanvas() {
    const nodes: any[] = [];
    const edges: any[] = [];
    const nodeTypes = undefined;
    const onDrop = () => {};
    const onDragOver = () => {};
    const onNodesChange = () => {};
    const onEdgesChange = () => {};
    const onConnect = () => {};
    const setReactFlowInstance = () => {};
    const handleClickCanvas = () => {};
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
                            nodes={initialNodes}
                            edges={initialEdges}
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
