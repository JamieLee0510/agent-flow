import React, { useMemo } from "react";
import { Handle, Position, useNodeId } from "reactflow";
import EditorAgentIcon from "./editor-agent-icon";
import { AgentType } from "@/lib/types";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useFlowNodeStore } from "../_store/agent-node-store";

// TODO: data type
export default function EditorCanvasItem({ data }: any) {
    const nodeId = useNodeId();
    const setCurFlowNodeId = useFlowNodeStore(
        (state) => state.setCurFlowNodeId,
    );
    const logo = useMemo(() => {
        return <EditorAgentIcon type={data.type} />;
    }, [data]);

    return (
        <>
            {data.type !== AgentType.Trigger && (
                <Handle
                    type="target"
                    position={Position.Top}
                    style={{ zIndex: 100 }}
                />
            )}
            <Card
                onClick={() => {
                    setCurFlowNodeId(nodeId);
                }}
                className="relative max-w-[400px] dard:border-muted-foreground/70"
            >
                <CardHeader className="flex flex-row items-center gap-4">
                    <div>{logo}</div>
                    <div>
                        <CardTitle className="text-md">{data.title}</CardTitle>
                        <CardDescription>
                            <p className="text-xs text-muted-foreground/50">
                                <b className="text-muted-foreground/80">ID: </b>
                                {nodeId}
                            </p>
                            <p>{data.description}</p>
                        </CardDescription>
                    </div>
                </CardHeader>
            </Card>
            {data.type !== AgentType.Slack && (
                <Handle
                    type="source"
                    position={Position.Bottom}
                    style={{ zIndex: 100 }}
                />
            )}
        </>
    );
}
