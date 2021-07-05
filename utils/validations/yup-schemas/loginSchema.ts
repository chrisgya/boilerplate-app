import { object, string } from "yup";

export const loginSchema = object().shape({
    email: string().email().required(),
    password: string()
        .required()
});
