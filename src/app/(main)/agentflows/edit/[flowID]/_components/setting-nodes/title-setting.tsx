"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PencilLine } from "lucide-react";
import React, { useState } from "react";

export default function TitleSetting({
    currTitle,
    setCurrTitle,
    saveCallback,
}: {
    currTitle: string;
    setCurrTitle: (data: string) => void;
    saveCallback: () => void;
}) {
    const [isEditTitle, setIsEditTitle] = useState(false);
    const [isShowEdit, setShowEdit] = useState(false);

    return (
        <>
            {isEditTitle ? (
                <>
                    <Input
                        value={currTitle}
                        onChange={(e) => setCurrTitle(e.target.value)}
                    />
                    <Button
                        onClick={() => {
                            setIsEditTitle(false);
                            saveCallback();
                        }}
                    >
                        Change
                    </Button>
                    <Button
                        onClick={() => {
                            setIsEditTitle(false);
                            setShowEdit(false);
                        }}
                    >
                        Cancel
                    </Button>
                </>
            ) : (
                <div
                    className="flex justify-center items-center px-4"
                    onMouseEnter={() => setShowEdit(true)}
                    onMouseLeave={() => setShowEdit(false)}
                >
                    <span>{currTitle}</span>
                    {isShowEdit && (
                        <PencilLine
                            className="w-[20px] h-[20px] hover:cursor-pointer hover:bg-secondary hover:text-primary rounded
    "
                            onClick={() => setIsEditTitle(true)}
                        />
                    )}
                </div>
            )}
        </>
    );
}
