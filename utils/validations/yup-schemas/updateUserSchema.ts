import * as yup from "yup";

import { NameValidation, OptionalNameValidation } from "./shared";

export const updateUserSchema = yup.object().shape({
    firstName: NameValidation,
    middleName: OptionalNameValidation,
    lastName: NameValidation
});



