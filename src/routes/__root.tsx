
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: RootPage,
});

function RootPage() {
    return (
        <>
            <div className="flex h-[100%]   min-h-[100vh] bg-gray-300 sm:items-center sm:justify-center sm:pl-20 lg:items-start lg:justify-start">
                <div className=" overflow-scroll   h-[100vh]  w-[100%] bg-[white] sm:h-[100vh] sm:min-h-[96vh] sm:w-[500px] sm:rounded-[20px]">
                    <Outlet />
                </div>
            </div>
            {/* <TanStackRouterDevtools /> */}
        </>
    );
}
