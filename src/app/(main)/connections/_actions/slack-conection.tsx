import { Option } from "@/components/ui/multiple-selector";
import axios from "axios";

export async function listBotChannels(
    slackAccessToken: string,
): Promise<Option[]> {
    const url = `https://slack.com/api/conversations.list?${new URLSearchParams(
        {
            types: "public_channel,private_channel",
            limit: "200",
        },
    )}`;

    try {
        const { data } = await axios.get(url, {
            headers: { Authorization: `Bearer ${slackAccessToken}` },
        });

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
}
