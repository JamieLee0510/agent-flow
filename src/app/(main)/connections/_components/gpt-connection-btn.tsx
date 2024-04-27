"use client";

import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Save } from "lucide-react";
import { toast } from "sonner";

export default function GptConnectionCard() {
    const [isConnected, setIsConnected] = useState(false);
    const [openaiKey, setOpenaiKey] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    const saveHandler = () => {
        if (openaiKey) {
            window.sessionStorage.setItem("openai_key", openaiKey);
            setIsConnected(true);
            setShowDialog(false);
            toast.success("Saved in session storage");
        } else {
            toast.error("key cannot be empty");
        }
    };

    useEffect(() => {
        if (window.sessionStorage.getItem("openai_key")) {
            setIsConnected(true);
            setOpenaiKey(window.sessionStorage.getItem("openai_key") as string);
        }
    }, []);

    return (
        <div className="flex flex-row items-center gap-2 p-4">
            <Dialog
                open={showDialog}
                onOpenChange={(value) => setShowDialog(value)}
            >
                {isConnected ? (
                    <>
                        <div className="border-bg-primary rounded-lg border-2 px-3 py-2 font-bold text-white">
                            Connected
                        </div>
                        <Button
                            onClick={() => setShowDialog(true)}
                            className="bg-primary rounded-lg p-2 font-bold text-primary-foreground"
                        >
                            Change
                        </Button>
                    </>
                ) : (
                    <Button
                        onClick={() => setShowDialog(true)}
                        className="bg-primary rounded-lg p-2 font-bold text-primary-foreground"
                    >
                        Connect
                    </Button>
                )}
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Enter your OPENAI KEY</DialogTitle>
                        <DialogDescription>
                            It will be just saved in browser session storage.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-center space-x-2">
                        <Input
                            value={openaiKey}
                            onChange={(e) => setOpenaiKey(e.target.value)}
                            type="password"
                        />

                        <Button
                            size="sm"
                            className="px-3"
                            onClick={saveHandler}
                        >
                            <span className="sr-only">save</span>
                            {isConnected && openaiKey ? (
                                <CheckCircle2 className="h-4 w-4" />
                            ) : (
                                <Save className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button
                                onClick={() => setShowDialog(false)}
                                type="button"
                                variant="secondary"
                            >
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
