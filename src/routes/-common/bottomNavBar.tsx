import { BiSolidVideos } from "react-icons/bi";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { CgMoreO } from "react-icons/cg";
import { TCleanedNavigateOptions } from "../../helpers/types/routes";
import { appUiStore } from "../../stores/appUiStore";
import toyButton from "@assets/sounds/toy-button.mp3";
export function BottomNavBar() {
    const navigate = useNavigate({ from: "/" });
    const setPanelSidebarState = appUiStore.use.setPanelSidebarState();
    const [bottomIconSelected, setBottomIconSelected] = useState(1);

    type TBottomNavbarItems = {
        text: string;
        icon: JSX.Element;
        path: TCleanedNavigateOptions;
    }[];

    const bottomNavbarItems: TBottomNavbarItems = [
        {
            text: "Reels",
            icon: <BiSolidVideos color="white" size={"23px"} />,
            path: "/home",
        },
        {
            text: "Home",
            icon: <AiFillHome color="white" size={"23px"} />,
            path: "/home",
        },
        {
            text: "More",
            icon: <CgMoreO color="white" size={"23px"} />,
            path: "/home",
        },
    ];

    const playSound = () => {
        const audio = new Audio(toyButton); // Place your sound file in the public folder
        audio.play();
    };
    return (
        <div className="px-2 pb-1 rounded-t-[16px] bg-gradient-to-b from-[#022445] to-[#074675] ">
            <div className="flex items-center justify-between h-full text-white">
                {bottomNavbarItems.map((data, index) => {
                    return (
                        <div
                            key={index}
                            className={`flex flex-col items-center justify-center px-8 py-2 border-b-3 ${bottomIconSelected === index ? "border-black bg-black/10 backdrop-blur-sm" : "border-transparent"}`}
                            onClick={() => {
                                playSound()
                                if (index === 2) {
                                    setPanelSidebarState({ newState: true });
                                } else {
                                    setBottomIconSelected(index);
                                    navigate({ to: data.path, params: {} });
                                }
                            }}
                        >
                            {data.icon}
                            <h1 className="text-sm">{data.text}</h1>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default BottomNavBar;
