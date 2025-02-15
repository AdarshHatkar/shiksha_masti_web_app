import BottomNavBar from "@common/bottomNavBar";
import { FadeInAnimation } from "@common/framerMotion/fadeInAnimation";
import { SideNavbar } from "@common/sideNavbar";
import TopNavbar from "@common/topNavbar";
import { Image } from "@nextui-org/react";
import { appUiStore } from "@stores/appUiStore";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import memoryGame from "@assets/images/memoryGame.avif";
import mathGame from "@assets/images/mathGame.jpg";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export const Route = createFileRoute("/_protected/home/")({
    component: HomePage,
});

function HomePage() {
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
                        title={"Hello User"}
                        isNotificationIconVisible
                        isSidebarAccessible

                        isHomePage
                    />
                </div>
                <FadeInAnimation>
                    <div className="h-screen pb-32 overflow-scroll">
                        <h1 className="pt-16 text-center text-white"> </h1>

                        <br />
                        <div className="flex flex-col items-center w-full gap-7 ">


                            <Image src={memoryGame} alt="memoryGame" className="w-full max-w-[350px]" onClick={() => {
                                navigate({
                                    to: "/memoryGame"
                                });
                            }} />
                            <Image src={mathGame} alt="mathGame" className="w-full max-w-[350px]" onClick={() => {
                                navigate({
                                    to: "/mathGame"
                                });
                            }} />


                            {/* <Button
                                className="text-black"
                                onClick={() => {
                                    navigate({
                                        to: "/mathGame"
                                    });
                                }}>
                                Math Game
                            </Button>
                            <Button
                                className="text-black"
                                onClick={() => {
                                    navigate({
                                        to: "/memoryGame"
                                    });
                                }}>
                                Memory Game
                            </Button> */}
                        </div>

                    </div>
                </FadeInAnimation>

                <div className="fixed bottom-0 w-[100%] sm:w-[500px] z-20">
                    <BottomNavBar />
                </div>
            </div>
        </>
    );
}
