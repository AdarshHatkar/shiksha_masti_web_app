export const smallVibrate = () => {
    if ("vibrate" in navigator) {
        navigator.vibrate(0);
    } else {
        console.log("Vibration API not supported");
    }
};
