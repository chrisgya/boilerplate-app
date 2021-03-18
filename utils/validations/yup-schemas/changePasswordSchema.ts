import * as yup from "yup";

import { PasswordValidation } from "./shared";

export const changePasswordSchema = yup.object().shape({
    password: yup.string().required('Current password is required'),
    newPassword: PasswordValidation,
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Passwords are not the same!')
        .required('Password confirmation is required!')
});
