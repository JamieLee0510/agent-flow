"use server";

import axios from "axios";

export const getChannelList = async (slackAccessToken: string) => {
    const url = `https://slack.com/api/conversations.list`;
    const headers = { Authorization: `Bearer ${slackAccessToken}` };
    try {
        const { data } = await axios.get(url, { headers });

        if (!data.ok) throw new Error(data.error);

        if (!data?.channels?.length) return [];

        return data.channels
            .filter((ch: any) => ch.is_member)
            .map((ch: any) => {
                return { label: ch.name, value: ch.id };
            });
    } catch (error: any) {
        console.error("Error listing bot channels:", error.message);
        throw error;
    }
};

export const postMessageInSlackChannel = async (
    slackAccessToken: string,
    slackChannelID: string,
    content: string,
) => {
    const url = "https://slack.com/api/chat.postMessage";
    const data = { channel: slackChannelID, text: content };
    const headers = {
        Authorization: `Bearer ${slackAccessToken}`,
        "Content-Type": "application/json;charset=utf-8",
    };
    try {
        const response = await axios.post(url, data, { headers });
        return response;
    } catch (err: any) {
        console.error(
            `Error posting message to Slack channel ${slackChannelID}:`,
            err?.response?.data || err.message,
        );
    }
};
