"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";

import Image from "next/image";
import Link from "next/link";
import SlackConnectionBtn from "./slack-connection-btn";
import GptConnectionBtn from "./gpt-connection-btn";

type Props = {
    // type: string;
    icon: string;
    title: string;
    description: string;
    callback?: () => void;
};
import { useSearchParams } from "next/navigation";
import { AgentType } from "@/lib/types";

const ConnectionCard = ({ icon, title, description }: Props) => {
    return (
        <Card className="flex w-full items-center justify-between">
            <CardHeader>
                <div className="flex flex-row gap-2">
                    <Image
                        src={icon}
                        alt={title}
                        height={30}
                        width={30}
                        className="object-contain"
                    />
                </div>
                <div>
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
            </CardHeader>
            {title == AgentType.Slack && (
                <Suspense fallback={<div>Loading...</div>}>
                    <SlackConnectionBtn />
                </Suspense>
            )}
            {title == AgentType.GPT && <GptConnectionBtn />}
        </Card>
    );
};

export default ConnectionCard;
