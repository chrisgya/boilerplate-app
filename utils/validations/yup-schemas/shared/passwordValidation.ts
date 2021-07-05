import { string } from "yup";

export const PasswordValidation = string()
    .matches(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{4,35}$/, "Password needs to have at least one lower case, one uppercase, one number, one special character, and must be at least 4 characters but no more than 35.")
    .min(5)
    .max(1000)
    .required();
