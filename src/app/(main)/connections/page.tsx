import { CONNECTIONS } from "@/lib/const";
import React from "react";
import ConnectionCard from "./_components/connection-card";

const Connections = async () => {
    // 透過路由的params來獲取slack 需要的data？
    return (
        <div className="relative flex flex-col gap-4">
            <h1 className="sticky top-0 z-[10]  border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
                Connections
            </h1>
            <div className="relative flex flex-col gap-4">
                <section className="flex flex-col gap-4 p-6 text-muted-foreground">
                    Connect all your apps directly from here. You may need to
                    connect these apps regularly to refresh verification
                    {CONNECTIONS.map((connection) => (
                        <ConnectionCard
                            key={connection.title}
                            title={connection.title}
                            icon={connection.image}
                            description={connection.description}
                            isConnected={false}
                        />
                    ))}
                </section>
            </div>
        </div>
    );
};

export default Connections;
