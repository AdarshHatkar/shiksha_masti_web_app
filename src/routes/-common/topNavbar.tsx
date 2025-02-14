// import Sidebar from "./Sidebar";

import { twMerge } from "tailwind-merge";

import { Avatar, Image } from "@nextui-org/react";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import coinImg from "../../assets/images/coin3.png";
import demoUser from "../../assets/images/demoUserProfile.png";
import { TCleanedNavigateOptions } from "../../helpers/types/routes";
import { appUiStore } from "../../stores/appUiStore";
import { gamingAppStore } from "../../stores/gamingAppStore";
import { NotificationIcon } from "./svgComponents/notificationIcon";

type TTopNavbar = {
    title: string;
    isBgTransparent?: boolean;
    titleClassName?: string;
    isSidebarAccessible?: boolean;
    goBackPath?: TCleanedNavigateOptions | undefined;
    isNotificationIconVisible?: boolean;
    isEditIconVisible?: boolean;
    isHomePage?: boolean;
};

const TopNavbar = ({
    title,
    isBgTransparent = false,
    titleClassName = "",
    isSidebarAccessible = false,
    goBackPath = undefined,
    isNotificationIconVisible = false,
    isEditIconVisible = false,
    isHomePage = false,
}: TTopNavbar) => {
    const navigate = useNavigate({ from: "/" });

    const router = useRouter();
    const appName = gamingAppStore.use.appName();

    const appLogo = gamingAppStore.use.appLogo();

    const goBackFun = () => {
        if (goBackPath) {
            console.log("goBackPath", goBackPath);
            navigate({ to: goBackPath, params: {} });
        } else {
            router.history.back();
        }
    };

    // getWalletDetailsQuery.data.walletData.totalBalance >= 1000 ? getWalletDetailsQuery.data.walletData.totalBalance/1000 : getWalletDetailsQuery.data.walletData.totalBalance

    const setPanelSidebarState = appUiStore.use.setPanelSidebarState();

    return (
        <div
            style={{ zIndex: 100 }}
            className={` px-4 py-3  ${isBgTransparent ? "bg-transparent" : "bg-gradient-to-b from-[#074675] to-[#022445]"}  flex sticky top-0 items-center  justify-between rounded-b-[16px]`}
        >
            {isSidebarAccessible && (
                <div className="flex items-center gap-2">
                    <div
                        className="flex items-center justify-center overflow-hidden bg-cover rounded-full w-9 h-9"
                        onClick={() => {
                            setPanelSidebarState({ newState: true });
                        }}
                    >
                        {/* <img src={demoUser} alt="" /> */}
                        <Avatar src={appLogo} fallback={<Avatar src={demoUser} showFallback />} showFallback />
                    </div>
                    {isHomePage && <h1 className="text-xl font-bold text-white whitespace-nowrap">{appName}</h1>}
                </div>
            )}
            {!isSidebarAccessible && (
                <div className="w-10 cursor-pointer " onClick={goBackFun}>
                    <MdOutlineArrowBackIosNew className="h-full " color="white" size={25} />
                </div>
            )}

            <div>
                {!isHomePage && <p className={twMerge("text-xl font-bold text-white", titleClassName)}>{title}</p>}
            </div>
            <div className="flex gap-3">
                {isEditIconVisible && <WalletBalanceIcon />}
                {isNotificationIconVisible && (
                    <Link to="/home" className="cursor-pointer">
                        <NotificationIcon />
                    </Link>
                )}
                {!isNotificationIconVisible && <div className="w-10 cursor-pointer "></div>}
            </div>
        </div>
    );
};

export default TopNavbar;

function WalletBalanceIcon() {
    return (
        <Link to="/home" className="flex items-center gap-[2px] cursor-pointer">
            <h1 className="relative flex items-center h-[18px] p-1 pl-[26px] pr-1 text-sm font-medium text-white border-[0.2px] border-white  rounded-md">
                <div className="absolute -left-[2px]">
                    <Image src={coinImg} alt="coinImg" className="w-6" />
                </div>
                "XXX"
            </h1>
        </Link>
    );
}
