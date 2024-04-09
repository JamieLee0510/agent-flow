import React from "react";
import AgentFlow from "./agentflow";
import { onGetAgentflows } from "../_actions/agentflow-connections";

type Props = {};

const Agentflows = async (props: Props) => {
    const agentflows = await onGetAgentflows();
    return (
        <div className="relative flex flex-col gap-4">
            <section className="flex flex-col m-2">
                {agentflows?.length ? (
                    agentflows.map((flow) => (
                        <AgentFlow key={flow.id} {...flow} />
                    ))
                ) : (
                    <div className="mt-28 flex text-muted-foreground items-center justify-center">
                        No Agent flows
                    </div>
                )}
            </section>
        </div>
    );
};

export default Agentflows;
