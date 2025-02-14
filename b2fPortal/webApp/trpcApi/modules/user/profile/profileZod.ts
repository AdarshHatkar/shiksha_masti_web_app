import { z } from "zod";

export const profileZodSchema = {
    getProfile: z.void(),
    updateProfile: z.object({
        username: z.string().min(1).max(20),
        firstName: z.string().min(1).max(50),
        lastName: z.string().min(1).max(50),
        email: z.string().email(),
        mobileNumber: z.string().min(10).max(10),
    }),
};
