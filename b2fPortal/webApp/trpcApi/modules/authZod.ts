import { z } from "zod";
import {
    emailOrMobileNumberOrUsernameValidate,
    sanitizeUsername,
} from "../../sectionB2f/helpers/auth.js";

export const authZodSchema = {
    register: z.object({
        firstName: z
            .string()
            .trim()
            .min(1, { message: "First Name is required" })
            .max(50, { message: "First Name must be at most 50 characters" }),
        lastName: z
            .string()
            .trim()
            .min(1, { message: "Last Name is required" })
            .max(50, { message: "Last Name must be at most 50 characters" }),
        username: z
            .string()
            .trim()
            .min(1, { message: "Username is required" })
            .max(20, { message: "Username must be at most 20 characters" })
            .transform(sanitizeUsername),
        countryCode: z
            .string()
            .trim()
            .min(1, { message: "Country Code is required" })
            .max(5, { message: "Country Code must be at most 5 characters" }),
        mobileNumber: z
            .string()
            .trim()
            .min(10, { message: "Mobile Number must be exactly 10 characters" })
            .max(10, {
                message: "Mobile Number must be exactly 10 characters",
            }),
        email: z
            .string()
            .trim()
            .min(1, { message: "Email is required" })
            .email({ message: "Invalid Email format" }),
        password: z
            .string()
            .min(8, { message: "Password must be between 8 and 20 characters" })
            .max(20, {
                message: "Password must be between 8 and 20 characters",
            }),
        referralCode: z
            .string()
            .trim()
            .min(1, { message: "referralCode is required" })
            .max(20, { message: "referralCode must be at most 20 characters" })
            .optional(),
    }),
    login: z.object({
        emailOrMobileNumberOrUsername: z
            .string()
            .trim()
            .transform(emailOrMobileNumberOrUsernameValidate),
        password: z
            .string()
            .min(8, { message: "Password must be between 8 and 20 characters" })
            .max(20, {
                message: "Password must be between 8 and 20 characters",
            }),
    }),
    refreshToken: z.object({
        refreshToken: z.string({
            required_error: "refreshToken is required",
        }),
    }),
};
