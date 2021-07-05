import { object } from "yup";

import { EmailValidation } from "./shared";

export const emailSchema = object().shape({
    email: EmailValidation
});
