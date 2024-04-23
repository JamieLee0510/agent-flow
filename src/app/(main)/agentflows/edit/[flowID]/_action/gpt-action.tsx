"use server";

import { generateAnswer } from "@/app/_services/gpt";

export const postMessageToGpt = async (
    systemPrompt: string,
    userPrompt: string,
    openaiKey: string,
): Promise<string> => {
    if (!userPrompt) return "user prompt is empty";

    try {
        const result = (await generateAnswer({
            systemPrompt,
            userPrompt,
            openaiKey,
        })) as string;
        return result;
    } catch (error) {
        console.log(error);
        return "Something wrong with GPT";
    }
};
