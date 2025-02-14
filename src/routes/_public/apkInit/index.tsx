import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/apkInit/")({
    component: ApkInitPage,
});

function ApkInitPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#074675] to-[#022445] text-white">
            <div className="flex items-center justify-center pt-10">
                <h1 className="text-3xl font-semibold text-justify text-pretty">
                    Apk Init Page
                </h1>
            </div>
        </div>
    );
}
