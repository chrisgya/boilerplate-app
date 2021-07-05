import { string } from "yup";

export const OptionalNameValidation = string().trim().transform(value => value === '' || value === null ? undefined : value)
    .matches(/^[a-zA-Z]{0,49}$/, "Name should contain alphabeth characters only")
    .min(3, "name should not be less than 3 characters long")
    .max(50, "name should not be more than 60 characters long");