import { create } from "zustand";

type AgentNodeStore = {
    agentNodes: any[];
    setAgentNodes: (agentNodes: any[]) => void;
    currAgentNodeId: string | null;
    setCurAgentNodeId: (currAgentNodeIdx: string | null) => void;
};

export const useAgentNodeStore = create<AgentNodeStore>()((set) => ({
    agentNodes: [],
    setAgentNodes: (agentNodes: any[]) => set({ agentNodes }),
    currAgentNodeId: null,
    setCurAgentNodeId: (currAgentNodeId) => set({ currAgentNodeId }),
}));
