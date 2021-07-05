import { string } from "yup";

export const usernameValidation = string()
    .matches(/^[a-zA-Z0-9]{0,49}$/, "Name should contain alpha-numeric characters only")
    .min(3, "Name should not be less than 3 characters")
    .max(50, "Name should not be longer than 50 characters")
    .required();
