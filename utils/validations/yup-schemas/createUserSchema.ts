import { object, string, ref } from "yup";

import { EmailValidation, PasswordValidation, NameValidation, OptionalNameValidation, usernameValidation } from "./shared";

export const createUserSchema = object().shape({
    username: usernameValidation,
    email: EmailValidation,
    firstName: NameValidation,
    middleName: OptionalNameValidation,
    lastName: NameValidation,
    mobileNo: string().required().max(20), //use proper phone number validator
    // terms: yup.boolean().required('accept terms and conditions'),
    password: PasswordValidation,
    confirmPassword: string()
        .oneOf([ref('password')], 'Passwords are not the same!')
        .required('Password confirmation is required!')
});
