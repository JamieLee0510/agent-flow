import Sidebar from "@/components/layouts/Sidebar";
import React from "react";

type Props = { children: React.ReactNode };

const Layout = (props: Props) => {
    return (
        <div className="flex overflow-hidden h-screen">
            <Sidebar />

            {props.children}
        </div>
    );
};

export default Layout;
