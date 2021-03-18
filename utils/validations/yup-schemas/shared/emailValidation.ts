import * as yup from "yup";

export const EmailValidation = yup
  .string()
  .email()
  .min(3)
  .max(500)
  .required();
