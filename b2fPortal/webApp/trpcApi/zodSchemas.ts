import { authZodSchema } from "./modules/authZod.js";

import { userZodSchema } from "./modules/user/userZod.js";

export const webAppZodSchemas = {
    auth: authZodSchema,

    user: userZodSchema,
};
