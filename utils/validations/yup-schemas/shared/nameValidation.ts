import * as yup from "yup";

export const NameValidation = yup
    .string()
    .matches(/^[a-zA-Z]{0,29}$/, "Name should contain alphabeth characters only")
    .min(3, "Name should be between 3 and 30 characters long")
    .max(30, "Name should be between 3 and 30 characters long")
    .required();
