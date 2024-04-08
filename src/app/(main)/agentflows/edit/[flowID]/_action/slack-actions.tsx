"use server";
import { postMessageInSlackChannel } from "@/app/_services/slack";
import { Option } from "@/components/ui/multiple-selector";

export const postMessageToSlack = async (
    slackAccessToken: string,
    selectedSlackChannels: Option[],
    content: string,
): Promise<{ message: string }> => {
    if (!content) return { message: "Content is empty" };
    if (!selectedSlackChannels?.length)
        return { message: "Channel not selected" };

    try {
        await Promise.all(
            selectedSlackChannels
                .map((channel) => channel?.value)
                .filter((channel) => channel !== undefined) // 確保過濾掉任何未定義的頻道值
                .map((channel) =>
                    postMessageInSlackChannel(
                        slackAccessToken,
                        channel,
                        content,
                    ),
                ),
        );
    } catch (error) {
        return { message: "Message could not be sent to Slack" };
    }

    return { message: "Success" };
};
