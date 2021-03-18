import * as yup from "yup";

export const permissionSchema = yup.object().shape({
    name: yup
        .string()
        .min(3, "name should be between 3 and 30 characters long")
        .max(50, "name should be between 3 and 50 characters long")
        .required(),
    description: yup
        .string()
        .min(3, "description should be between 3 and 30 characters long")
        .max(100, "description should be between 3 and 100 characters long"),
});



