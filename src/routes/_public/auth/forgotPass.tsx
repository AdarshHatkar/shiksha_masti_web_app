import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/auth/forgotPass")({
    component: ForgotPass,
});

function ForgotPass() {
    return (
        <>
            <p>this is forgot pass page</p>
        </>
    );
}
