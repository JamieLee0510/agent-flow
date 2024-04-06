import Sidebar from "@/components/layouts/sidebar";
import Topbar from "@/components/layouts/topbar";

type Props = { children: React.ReactNode };

const Layout = (props: Props) => {
    return (
        <div className="flex overflow-hidden h-screen">
            <Sidebar />
            <div className="w-full">
                <Topbar />
                <div className="border-l-[1px] border-t-[1px] pb-20 h-screen rounded-l-3xl border-muted-foreground/20 overflow-scroll ">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
