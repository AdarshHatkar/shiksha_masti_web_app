import BottomNavBar from "@common/bottomNavBar";
import { SideNavbar } from "@common/sideNavbar";
import TopNavbar from "@common/topNavbar";
import { appUiStore } from "@stores/appUiStore";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ReelList from "./-components/reelList";

export const Route = createFileRoute("/_protected/reels/")({
    component: ReelsPage,
});

function ReelsPage() {
    const navigate = useNavigate();

    const isSidebarVisible = appUiStore.use.isSidebarVisible();

    return (
        <>
            <div className="  w-[100%] sm:w-[500px] min-h-screen bg-[#091B33] relative z-[100] overflow-hidden">
                <div
                    className={`absolute z-50 h-screen w-[100%] bg-transparent  left-0 top-0  overflow-auto ${isSidebarVisible ? "-translate-x-[0%]" : "-translate-x-[100%]"} transition-all duration-400`}
                >
                    <SideNavbar />
                </div>

                <div className="fixed top-0 w-[100%] sm:w-[500px] z-20 ">
                    <TopNavbar
                        title={"Reels"}
                        isNotificationIconVisible
                        // isSidebarAccessible
                        // isEditIconVisible
                        // isHomePage
                    />
                </div>

                <ReelList />

                {/* <div className="fixed bottom-0 w-[100%] sm:w-[500px] z-20">
                    <BottomNavBar />
                </div> */}
            </div>
        </>
    );
}
