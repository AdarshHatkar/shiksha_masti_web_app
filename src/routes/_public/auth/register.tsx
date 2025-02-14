import { handleMobileNumberAutoFillFun } from "@b2fPortal/webApp/sectionB2f/helpers/auth";
import { webAppZodSchemas } from "@b2fPortal/webApp/trpcApi/zodSchemas";
import { FadeInAnimation } from "@common/framerMotion/fadeInAnimation";
import { trpcErrorHandler, trpcResponseHandler } from "@helpers/trpc/handlers";
import { backendV1 } from "@helpers/trpc/trpc";
import { myToast } from "@helpers/utilityHelper";
import { Button } from "@nextui-org/react";
import { authStore } from "@stores/authStore";
import { userStore } from "@stores/userStore";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import confetti from "canvas-confetti";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import { z } from "zod";

export const Route = createFileRoute("/_public/auth/register")({
    component: RegisterPage,
});

function RegisterPage() {
    const navigate = useNavigate();

    const setAuthData = authStore.use.setAuthData();
    const setUserData = userStore.use.setUserData();

    const registerMutation = backendV1.auth.register.useMutation();
    const registerMutationSchema = webAppZodSchemas.auth.register;
    type TRegisterMutationSchema = z.infer<typeof registerMutationSchema> & {
        confirmPassword: string;
    };
    const registerForm = useForm<TRegisterMutationSchema>();

    const onSubmit = async (formDataRaw) => {
        try {
            // console.log({ formDataRaw });
            if (formDataRaw.password !== formDataRaw.confirmPassword) {
                Swal.fire({
                    icon: "error",
                    title: "Password Mismatch",
                    html: "Password and Confirm Password should be same",
                });
                return;
            }

            if (formDataRaw.referralCode === "") {
                formDataRaw.referralCode = undefined;
            }

            formDataRaw.mobileNumber = handleMobileNumberAutoFillFun(formDataRaw.mobileNumber);
            const formData = await registerMutationSchema.parseAsync(formDataRaw);

            // console.log({ formData });
            // return;
            // let response = await mutateAsync(formData)
            const response = await registerMutation.mutateAsync(formData);

            trpcResponseHandler(response);
            const res = response;

            if (res.status === "success") {
                const { accessToken, refreshToken, userData } = res.result;
                const { username, firstName, lastName } = userData;

                setAuthData({ accessToken, refreshToken });
                setUserData({ username, firstName, lastName });

                myToast.fire({
                    icon: "success",
                    title: "Registration Successful",
                    position: "top",
                });
                confetti();

                // navigate(`/dashboard`, { replace: true })
                navigate({ to: "/home", replace: true });
            }
        } catch (error) {
            trpcErrorHandler(error);
        }
    };

    return (
        <>
            <div className="h-screen max-h-screen bg-gradient-to-b from-[#074675] to-[#022445] text-white flex flex-col">
                <div className="flex items-center justify-center pt-10 h-[10vh] ">
                    <h1 className="text-3xl font-semibold text-justify">App Name</h1>
                </div>
                <FadeInAnimation>
                    <div className="h-[90vh] flex flex-col justify-evenly pb-10 ">
                        <div className="pt-4 pl-6 ">
                            <h1 className="text-3xl">Register</h1>
                        </div>

                        <div className="p-5 mt-4 text-gray-400">
                            <form onSubmit={registerForm.handleSubmit(onSubmit)}>
                                <div className="flex items-center justify-between gap-2">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        className="w-1/2 py-1 text-lg transition-colors duration-500 bg-transparent border-b focus:outline-none focus:border-white focus:border-b-2 peer"
                                        {...registerForm.register("firstName")}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        className="w-1/2 py-1 text-lg transition-colors duration-500 bg-transparent border-b focus:outline-none focus:border-white focus:border-b-2 peer"
                                        {...registerForm.register("lastName")}
                                    />
                                </div>

                                <div className="relative pt-4">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        className="w-full py-1 text-lg transition-colors duration-500 bg-transparent border-b focus:outline-none focus:border-white focus:border-b-2 peer"
                                        maxLength={20}
                                        {...registerForm.register("username")}
                                    />
                                </div>

                                <div className="relative flex pt-4">
                                    <input
                                        type="text"
                                        value="+91"
                                        className="w-1/5 py-1 text-lg transition-colors duration-500 bg-transparent border-b focus:outline-none focus:border-white focus:border-b-2 peer"
                                        readOnly
                                        {...registerForm.register("countryCode")}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Mobile Number"
                                        className="w-full py-1 text-lg transition-colors duration-500 bg-transparent border-b focus:outline-none focus:border-white focus:border-b-2 peer"
                                        maxLength={10}
                                        {...registerForm.register("mobileNumber")}
                                    />
                                </div>
                                <div className="relative pt-4">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full py-1 text-lg transition-colors duration-500 bg-transparent border-b focus:outline-none focus:border-white focus:border-b-2 peer"
                                        {...registerForm.register("email")}
                                    />
                                </div>

                                <div className="relative pt-4">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="w-full py-1 text-lg transition-colors duration-500 bg-transparent border-b focus:outline-none focus:border-white focus:border-b-2 peer"
                                        {...registerForm.register("password")}
                                    />
                                </div>

                                <div className="relative pt-4">
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        className="w-full py-1 text-lg transition-colors duration-500 bg-transparent border-b focus:outline-none focus:border-white focus:border-b-2 peer"
                                        {...registerForm.register("confirmPassword")}
                                    />
                                </div>
                                <div className="relative pt-4">
                                    <input
                                        placeholder="Referral Code (Optional)"
                                        className="w-full py-1 text-lg transition-colors duration-500 bg-transparent border-b focus:outline-none focus:border-white focus:border-b-2 peer"
                                        {...registerForm.register("referralCode")}
                                    />
                                </div>

                                <div className="pt-3">
                                    <span className="text-sm text-gray-500">
                                        By registering you accept our{" "}
                                        <a href="/" className="text-blue-500">
                                            Terms & Conditions
                                        </a>
                                    </span>
                                </div>

                                <div className="mt-6 font-[600]">
                                    <Button
                                        type="submit"
                                        className="flex justify-center w-full py-3 text-white text-[20px] bg-blue-500"
                                        isLoading={registerMutation.isLoading}
                                    >
                                        Register
                                    </Button>
                                </div>
                            </form>
                            <div className="flex justify-center w-full pt-5 text-2xl">
                                <span className="text-gray-500">
                                    Existing user?{" "}
                                    <Link to="/auth/login" className="text-blue-500">
                                        Login
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </FadeInAnimation>
            </div>
        </>
    );
}
