import { AgentType } from "./types";

export const onDragStart = (event: any, nodeType: AgentType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
};
