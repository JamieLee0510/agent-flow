"use server";
import { postMessageInSlackChannel } from "@/app/_services/slack";
import { Option } from "@/components/ui/multiple-selector";

export const postMessageToSlack = async (
    slackAccessToken: string,
    selectedSlackChannels: string[],
    content: string,
): Promise<{ message: string }> => {
    if (!content) return { message: "Content is empty" };
    if (!selectedSlackChannels?.length)
        return { message: "Channel not selected" };

    try {
        await Promise.all(
            selectedSlackChannels.map((channel) => {
                console.log("---channel");
                return postMessageInSlackChannel(
                    slackAccessToken,
                    channel,
                    content,
                );
            }),
        );
    } catch (error) {
        return { message: "Message could not be sent to Slack" };
    }

    return { message: "Success" };
};
