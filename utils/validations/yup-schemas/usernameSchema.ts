import * as yup from "yup";
import { usernameValidation } from "./shared";

export const usernameSchema = yup.object().shape({
    username: usernameValidation
});
