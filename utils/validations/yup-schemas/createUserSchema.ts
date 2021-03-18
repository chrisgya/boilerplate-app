import * as yup from "yup";

import { EmailValidation, PasswordValidation, NameValidation, OptionalNameValidation, usernameValidation } from "./shared";

export const createUserSchema = yup.object().shape({
    username: usernameValidation,
    email: EmailValidation,
    firstName: NameValidation,
    middleName: OptionalNameValidation,
    lastName: NameValidation,
    mobileNo: yup.string().required().max(20), //use proper phone number validator
    // terms: yup.boolean().required('accept terms and conditions'),
    password: PasswordValidation,
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords are not the same!')
        .required('Password confirmation is required!')
});
