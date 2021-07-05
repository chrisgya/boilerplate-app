import { object, string, ref } from "yup";

import { PasswordValidation } from "./shared";

export const resetPasswordSchema = object().shape({
    password: PasswordValidation,
    confirmPassword: string()
        .oneOf([ref('password')], 'Passwords are not the same!')
        .required('Password confirmation is required!')
});
