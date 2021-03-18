import * as yup from "yup";

import { EmailValidation } from "./shared";

export const emailSchema = yup.object().shape({
    email: EmailValidation
});
