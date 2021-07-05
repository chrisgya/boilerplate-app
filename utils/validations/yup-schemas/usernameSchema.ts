import { object } from "yup";
import { usernameValidation } from "./shared";

export const usernameSchema = object().shape({
    username: usernameValidation
});
