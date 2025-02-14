
import { Navigate, Outlet, createFileRoute } from "@tanstack/react-router";
import { authStore } from "../stores/authStore";

export const Route = createFileRoute("/_protected")({
    component: ProtectedLayout,
});

function ProtectedLayout() {
    const refreshToken = authStore.use.refreshToken();

    return (
        <>
            {refreshToken ? (
                <Outlet />
            ) : (
                <Navigate to={"/auth/login"} replace />
            )}
        </>
    );
}
