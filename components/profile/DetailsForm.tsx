import { useEffect } from "react";
// import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { agent, updateUserSchema, IErrorMessage, IUpdateUserRequest, ME } from '../../utils';
import { Button, Input, FormTitleAndError } from '..';
import useMe from "../../hooks/useMe";

const yupResolver = typeof window === "object" ? require("@hookform/resolvers/yup").yupResolver : undefined;

const DetailsForm = () => {
    const { data } = useMe();
    const queryClient = useQueryClient();

    const methods = useForm<IUpdateUserRequest>({
        mode: "onChange",
        resolver: yupResolver ? yupResolver(updateUserSchema) : undefined
    });

    const mutation = useMutation(agent.User.updateUser, {
        onSuccess: (_data) => {
            queryClient.invalidateQueries(ME);
            toast.success("User details successfully updated!");

        },
        onError: (error: AxiosResponse<IErrorMessage>) => {
            console.log('chrisgya error: ', error);
        }
    });

    const reset = methods.reset;
    useEffect(() => { reset(data as IUpdateUserRequest); }, [data, reset])

    const onSubmit = (formData: IUpdateUserRequest) => {
        if (!formData.middleName) formData.middleName = null;
        mutation.mutate(formData);
    }



    return (
        <div className="p-4 mt-4 border-2 rounded-lg shadow-lg">
            <FormTitleAndError title="" mutation={mutation} />

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>

                    <div className="flex flex-wrap -mx-3">
                        <div className="w-full px-3 md:w-1/2">
                            <Input name="firstName" type="text" ref={methods.register} label="First Name" disabled={mutation.isLoading} />
                        </div>
                        <div className="w-full px-3 md:w-1/2">
                            <Input name="lastName" type="text" ref={methods.register} label="Last Name" disabled={mutation.isLoading} />
                        </div>
                    </div>

                    <Input name="middleName" type="text" ref={methods.register} label="Middle Name" disabled={mutation.isLoading} />


                    <div className="flex justify-center">
                        <Button type="submit" name="Update Details" isBusy={mutation.isLoading} disabled={mutation.isLoading || Object.keys(methods.formState.dirtyFields).length < 1} />
                    </div>

                </form>
            </FormProvider>
        </div>
    )
}

export default DetailsForm;
