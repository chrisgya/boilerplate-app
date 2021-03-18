import * as yup from "yup";

import { PasswordValidation } from "./shared";

export const resetPasswordSchema = yup.object().shape({
    password: PasswordValidation,
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords are not the same!')
        .required('Password confirmation is required!')
});
