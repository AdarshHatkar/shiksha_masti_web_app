import { backendEndpoint } from "@serverB2f/constants/development";

import { projectInfo } from "@b2fPortal/projectB2f/constants/projectInfo";

export let isLocalEnvironnement = true;

export let trpcBaseUrl: string;
export let restBaseUrl: string;
export let onesignalAppId: string;

export let webApkBaseUrl: string;

const projectSlug = projectInfo.slug;
const sectionSlug = projectInfo.sections.webApp.slug;

function isUrlHasPort(url: string): boolean {
    try {
        const parsedURL = new URL(url);
        return parsedURL.port !== "";
    } catch (error) {
        // URL parsing failed, return false
        return false;
    }
}

// console.log(window.location);

if (isUrlHasPort(window.location.origin) || window.location.origin.includes("-dev")) {
    // console.log(window.location.hostname);
} else {
    isLocalEnvironnement = false;
}

if (isLocalEnvironnement === true) {
    // local links

    if (import.meta.env.VITE_DEV_ENVIRONMENT_TYPE === "backend") {
        trpcBaseUrl = `${backendEndpoint.development.local}/trpc/${projectSlug}/${sectionSlug}`;
        restBaseUrl = `${backendEndpoint.development.local}/rest/${projectSlug}/${sectionSlug}`;
    } else {
        trpcBaseUrl = `${backendEndpoint.development.remote}/trpc/${projectSlug}/${sectionSlug}`;
        restBaseUrl = `${backendEndpoint.development.remote}/rest/${projectSlug}/${sectionSlug}`;
    }
    onesignalAppId = "cb424881-2e7b-4a48-93fd-d27e81d692f7";

    webApkBaseUrl = "http://localhost:3000";
} else {
    // production links

    trpcBaseUrl = `${backendEndpoint.production.remote}/trpc/${projectSlug}/${sectionSlug}`;
    restBaseUrl = `${backendEndpoint.production.remote}/rest/${projectSlug}/${sectionSlug}`;
    onesignalAppId = "92644a8d-4362-4bf2-857f-469e9ecaae39";

    webApkBaseUrl = "https://mtawar.primexop.com";
}
