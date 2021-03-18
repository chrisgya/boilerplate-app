import * as yup from "yup";

export const roleSchema = yup.object().shape({
    name: yup
        .string()
        .min(3, "name should not be less than 3 characters long")
        .max(50, "name should not be more than 50 characters long")
        .required(),
    description: yup
        .string().trim().transform(value => value === '' ? undefined : value)
        .min(3, "description should not be less than 3 characters long")
        .max(100, "description should not be more than 100 characters long"),
    // permissionIds: yup
    //     .array().of(yup.number())
    //     .min(1, 'at least one permission is required')
});



