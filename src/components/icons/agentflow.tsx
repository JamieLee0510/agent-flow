import clsx from "clsx";
import React from "react";

type Props = { selected: boolean };

const Agentsflows = ({ selected }: Props) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                className={clsx(
                    "dark:group-hover:fill-[#C8C7FF] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#7540A9]",
                    { "dark:!fill-[#C8C7FF] !fill-[#7540A9] ": selected },
                )}
                d="M2,5A3,3,0,1,1,5.965,7.827.915.915,0,0,1,6,8v5a1,1,0,0,1-2,0V8a.915.915,0,0,1,.035-.173A2.989,2.989,0,0,1,2,5ZM19.965,16.173A.915.915,0,0,0,20,16V12a1,1,0,0,0-2,0v4a.915.915,0,0,0,.035.173,3,3,0,1,0,1.93,0ZM21,2H17a1,1,0,0,0-1,1V4H12a1,1,0,0,0,0,2h4V7a1,1,0,0,0,1,1h4a1,1,0,0,0,1-1V3A1,1,0,0,0,21,2ZM12,18H8V17a1,1,0,0,0-1-1H3a1,1,0,0,0-1,1v4a1,1,0,0,0,1,1H7a1,1,0,0,0,1-1V20h4a1,1,0,0,0,0-2Z"
            />
        </svg>
    );
};

export default Agentsflows;
