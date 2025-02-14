const webApkInterface = {
    openInBrowser: async (
        url: string | URL | undefined,
        openInBlank = false,
        focus = false
    ) => {
        try {
            console.log(url);
            if (!url) {
                return;
            }
            if (url === "#") {
                return;
            }
            if (url === "") {
                return;
            }
            console.log("clicked");
            window.Android.openInBrowser(url);
        } catch (err) {
            console.log(err);

            if (openInBlank) {
                if (focus) {
                    window?.open(url as string, "_blank")?.focus();
                } else {
                    window.open(url as string, "_blank");
                }
            } else {
                window.location.href = url as string;
            }
        }
    },
    openInBrowserInline: (url: string | URL, openInBlank = false) => {
        return async () => {
            try {
                console.log(url);
                if (!url) {
                    return;
                }
                if (url === "#") {
                    return;
                }
                if (url === "") {
                    return;
                }
                console.log("clicked");
                window.Android.openInBrowser(url);
            } catch (err) {
                console.log(err);

                if (openInBlank) {
                    window.open(url, "_blank");
                } else {
                    window.location.href = url as string;
                }
            }
        };
    },
    showToast: async (msg: string) => {
        try {
            // console.log('Android');
            // console.log('clicked showToast');

            window.Android.showToast(msg);
        } catch (err) {
            console.log(err);
        }
    },
    hideSplashScreen: async () => {
        try {
            // console.log('Android');
            // console.log('clicked showToast');

            window.Android.hideSplashScreen();
        } catch (err) {
            console.log(err);
        }
    },
    initOnesignalFun: (appId: string) => {
        try {
            const data = {
                appId: appId,
            };
            if (!window?.Android) {
                console.log("web version");
                return false;
            }

            const jsonData = JSON.stringify(data);
            window?.Android?.initOnesignal(jsonData);

            // setTimeout(() => {
            //     try {
            //         window?.Android?.getOnesignalPlayerId();

            //     } catch (error) {
            //         console.log(error);
            //     }
            // }, 1000 * 3);
        } catch (error) {
            console.log(error);
        }
    },
    setOnesignalExternalIdFun: (externalId: string) => {
        try {
            const data = {
                externalId,
            };
            if (!window?.Android) {
                console.log("web version");
                return false;
            }

            const jsonData = JSON.stringify(data);
            window?.Android?.setOnesignalExternalId(jsonData);
        } catch (error) {
            console.log(error);
        }
    },
    removeOnesignalExternalIdFun: () => {
        try {
            if (!window?.Android) {
                console.log("web version");
                return false;
            }

            window?.Android?.removeOnesignalExternalId();
        } catch (error) {
            console.log(error);
        }
    },
    setStatusBarColor: async (hexString: string) => {
        try {
            // console.log('Android');
            // console.log('clicked showToast');

            window?.Android?.setStatusBarColor(hexString);
        } catch (err) {
            console.log(err);
        }
    },
};

export default webApkInterface;
