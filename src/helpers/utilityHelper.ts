import { getCurrentTimeStampInSeconds } from "modern-time-utils";
import moment from "moment/moment";
import Swal from "sweetalert2";

export const myToast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

export const unixTimeStampInSeconds = getCurrentTimeStampInSeconds;

export const teamNumToText = (num: number) => {
    let text = "";
    switch (num) {
        case 1:
            text = "Solo";
            break;
        case 2:
            text = "Duo";
            break;
        case 3:
            text = "Trio";
            break;
        case 4:
            text = "Squad";
            break;

        default:
            text = num + "";
            break;
    }
    return text;
};

export const timeDifferenceInText = (timeStamp: number) => {
    const now = moment(new Date()); //todays date
    const end = moment(timeStamp);
    const duration = moment.duration(end.diff(now));
    const daysInNumber = duration.days();
    const hoursInNumber = duration.hours();
    const minutesInNumber = duration.minutes();
    const secondsInNumber = duration.seconds();
    // console.log(seconds);

    let daysSectionText;
    daysInNumber > 1
        ? (daysSectionText = `${daysInNumber} Days :`)
        : (daysSectionText = `${daysInNumber} Day :`);

    let hoursSectionText;
    hoursInNumber > 1
        ? (hoursSectionText = `${hoursInNumber} Hours :`)
        : (hoursSectionText = `${hoursInNumber} Hour :`);

    let minutesSectionText;
    minutesInNumber > 1
        ? (minutesSectionText = `${minutesInNumber} ${daysInNumber > 1 ? `Mins` : `Minutes`} :`)
        : (minutesSectionText = `${minutesInNumber} ${daysInNumber > 1 ? `Min` : `Minute`} :`);

    let secondsSectionText;
    secondsInNumber > 1
        ? (secondsSectionText = `${secondsInNumber} Seconds`)
        : (secondsSectionText = `${secondsInNumber} Second`);

    daysInNumber < 1 ? (daysSectionText = "") : true;

    daysInNumber < 1 && hoursInNumber < 1 ? (hoursSectionText = "") : true;

    hoursInNumber < 1 && minutesInNumber < 1 ? (minutesSectionText = "") : true;

    minutesInNumber < 1 && secondsInNumber < 1
        ? (secondsSectionText = "")
        : true;

    let timeInText = "";

    timeInText = `${daysSectionText} ${hoursSectionText} ${minutesSectionText} ${secondsSectionText}`;

    if (duration.asSeconds() < 0) {
        timeInText = `Timer Expired`;
    }
    return { timeInText, differenceInSeconds: duration.asSeconds() };
};

export const convertToTwoDecimalInt = (data: string): number => {
    return +parseFloat(data).toFixed(2);
};
// export const convertToInt = convertToInt

export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function sleepInMs(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function convertCamelToNormalCapitalized(
    camelCaseString: string
): string {
    // Split the camelCase string into words
    const words = camelCaseString
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .split(/[\s_]+/);

    // Capitalize each word
    const capitalizedWords = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );

    // Join the capitalized words to form the normal capitalized string
    const normalCapitalizedString = capitalizedWords.join(" ");

    return normalCapitalizedString;
}
