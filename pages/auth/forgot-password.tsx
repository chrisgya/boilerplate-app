import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { agent, IErrorMessage, emailSchema } from '../../utils';
import { Button, Input, FormLayout, FormTitleAndError } from '../../components';

const yupResolver = typeof window === "object" ? require("@hookform/resolvers/yup").yupResolver : undefined;

interface IForgotPassword {
    email: string;
}
const defaultValues = {
    email: ''
}
const ForgetPasswordForm = () => {
    const router = useRouter();
    const methods = useForm<IForgotPassword>({
        mode: "onChange",
        resolver: yupResolver ? yupResolver(emailSchema) : undefined,
        defaultValues
    });

    const mutation = useMutation(agent.Account.forgotPassword, {
        onSuccess: (_data) => {
            toast.success("Email sent to registered email address!");
            router.push('/auth/login');
        },
        onError: (error: AxiosResponse<IErrorMessage>) => console.log('chrisgya error: ', error)
    });

    const onSubmit = (data: IForgotPassword) => mutation.mutate(data.email);

    return (
        <FormLayout>
            <div className="smallInnerFormContainer">

                <FormTitleAndError title="REQUEST PASSWORD RESET" mutation={mutation} />

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                        <Input name="email" type="email" ref={methods.register} placeholder="Email" disabled={mutation.isLoading} />

                        <div className="flex justify-center">
                            <Button type="submit" name="Request reset" isBusy={mutation.isLoading} disabled={mutation.isLoading || Object.keys(methods.formState.dirtyFields).length < 1} />
                        </div>
                    </form>
                </FormProvider>

            </div>
            <div className="flex justify-center text-base">
                <div>
                    <p className="block mt-2">Remember your password? <Link href="/auth/login"><a className="font-bold text-blue-500">Login</a></Link></p>
                </div>
            </div>
        </FormLayout>
    )
}

export default ForgetPasswordForm;