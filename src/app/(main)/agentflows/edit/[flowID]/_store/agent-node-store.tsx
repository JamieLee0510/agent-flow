import { useEffect, useState } from "react";
import { create } from "zustand";

type FlowNodeStore = {
    flowNodes: any[];
    setFlowNodes: (flowNodes: any[]) => void;
    currFlowNodeId: string | null;
    setCurFlowNodeId: (currFlowNodeId: string | null) => void;
};

export const useFlowNodeStore = create<FlowNodeStore>()((set) => ({
    flowNodes: [],
    setFlowNodes: (flowNodes: any[]) => set({ flowNodes }),
    currFlowNodeId: null,
    setCurFlowNodeId: (currFlowNodeId) => set({ currFlowNodeId }),
}));

export const useCurrFlowNodes = () => {
    const { flowNodes, setFlowNodes, currFlowNodeId } = useFlowNodeStore();
    const [currentNode, setCurrentNode] = useState<any>(null); // TODO: agentNodeType

    useEffect(() => {
        const node = flowNodes.filter((item) => item.id == currFlowNodeId)[0];

        if (!node) {
            setCurrentNode(null);
        } else {
            // TODO: should take the previous agent output
            setCurrentNode(node);
        }
    }, [flowNodes, currFlowNodeId]);

    const saveCurrNodeMetadata = (metadata: any) => {
        flowNodes.forEach((node) => {
            if (node.id == currFlowNodeId) {
                node.data.metadata = metadata;
            }
        });
        setFlowNodes([...flowNodes]);
    };

    return {
        currentNode,
        flowNodes,
        setFlowNodes,
        currFlowNodeId,
        saveCurrNodeMetadata,
    };
};
