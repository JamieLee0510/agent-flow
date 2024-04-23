"use server";
import OpenAI from "openai";

export const generateAnswer = async ({
    systemPrompt,
    userPrompt,
    openaiKey,
}: {
    systemPrompt: string;
    userPrompt: string;
    openaiKey: string;
}) => {
    const openai = new OpenAI({
        apiKey: openaiKey,
    });
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ],
        model: "gpt-3.5-turbo",
    });
    return completion.choices[0].message.content;
};
