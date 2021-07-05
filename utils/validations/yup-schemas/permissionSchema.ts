import { object, string } from "yup";

export const permissionSchema = object().shape({
    name: string()
        .min(3, "name should be between 3 and 30 characters long")
        .max(50, "name should be between 3 and 50 characters long")
        .required(),
    description: string()
        .min(3, "description should be between 3 and 30 characters long")
        .max(100, "description should be between 3 and 100 characters long"),
});



