import { useEffect, useState } from "react";
import { create } from "zustand";
import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
} from "reactflow";

export type FlowNodeStore = {
    flowNodes: Node[];
    flowEdges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setFlowNodes: (flowNodes: Node[]) => void;
    setFlowEdges: (flowEdges: Edge[]) => void;

    currFlowNodeId: string | null;
    setCurFlowNodeId: (currFlowNodeId: string | null) => void;

    nodesDraggable: boolean;
    setNodesDraggle: (nodesDraggable: boolean) => void;

    currExecuteNodeID: string | null;
    setCurrExecuteNodeID: (currExecuteNodeID: string | null) => void;
};

export const useFlowNodeStore = create<FlowNodeStore>((set, get) => ({
    flowNodes: [],
    flowEdges: [],
    onNodesChange: (changes: NodeChange[]) => {
        set({
            flowNodes: applyNodeChanges(changes, get().flowNodes),
        });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            flowEdges: applyEdgeChanges(changes, get().flowEdges),
        });
    },
    onConnect: (connection: Connection) => {
        set({
            flowEdges: addEdge(connection, get().flowEdges),
        });
    },
    setFlowNodes: (flowNodes: Node[]) => {
        set({ flowNodes });
    },
    setFlowEdges: (flowEdges: Edge[]) => {
        set({ flowEdges });
    },

    currFlowNodeId: null,
    setCurFlowNodeId: (currFlowNodeId) => set({ currFlowNodeId }),

    nodesDraggable: true,
    setNodesDraggle: (nodesDraggable: boolean) => set({ nodesDraggable }),

    currExecuteNodeID: null,
    setCurrExecuteNodeID: (currExecuteNodeID: string | null) =>
        set({ currExecuteNodeID }),
}));
