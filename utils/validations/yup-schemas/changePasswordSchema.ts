import { object, string, ref } from "yup";

import { PasswordValidation } from "./shared";

export const changePasswordSchema = object().shape({
    password: string().required('Current password is required'),
    newPassword: PasswordValidation,
    confirmPassword: string()
        .oneOf([ref('newPassword')], 'Passwords are not the same!')
        .required('Password confirmation is required!')
});
