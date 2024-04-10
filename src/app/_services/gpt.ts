"use server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OEPNAI_API_KEY,
});

export const generateAnswer = async ({
    systemPrompt,
    userPrompt,
}: {
    systemPrompt: string;
    userPrompt: string;
}) => {
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ],
        model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content;
};
