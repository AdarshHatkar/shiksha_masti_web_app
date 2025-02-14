import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";
import { AliasOptions, defineConfig } from "vite";
import checker from "vite-plugin-checker";
import { qrcode } from "vite-plugin-qrcode";
// https://vitejs.dev/config/
const devPlugins = [
    react(),
    TanStackRouterVite(),
    checker({
        typescript: true,
    }),
    qrcode(),
];

const productionPlugins = devPlugins;

const aliasObj: AliasOptions = {
    "@assets": path.resolve(__dirname, "./src/assets"),
    "@stores": path.resolve(__dirname, "./src/stores"),
    "@helpers": path.resolve(__dirname, "./src/helpers"),
    "@common": path.resolve(__dirname, "./src/routes/-common"),

    "@b2fPortal": path.resolve(__dirname, "./b2fPortal"),
    "@serverB2f": path.resolve(__dirname, "./b2fPortal/serverB2f"),
    "@dummyxPrisma": path.resolve(__dirname, "./b2fPortal/prisma/dummyx"),
    "@dummyxProjectB2f": path.resolve(__dirname, "./b2fPortal/projectB2f"),
};

export default defineConfig(({ command }) => {
    if (command === "serve") {
        return {
            plugins: devPlugins,
            build: {
                outDir: "dist",
            },
            server: {
                port: 3003,
                host: "127.0.0.1",
            },
            assetsInclude: ["**/*.lottie"],
            resolve: {
                alias: aliasObj,
            },
        };
    } else {
        // command === 'build'
        return {
            plugins: productionPlugins,
            resolve: {
                alias: aliasObj,
            },
        };
    }
});
