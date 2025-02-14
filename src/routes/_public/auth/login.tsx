import { Button } from "@nextui-org/react";
import { Link, Navigate, createFileRoute, useNavigate } from "@tanstack/react-router";
import confetti from "canvas-confetti";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook } from "react-icons/im";

import { trpcErrorHandler, trpcResponseHandler } from "@helpers/trpc/handlers";
import { backendV1 } from "@helpers/trpc/trpc";
import { myToast } from "@helpers/utilityHelper";
import { authStore } from "@stores/authStore";
import { gamingAppStore } from "@stores/gamingAppStore";
import { userStore } from "@stores/userStore";

import { webAppZodSchemas } from "@b2fPortal/webApp/trpcApi/zodSchemas";
import deployJson from "../../../../deploy.json";
import { FadeInAnimation } from "@common/framerMotion/fadeInAnimation";

export const Route = createFileRoute("/_public/auth/login")({
    component: LoginPage,
});

function LoginPage() {
    const navigate = useNavigate({ from: Route.fullPath });
    const loginForm = useForm();
    const setAuthData = authStore.use.setAuthData();
    const setUserData = userStore.use.setUserData();
    const refreshToken = authStore.use.refreshToken();
    const appName = gamingAppStore.use.appName();

    const loginMutation = backendV1.auth.login.useMutation();
    // const backendV1Utils = backendV1.useUtils();

    const onSubmit = async (formDataRaw) => {
        try {
            // console.log({ formDataRaw });

            const formData = await webAppZodSchemas.auth.login.parseAsync(formDataRaw);

            // console.log({ formData });
            // return;
            // let response = await mutateAsync(formData)
            const response = await loginMutation.mutateAsync(formData);

            trpcResponseHandler(response);
            const res = response;

            // console.log(res);

            if (res.status === "success") {
                const { accessToken, refreshToken, userData } = res.result;
                const { username, firstName, lastName } = userData;

                setAuthData({ accessToken, refreshToken });

                setUserData({ username, firstName, lastName });

                myToast.fire({
                    icon: "success",
                    title: "Login Successful",
                    position: "top",
                });
                confetti();

                navigate({ to: "/home", replace: true });
            }
        } catch (error) {
            trpcErrorHandler(error);
        }
    };

    if (refreshToken !== "") {
        return <Navigate to="/home" />;
    }

    const comingSoonFun = () => {
        myToast.fire({
            icon: "info",
            title: "Coming Soon...",
            position: "top",
        });
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-[#074675] to-[#022445] text-white">
                <div className="flex items-center justify-center pt-10">
                    <h1 className="text-3xl font-semibold text-justify text-pretty">{appName}</h1>
                </div>
                <FadeInAnimation>
                    <div className="pl-6 pt-14">
                        <h1 className="text-3xl">Login</h1>
                    </div>

                    <div className="p-5 pt-10 mt-10 text-gray-400">
                        <form onSubmit={loginForm.handleSubmit(onSubmit)}>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Email / Mobile Number / Username"
                                    defaultValue={"support@primexop.com"}
                                    className="w-full py-1 text-lg transition-colors duration-500 bg-transparent border-b focus:outline-none focus:border-white focus:border-b-2 peer"
                                    {...loginForm.register("emailOrMobileNumberOrUsername")}
                                />
                            </div>

                            <div className="relative pt-8">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    defaultValue={"9834877006"}
                                    className="w-full py-1 text-lg transition-colors duration-500 bg-transparent border-b focus:outline-none focus:border-white focus:border-b-2 peer"
                                    {...loginForm.register("password")}
                                />

                                <input type="checkbox" id="checkbox" className="mt-5 mr-2" />
                                <label htmlFor="checkbox">Remember me</label>
                            </div>

                            <div className="mt-10 font-[600]">
                                <Button
                                    type="submit"
                                    className="flex justify-center w-full py-3 text-white text-[20px] bg-blue-500"
                                    isLoading={loginMutation.isLoading}
                                >
                                    Login
                                </Button>
                            </div>
                        </form>
                        <div className="flex justify-center w-full pt-5 text-2xl">
                            <span className="text-gray-500">
                                New user?{" "}
                                <Link to="/auth/register" className="text-blue-500">
                                    Register
                                </Link>
                            </span>
                        </div>

                        <div className="flex h-[70px] w-full items-center relative justify-around mt-6 ">
                            <div className="absolute h-[40%] w-[30%] border-t left-3 bottom-2  border-gray-500"></div>
                            <span className="absolute ">Social Logins</span>
                            <div className="absolute h-[40%] w-[30%] border-t right-3 bottom-2 border-gray-500"></div>
                        </div>

                        <div className="flex justify-around w-full mt-5">
                            <Button
                                className="flex justify-around w-[45%] text-center bg-transparent border-gray-500 border-1"
                                onClick={comingSoonFun}
                            >
                                <span className="text-white font-[600] flex items-center">
                                    <ImFacebook className="mr-3 text-blue-400" /> Facebook
                                </span>
                            </Button>
                            <Button
                                className="flex justify-around w-[45%]  text-center bg-transparent border-gray-500 border-1"
                                onClick={comingSoonFun}
                            >
                                <span className="text-white font-[600] flex items-center">
                                    <FcGoogle className="mr-3" /> Google
                                </span>
                            </Button>
                        </div>
                    </div>
                    <div className="text-center">
                        <p>Ga Version : {deployJson.version}</p>
                        {/* <p>Last Updated : {moment(deployJson.last_deploy).format('MMMM Do YYYY, h:mm:ss a')} </p> */}
                    </div>
                </FadeInAnimation>
            </div>
        </>
    );
}
