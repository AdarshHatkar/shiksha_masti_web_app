export const sanitizeUsername = (rawUsername: string): string => {
    // Trim leading and trailing whitespace
    let sanitizedUsername = rawUsername.trim();

    // Removing all starting numbers
    sanitizedUsername = sanitizedUsername.replace(/^\d+/, "");

    // Replace multiple spaces between words with a single space
    sanitizedUsername = sanitizedUsername.replace(/\s+/g, " ");

    // Replace remaining spaces with underscores
    sanitizedUsername = sanitizedUsername.replace(/ /g, "_");

    // Replace all characters except alphanumeric and underscores
    sanitizedUsername = sanitizedUsername.replace(/[^\w_]/g, "");

    // Convert to lowercase
    sanitizedUsername = sanitizedUsername.toLowerCase();

    return sanitizedUsername;
};

export const handleMobileNumberAutoFillFun = (
    rawMobileNumberString: string
) => {
    let correctedMobileNumberString: string;
    if (rawMobileNumberString.startsWith("+")) {
        correctedMobileNumberString = rawMobileNumberString.slice(-10);
    } else if (rawMobileNumberString.startsWith("0")) {
        correctedMobileNumberString = rawMobileNumberString.slice(-10);
    } else {
        correctedMobileNumberString = rawMobileNumberString;
    }
    return correctedMobileNumberString;
};

export const emailOrMobileNumberOrUsernameValidate = (
    inputString: string
): string => {
    // Regular expressions for email, username, and mobile number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
    const mobileNumberRegex = /^\d{10}$/;
    // console.log('inputString', inputString);

    // Check if the input string matches any of the patterns
    if (emailRegex.test(inputString)) {
        return inputString;
    } else if (usernameRegex.test(inputString)) {
        return inputString;
    } else if (mobileNumberRegex.test(inputString)) {
        return inputString;
    } else if (inputString.startsWith("+") || inputString.startsWith("0")) {
        console.log("found + or 0");

        // If it does, return the last 10 characters of the string
        return handleMobileNumberAutoFillFun(inputString);
    } else {
        return inputString;
    }
};
