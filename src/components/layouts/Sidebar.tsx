"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sideMenuOptions } from "@/lib/const";
import clsx from "clsx";

const Sidebar = () => {
    const pathName = usePathname();
    return (
        <nav className="dark:bg-black h-screen overflow-scroll flex flex-col items-center justify-start gap-5 py-6 px-2">
            <div className="flex items-center justify-center flex-col gap-8">
                <Link href="/">DnD Agent</Link>
            </div>
            {sideMenuOptions.map((menuItem) => (
                <ul key={menuItem.name}>
                    <li>
                        <Link
                            className={clsx(
                                "group h-8 w-8 flex items-center justify-center scale-[1.5] rounded-lg p-[3px] coursor-pointer",
                                {
                                    "dark:bg-[#2F006B] bg-[#EEE0FF]":
                                        pathName == menuItem.href,
                                },
                            )}
                            href={menuItem.href}
                        >
                            <menuItem.Component
                                selected={pathName === menuItem.href}
                            />
                        </Link>
                    </li>
                </ul>
            ))}
        </nav>
    );
};

export default Sidebar;
