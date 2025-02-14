declare const router: import("express-serve-static-core").Router;
export { router as dummyxWebAppTrpcRestRouter };
export declare const dummyxWebAppTrpcRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: object;
    meta: object;
    errorShape: never;
    transformer: typeof import("superjson").default;
}>, {
    auth: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
        ctx: object;
        meta: object;
        errorShape: never;
        transformer: typeof import("superjson").default;
    }>, {
        register: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: object;
                meta: object;
                errorShape: never;
                transformer: typeof import("superjson").default;
            }>;
            _meta: object;
            _ctx_out: {
                mysqlDB: import("../../../../prisma/dummyx/generatedClient/index.js").PrismaClient<{
                    transactionOptions: {
                        isolationLevel: "Serializable";
                    };
                }, never, import("../../../../prisma/dummyx/generatedClient/runtime/library.js").DefaultArgs>;
            };
            _input_in: {
                firstName?: string;
                lastName?: string;
                username?: string;
                email?: string;
                mobileNumber?: string;
                countryCode?: string;
                password?: string;
                referralCode?: string;
            };
            _input_out: {
                firstName?: string;
                lastName?: string;
                username?: string;
                email?: string;
                mobileNumber?: string;
                countryCode?: string;
                password?: string;
                referralCode?: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            status: "error" | "success";
            message: string;
            result?: {
                accessToken: string;
                refreshToken: string;
                userData: {
                    username: string;
                    firstName: string;
                    lastName: string;
                };
            };
        }>;
        login: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: object;
                meta: object;
                errorShape: never;
                transformer: typeof import("superjson").default;
            }>;
            _meta: object;
            _ctx_out: {
                mysqlDB: import("../../../../prisma/dummyx/generatedClient/index.js").PrismaClient<{
                    transactionOptions: {
                        isolationLevel: "Serializable";
                    };
                }, never, import("../../../../prisma/dummyx/generatedClient/runtime/library.js").DefaultArgs>;
            };
            _input_in: {
                password?: string;
                emailOrMobileNumberOrUsername?: string;
            };
            _input_out: {
                password?: string;
                emailOrMobileNumberOrUsername?: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            status: "error" | "success";
            message: string;
            result?: {
                accessToken: string;
                refreshToken: string;
                userData: {
                    username: string;
                    firstName: string;
                    lastName: string;
                };
            };
        }>;
        refreshToken: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: object;
                meta: object;
                errorShape: never;
                transformer: typeof import("superjson").default;
            }>;
            _meta: object;
            _ctx_out: {
                mysqlDB: import("../../../../prisma/dummyx/generatedClient/index.js").PrismaClient<{
                    transactionOptions: {
                        isolationLevel: "Serializable";
                    };
                }, never, import("../../../../prisma/dummyx/generatedClient/runtime/library.js").DefaultArgs>;
            };
            _input_in: {
                refreshToken?: string;
            };
            _input_out: {
                refreshToken?: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            status: "error" | "success";
            message: string;
            result?: {
                accessToken: string;
            };
        }>;
    }>;
    user: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
        ctx: object;
        meta: object;
        errorShape: never;
        transformer: typeof import("superjson").default;
    }>, {
        profile: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
            ctx: object;
            meta: object;
            errorShape: never;
            transformer: typeof import("superjson").default;
        }>, {
            getProfile: import("@trpc/server").BuildProcedure<"query", {
                _config: import("@trpc/server").RootConfig<{
                    ctx: object;
                    meta: object;
                    errorShape: never;
                    transformer: typeof import("superjson").default;
                }>;
                _meta: object;
                _ctx_out: {
                    payload: import("../helpers/jwtHelper.js").WebAppUserAccessTokenPayloadType;
                    mysqlDB: import("../../../../prisma/dummyx/generatedClient/index.js").PrismaClient<{
                        transactionOptions: {
                            isolationLevel: "Serializable";
                        };
                    }, never, import("../../../../prisma/dummyx/generatedClient/runtime/library.js").DefaultArgs>;
                };
                _input_in: void;
                _input_out: void;
                _output_in: typeof import("@trpc/server").unsetMarker;
                _output_out: typeof import("@trpc/server").unsetMarker;
            }, {
                status: "error" | "success";
                message: string;
                result?: {
                    username: string;
                    email: string;
                    mobileNumber: string;
                    firstName: string;
                    lastName: string;
                };
            }>;
            updateProfile: import("@trpc/server").BuildProcedure<"mutation", {
                _config: import("@trpc/server").RootConfig<{
                    ctx: object;
                    meta: object;
                    errorShape: never;
                    transformer: typeof import("superjson").default;
                }>;
                _meta: object;
                _ctx_out: {
                    payload: import("../helpers/jwtHelper.js").WebAppUserAccessTokenPayloadType;
                    mysqlDB: import("../../../../prisma/dummyx/generatedClient/index.js").PrismaClient<{
                        transactionOptions: {
                            isolationLevel: "Serializable";
                        };
                    }, never, import("../../../../prisma/dummyx/generatedClient/runtime/library.js").DefaultArgs>;
                };
                _input_in: {
                    firstName?: string;
                    lastName?: string;
                    username?: string;
                    email?: string;
                    mobileNumber?: string;
                };
                _input_out: {
                    firstName?: string;
                    lastName?: string;
                    username?: string;
                    email?: string;
                    mobileNumber?: string;
                };
                _output_in: typeof import("@trpc/server").unsetMarker;
                _output_out: typeof import("@trpc/server").unsetMarker;
            }, {
                status: "error" | "success";
                message: string;
                result?: {
                    userId: number;
                    firstName: string;
                    lastName: string;
                    username: string;
                    email: string;
                    passwordHash: string;
                    updatedAt: number;
                    createdAt: number;
                    mobileNumber: string;
                    countryCode: string;
                    gender: import("../../../../prisma/dummyx/generatedClient/index.js").$Enums.users_gender;
                    wallet: number;
                };
            }>;
        }>;
    }>;
}>;
export type webAppTrpcRouterTypes = typeof dummyxWebAppTrpcRouter;
