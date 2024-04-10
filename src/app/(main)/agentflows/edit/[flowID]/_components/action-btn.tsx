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
        const token = process.env.NEXT_PUBLIC_SLACK_DEMO_TOKEN as string;
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
