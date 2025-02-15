import { createFileRoute } from "@tanstack/react-router";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { Button } from "@nextui-org/react";
import logo from "@assets/images/sm_logo.jpg";
import TopNavbar from "@common/topNavbar";
import { useState } from "react";

export const Route = createFileRoute("/_protected/leaderboard/")({
  component: LeaderboardPage,
});

function LeaderboardPage() {
  const [selected, setSelected] = useState<string>("today");

  return (
    <>
      <div className="bg-[#EBF3FE] min-h-screen w-full">
        <TopNavbar
          title="Leaderboard"
          isBgTransparent={true}
          titleClassName="text-black"


        />
        <div className="px-2">
          <div className=" mt-12 w-[90%] sm:w-[80%] mx-auto">
            <div className="flex flex-row items-center justify-between">
              <Button
                className={`text-xl px-6 font-medium bg-[#EBF3FE] rounded-3xl focus:bg-white focus:ring-1 focus:ring-blue-500 ${selected === "today" ? "bg-white ring-1 ring-blue-500" : ""
                  }`}
                onClick={() => setSelected("today")}
              >
                Today
              </Button>
              <Button className={`text-xl px-6 font-medium bg-[#EBF3FE] rounded-3xl focus:bg-white focus:ring-1 focus:ring-blue-500 ${selected === "week" ? "bg-white ring-1 ring-blue-500" : ""
                }`}
                onClick={() => setSelected("week")}>
                Week
              </Button>
              <Button className={`text-xl px-6 font-medium bg-[#EBF3FE] rounded-3xl focus:bg-white focus:ring-1 focus:ring-blue-500 ${selected === "month" ? "bg-white ring-1 ring-blue-500" : ""
                }`}
                onClick={() => setSelected("month")}>
                Month
              </Button>
            </div>
          </div>
          <div className="items-center justify-center mt-20">
            <div className="flex flex-row items-end pt-10 bg-[#EBF3FE]">
              <div className="relative flex justify-center w-1/3 py-10 bg-white bg-cover rounded-tl-3xl rounded-bl-3xl">
                <div className="absolute bottom-32 h-[88px] w-[88px] md:h-[100px] md:w-[100px] items-center justify-center  rounded-full border-[4px] border-sky-500 bg-white">
                  <img className="w-full h-full rounded-full" src={logo} alt="" />
                  <div className="absolute bottom-0 w-6 h-6 translate-y-1/2 rounded-full bg-sky-500 ml-7 md:ml-9">
                    <h1 className="ml-2 font-bold text-white">2</h1>
                  </div>
                </div>
                <ul className="text-center">
                  <p className="font-bold ">Emma Aria</p>
                  <p className="font-bold text-sky-500">1734</p>
                  <p className="text-sm text-gray-500">@username</p>
                </ul>
              </div>

              <div className="relative flex w-1/3 justify-center  bg-cover bg-[#BBC2D0] py-16 rounded-t-[30px]">
                <div className="absolute -top-2 -translate-y-1/2  h-[88px] w-[88px] md:h-[100px] md:w-[100px]  items-center justify-center  rounded-full border-[4px] border-yellow-500 bg-white">
                  <img className="w-full h-full rounded-full" src={logo} alt="" />
                  <div className="absolute bottom-0 items-center w-6 h-6 translate-y-1/2 bg-yellow-500 rounded-full ml-7 md:ml-9">
                    <h1 className="ml-2 font-bold text-white">1</h1>
                  </div>
                </div>
                <ul className="text-center">
                  <p className="font-bold text-white">Emma Aria</p>
                  <p className="font-bold text-yellow-500">1734</p>
                  <p className="text-sm text-gray-500">@username</p>
                </ul>
              </div>
              <div className="relative flex justify-center w-1/3 py-10 bg-white bg-cover rounded-tr-3xl rounded-br-3xl">
                <div className="absolute bottom-32  h-[88px] w-[88px] md:h-[100px] md:w-[100px]  items-center justify-center  rounded-full border-[4px] border-[#5FFE3B] bg-white ">
                  <img className="w-full h-full rounded-full" src={logo} alt="" />
                  <div className="absolute bottom-0 items-center w-6 h-6 translate-y-1/2 bg-[#5FFE3B] rounded-full ml-7 md:ml-9">
                    <h1 className="ml-2 font-bold text-white">3</h1>
                  </div>
                </div>
                <ul className="text-center ">
                  <p className="font-bold ">Emma Aria</p>
                  <p className="font-bold text-[#5FFE3B]">1734</p>
                  <p className="text-sm text-gray-500">@username</p>
                </ul>
              </div>

              <div></div>
            </div>
          </div>

          <div className="bg-white justify-between p-2 rounded-tl-[30px] rounded-tr-[30px] pb-8 hover:border-red-600 mt-10">
            <div className="flex items-center gap-4 p-4">
              <div className="relative">
                <div className="h-[70px] w-[70px] rounded-full bg-black flex items-center justify-center shadow-lg">
                  <img className="w-full h-full rounded-full" src={logo} alt="Profile" />
                </div>
              </div>

              <div className="flex-1">
                <p className="text-lg font-bold">Sebastian</p>
                <p className="text-xs text-gray-500">@username</p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <p className="text-lg font-bold">1104</p>
                <BiSolidDownArrow size={16} className="text-red-500 " />
              </div>
            </div>
            <hr className="w-full text-gray-900 text-2 hover:text-blue-500" />

            <div className="flex items-center gap-4 p-4">
              <div className="relative">
                <div className="h-[70px] w-[70px] rounded-full bg-black flex items-center justify-center shadow-lg">
                  <img className="w-full h-full rounded-full" src={logo} alt="Profile" />
                </div>
              </div>

              <div className="flex-1">
                <p className="text-lg font-bold">Sebastian</p>
                <p className="text-xs text-gray-500">@username</p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <p className="text-lg font-bold">1104</p>
                <BiSolidUpArrow size={16} className="text-green-500" />
              </div>
            </div>
            <hr className="w-full text-gray-900 text-2 hover:text-blue-500" />
            <div className="flex items-center gap-4 p-4">
              <div className="relative">
                <div className="h-[70px] w-[70px] rounded-full bg-black flex items-center justify-center shadow-lg">
                  <img className="w-full h-full rounded-full" src={logo} alt="Profile" />
                </div>
              </div>

              <div className="flex-1">
                <p className="text-lg font-bold">Sebastian</p>
                <p className="text-xs text-gray-500">@username</p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <p className="text-lg font-bold">1104</p>
                <BiSolidUpArrow size={16} className="text-green-500" />
              </div>
            </div>
            <hr className="w-full text-gray-900 text-2 hover:text-blue-500" />
            <div className="flex items-center gap-4 p-4">
              <div className="relative">
                <div className="h-[70px] w-[70px] rounded-full bg-black flex items-center justify-center shadow-lg">
                  <img className="w-full h-full rounded-full" src={logo} alt="Profile" />
                </div>
              </div>

              <div className="flex-1">
                <p className="text-lg font-bold">Sebastian</p>
                <p className="text-xs text-gray-500">@username</p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <p className="text-lg font-bold">1104</p>
                <BiSolidDownArrow size={16} className="text-red-500 " />
              </div>
            </div>
            <hr className="w-full text-gray-900 text-2 hover:text-blue-500" />
            <div className="flex items-center gap-4 p-4">
              <div className="relative">
                <div className="h-[70px] w-[70px] rounded-full bg-black flex items-center justify-center shadow-lg">
                  <img className="w-full h-full rounded-full" src={logo} alt="Profile" />
                </div>
              </div>

              <div className="flex-1">
                <p className="text-lg font-bold">Sebastian</p>
                <p className="text-xs text-gray-500">@username</p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <p className="text-lg font-bold">1104</p>
                <BiSolidUpArrow size={16} className="text-green-500" />
              </div>
            </div>
            <hr className="w-full text-gray-900 text-2 hover:text-blue-500" />
          </div>
        </div>
      </div>
    </>
  );
}