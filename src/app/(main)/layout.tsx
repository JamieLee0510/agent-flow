import Sidebar from "@/components/layouts/Sidebar";
import Topbar from "@/components/layouts/Topbar";

type Props = { children: React.ReactNode };

const Layout = (props: Props) => {
    return (
        <div className="flex overflow-hidden h-screen">
            <Sidebar />
            <div className="w-full">
                <Topbar />
                {props.children}
            </div>
        </div>
    );
};

export default Layout;
