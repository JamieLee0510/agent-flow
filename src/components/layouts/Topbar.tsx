import React from "react";
import ModeToggle from "./model-toggle";

export default function Topbar() {
    return (
        <div className="flex flex-row justify-end gap-6 items-center px-4 py-4 w-full dark:bg-black ">
            <ModeToggle />
        </div>
    );
}
