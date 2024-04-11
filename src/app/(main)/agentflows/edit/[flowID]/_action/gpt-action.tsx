"use server";

import { generateAnswer } from "@/app/_services/gpt";

export const postMessageToGpt = async (
    systemPrompt: string,
    userPrompt: string,
): Promise<{ message: string }> => {
    if (!userPrompt) return { message: "Content is empty" };

    try {
        const result = (await generateAnswer({
            systemPrompt,
            userPrompt,
        })) as string;
        return { message: result };
    } catch (error) {
        return { message: "Something wrong with GPT" };
    }
};
