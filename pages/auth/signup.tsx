import { FormProvider, useForm } from 'react-hook-form';
import React, { useRef } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import Link from "next/link";
import { useRouter } from 'next/router';
import { agent, IErrorMessage, ISignupRequest, createUserSchema } from '../../utils';
import { Button, Input, FormTitleAndError, FormLayout, InputFormat } from '../../components';

const yupResolver = typeof window === "object" ? require("@hookform/resolvers/yup").yupResolver : undefined;

const defaultValues = {
    username: '',
    email: '',
    firstName: '',
    middleName: null,
    lastName: '',
    mobileNo: '',
    password: '',
    confirmPassword: '',
    roleIds: null
}
const Signup = () => {
    const router = useRouter();

    const topRef = useRef<HTMLDivElement>(null);
    const usernameRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();

    const methods = useForm<ISignupRequest>({
        mode: "onBlur",
        resolver: yupResolver ? yupResolver(createUserSchema) : undefined,
        defaultValues
    });

    const mutation = useMutation(agent.Account.signup, {
        onSuccess: (data) => {
            console.log('created user', data)
            toast.success("Account successfully created. Email sent to registered email address for verification!");
            router.push('/auth/login');
        },
        onError: (error: AxiosResponse<IErrorMessage>) => {
            if (topRef.current) topRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            console.log('chrisgya error: ', error);
        }
    });

    const usernameMutation = useMutation(agent.Account.checkUsernameExist, {
        onSuccess: (data) => {
            if (!!data) {
                methods.setValue("username", null);
                usernameRef.current?.focus();
                toast.error("username is taken already!");
            }
        }
    });

    const emailMutation = useMutation(agent.Account.checkEmailExist, {
        onSuccess: (data) => {
            if (!!data) {
                methods.setValue("email", null);
                emailRef.current?.focus();
                toast.error("email is taken already!");
            }
        }
    });

    const onSubmit = (data: ISignupRequest) => {
        if (!data.middleName) data.middleName = null;
        mutation.mutate(data);
    }

    const onUsernameBlur = async () => {
        if (!methods.errors.username?.message)
            await usernameMutation.mutateAsync(methods.getValues("username"));
    }

    const onEmailBlur = async () => {
        if (!methods.errors.email?.message)
            await emailMutation.mutateAsync(methods.getValues("email"));
    }

    return (
        <FormLayout>
            <div className="largeInnerFormContainer" ref={topRef}>

                <FormTitleAndError title="CREATE YOUR ACCOUNT" mutation={mutation} />

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                        <Input name="username" type="text" ref={(e: HTMLInputElement) => {
                            methods.register(e)
                            usernameRef.current = e
                        }} label="Username" onBlur={onUsernameBlur} disabled={mutation.isLoading} />

                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full px-3 md:w-1/2">
                                <Input name="firstName" type="text" ref={methods.register} label="First Name" disabled={mutation.isLoading} />
                            </div>
                            <div className="w-full px-3 md:w-1/2">
                                <Input name="lastName" type="text" ref={methods.register} label="Last Name" disabled={mutation.isLoading} />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full px-3 md:w-1/2">
                                <Input name="middleName" type="text" ref={methods.register} label="Middle Name" disabled={mutation.isLoading} />
                            </div>
                            <div className="w-full px-3 md:w-1/2">
                                <InputFormat name="mobileNo" type="tel" label="Mobile Number" disabled={mutation.isLoading} format="+234 (###) ###-####" mask="_" allowEmptyFormatting />
                            </div>
                        </div>

                        <Input name="email" type="email" ref={(e: HTMLInputElement) => {
                            methods.register(e)
                            emailRef.current = e
                        }} label="Email" onBlur={onEmailBlur} disabled={mutation.isLoading} />

                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full px-3 md:w-1/2">
                                <Input name="password" type="password" ref={methods.register} label="Password" topClass="top-9" disabled={mutation.isLoading} />
                            </div>
                            <div className="w-full px-3 md:w-1/2">
                                <Input name="confirmPassword" type="password" ref={methods.register} label="Confirm Password" topClass="top-9" disabled={mutation.isLoading} />
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Button type="submit" name="Create Account" isBusy={mutation.isLoading} disabled={mutation.isLoading || Object.keys(methods.formState.dirtyFields).length < 1} />
                        </div>
                        <p className="block mt-4 text-xs">By clicking the <i className="font-bold">"Create Account"</i> button, you agree to Chrisgya’s <Link href="/auth/login"><a className="font-bold text-blue-500">terms of acceptable use</a></Link></p>

                    </form>
                </FormProvider>

            </div>
            <div className="flex justify-center text-base">
                <div>
                    <p className="block mt-2">Already have an account? <Link href="/auth/login"><a className="font-bold text-blue-500">Login</a></Link></p>
                </div>
            </div>
        </FormLayout>
    )
}

export default Signup;
