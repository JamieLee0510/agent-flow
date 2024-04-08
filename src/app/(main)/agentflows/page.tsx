import React from "react";

import AgentflowButton from "./_components/agentflow-btn";
import Agentsflows from "./_components";

export default function Page() {
    return (
        <div className="flex flex-col relative">
            <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b justify-between">
                Agentflows
                <AgentflowButton />
            </h1>
            <Agentsflows />
        </div>
    );
}
