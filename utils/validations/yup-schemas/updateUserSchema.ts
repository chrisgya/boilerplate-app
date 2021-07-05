import { object } from "yup";

import { NameValidation, OptionalNameValidation } from "./shared";

export const updateUserSchema = object().shape({
    firstName: NameValidation,
    middleName: OptionalNameValidation,
    lastName: NameValidation
});



