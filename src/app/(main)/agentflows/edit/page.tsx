import { redirect } from "next/navigation";
import React from "react";

export default function WorkfowEditor() {
    const id = 1; // TODO: the first editorID for the user
    redirect(`/agentflows/edit/${id}`);
    return null;
}
