import { string } from "yup";

export const EmailValidation = string()
  .email()
  .min(3)
  .max(500)
  .required();
