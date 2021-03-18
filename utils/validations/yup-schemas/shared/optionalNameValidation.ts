import * as yup from "yup";

export const OptionalNameValidation = yup
    .string()
    .matches(/^[a-zA-Z]{0,29}$/, "Name should contain alphabeth characters only")
    .max(30, "Name should be between 3 and 30 characters long");
