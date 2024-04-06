"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

type Props = {};

const AgentflowButton = (props: Props) => {
    const handleClick = () => {
        //TODO:
    };

    return (
        <Button size={"icon"} onClick={handleClick}>
            <Plus />
        </Button>
    );
};

export default AgentflowButton;
