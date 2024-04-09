import { Button } from "@/components/ui/button";
import { Option } from "@/components/ui/multiple-selector";
import { postMessageToSlack } from "../_action/slack-actions";
import React from "react";
import { toast } from "sonner";

export default function ActionButton({
    channels,
    content,
}: {
    channels: Option[];
    content: string;
}) {
    const onStoreSlackContent = async () => {
        const token =
            "xoxb-6913220856837-6907375328775-dC2rIjyvIpFkv8ZzjY5sO6Fb";
        const response = await postMessageToSlack(token, channels, content);
        if (response.message == "Success") {
            toast.success("Message sent successfully");
        } else {
            toast.error(response.message);
        }
    };
    return (
        <>
            <Button variant="outline" onClick={onStoreSlackContent}>
                Send Message
            </Button>
            <Button onClick={() => {}} variant="outline">
                Save Template
            </Button>
        </>
    );
}
