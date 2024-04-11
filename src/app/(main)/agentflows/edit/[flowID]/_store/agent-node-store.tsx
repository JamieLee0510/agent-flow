import { create } from "zustand";

type AgentNodeStore = {
    flowNodes: any[];
    setFlowNodes: (flowNodes: any[]) => void;
    currFlowNodeId: string | null;
    setCurFlowNodeId: (currFlowNodeId: string | null) => void;
};

export const useAgentNodeStore = create<AgentNodeStore>()((set) => ({
    flowNodes: [],
    setFlowNodes: (flowNodes: any[]) => set({ flowNodes }),
    currFlowNodeId: null,
    setCurFlowNodeId: (currFlowNodeId) => set({ currFlowNodeId }),
}));
