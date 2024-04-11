"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
    isConnected: boolean;
};
import { useSearchParams } from "next/navigation";
import { AgentType } from "@/lib/types";

const ConnectionCard = ({ icon, title, description, isConnected }: Props) => {
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
            {title == AgentType.Slack && <SlackConnectionBtn />}
            {title == AgentType.GPT && <GptConnectionBtn />}
            {/* <div className="flex flex-col items-center gap-2 p-4">
                {isConnected ? (
                    <div className="border-bg-primary rounded-lg border-2 px-3 py-2 font-bold text-white">
                        Connected
                    </div>
                ) : (
                    <Link
                        className="bg-primary rounded-lg p-2 font-bold text-primary-foreground"
                        href={process.env.NEXT_PUBLIC_SLACK_REDIRECT!}
                    >
                        Connect
                    </Link>
                )}
            </div> */}
        </Card>
    );
};

export default ConnectionCard;
