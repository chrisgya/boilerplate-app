import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export default () => {
    const methods = useForm({
        mode: "onChange",
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(d => console.log(d))}>
                <h1>React Hook Form DevTools</h1>

                <label>Test</label>
                <input {...methods.register("test")} />

                <input type="submit" />
            </form>

            <DevTool control={methods.control} /> {/* set up the dev tool */}
        </ FormProvider>
    );
};
