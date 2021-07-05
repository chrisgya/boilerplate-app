import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { agent, ILoginRequest, IErrorMessage, loginSchema, ACCESS_TOKEN, REFRESH_TOKEN } from '../../utils';
import { Button, Input, FormLayout, FormTitleAndError } from '../../components';
import Link from 'next/link';

const yupResolver = typeof window === "object" ? require("@hookform/resolvers/yup").yupResolver : undefined;

const defaultValues = {
    email: '',
    password: ''
}

const Login = () => {
    const router = useRouter();

    const methods = useForm<ILoginRequest>({
        mode: "onChange",
        resolver: yupResolver ? yupResolver(loginSchema) : undefined,
        defaultValues
    });

    useEffect(() => {
        window.sessionStorage.removeItem(ACCESS_TOKEN);
        window.sessionStorage.removeItem(REFRESH_TOKEN);
    }, [])

    const mutation = useMutation(agent.Account.login, {
        onSuccess: (data) => {
            window.sessionStorage.setItem(ACCESS_TOKEN, data.accessToken);
            window.sessionStorage.setItem(REFRESH_TOKEN, data.refreshToken);
            router.replace('/');
        },
        onError: (error: AxiosResponse<IErrorMessage>) => {
            methods.setValue('password', '');
            methods.setError('password', {}, { shouldFocus: true });
            console.log('chrisgya error: ', error);
        }
    });

    const onSubmit = async (data: ILoginRequest) => mutation.mutateAsync(data);

    return (
        <FormLayout>
            <div className="smallInnerFormContainer">
                <FormTitleAndError title="LOGIN" mutation={mutation} email={methods.getValues('email')} />

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                        <Input name="email" type="email" placeholder="Email" disabled={mutation.isLoading} />
                        <Input name="password" type="password" placeholder="Password" disabled={mutation.isLoading} />

                        <div className="flex justify-center">
                            <Button type="submit" name="Sign In" isBusy={mutation.isLoading} disabled={mutation.isLoading || Object.keys(methods.formState.dirtyFields).length < 1} />
                        </div>
                        {/* {JSON.stringify(methods.formState, null, 2)} */}
                    </form>
                </FormProvider>

            </div>
            <div className="flex justify-center text-base">
                <div>
                    <p className="block mt-2">New to Chrisgya? <Link href="/auth/signup"><a className="font-bold text-blue-500">Sign up</a></Link></p>
                    <Link href="/auth/forgot-password"><a className="block font-bold text-blue-500">Forgot your password?</a></Link>
                </div>
            </div>
        </FormLayout>
    )
}

export default Login;