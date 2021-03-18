import { useEffect } from "react";
import { AxiosResponse } from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Input } from '../formControls';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { agent, ME, IErrorMessage, IUsernameRequest, usernameSchema } from '../../utils';
import { FormTitleAndError } from '..';
import useMe from "../../hooks/useMe";

const yupResolver = typeof window === "object" ? require("@hookform/resolvers/yup").yupResolver : undefined;

const UsernameForm = () => {

    const { data } = useMe();
    const queryClient = useQueryClient();

    const methods = useForm<IUsernameRequest>({
        mode: "onChange",
        resolver: yupResolver ? yupResolver(usernameSchema) : undefined
    });

    const mutation = useMutation(agent.User.changeUsername, {
        onSuccess: (_data) => {
            queryClient.invalidateQueries(ME);
            toast.success("Username successfully changed!");
        },
        onError: (error: AxiosResponse<IErrorMessage>) => {
            console.log('chrisgya error: ', error);
        }
    });

    const reset = methods.reset;
    useEffect(() => { reset({ username: data?.username }); }, [data?.username, reset])

    const onSubmit = (value: IUsernameRequest) => mutation.mutate(value)

    return (
        <div className="p-4 mt-4 border-2 rounded-lg shadow-lg">
            <FormTitleAndError title="" mutation={mutation} />
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>

                    <div className="flex flex-wrap">
                        <div className="w-3/4 pr-2">
                            <Input name="username" type="text" value={data?.username} ref={methods.register} label="Username" disabled={mutation.isLoading} />
                        </div>

                        <div className="w-1/4 pl-2 mr-auto mt-7">
                            <Button type="submit" name="Change Username" isBusy={mutation.isLoading} disabled={mutation.isLoading || Object.keys(methods.formState.dirtyFields).length < 1} />
                        </div>
                    </div>

                </form>
            </FormProvider>
        </div>
    )
}

export default UsernameForm;
