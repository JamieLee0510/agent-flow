import clsx from "clsx";
import React from "react";

type Props = { selected: boolean };

function Connection({ selected }: Props) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="surface1">
                <path
                    className={clsx(
                        "dark:group-hover:fill-[#C8C7FF] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#7540A9]",
                        { "dark:!fill-[#C8C7FF] !fill-[#7540A9] ": selected },
                    )}
                    d="M 4.769531 10.953125 L 0 10.953125 L 0 13.046875 L 4.769531 13.046875 C 5.230469 14.773438 6.800781 16.042969 8.671875 16.042969 L 11.589844 16.042969 L 11.589844 7.957031 L 8.671875 7.957031 C 6.800781 7.957031 5.230469 9.226562 4.769531 10.953125 Z M 4.769531 10.953125 "
                />
                <path
                    className={clsx(
                        "dark:group-hover:fill-[#C8C7FF] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#7540A9]",
                        { "dark:!fill-[#C8C7FF] !fill-[#7540A9] ": selected },
                    )}
                    d="M 24 10.953125 L 19.230469 10.953125 C 18.769531 9.226562 17.199219 7.957031 15.328125 7.957031 L 12.410156 7.957031 L 12.410156 16.042969 L 15.328125 16.042969 C 17.199219 16.042969 18.769531 14.773438 19.230469 13.046875 L 24 13.046875 Z M 24 10.953125 "
                />
            </g>
        </svg>
    );
}

export default Connection;
