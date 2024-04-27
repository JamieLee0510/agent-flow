"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SlackConnectionCard() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isConnected, setIsConnected] = useState(false);

    // 目前的connection card，
    const slackAccessToken = searchParams.get("slack_access_token");
    useEffect(() => {
        if (slackAccessToken) {
            window.sessionStorage.setItem(
                "slack_access_token",
                slackAccessToken as string,
            );
            setIsConnected(true);
        } else if (window.sessionStorage.getItem("slack_access_token")) {
            setIsConnected(true);
        }
    }, [slackAccessToken]);

    return (
        <div className="flex flex-col items-center gap-2 p-4">
            {isConnected ? (
                <div className="border-bg-primary rounded-lg border-2 px-3 py-2 font-bold text-white">
                    Connected
                </div>
            ) : (
                <Button
                    className="bg-primary rounded-lg p-2 font-bold text-primary-foreground"
                    onClick={() =>
                        router.push(process.env.NEXT_PUBLIC_SLACK_REDIRECT!)
                    }
                >
                    Connect
                </Button>
            )}
        </div>
    );
}
