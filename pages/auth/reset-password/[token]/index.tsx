// import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { agent, IErrorMessage, IResetPasswordRequest, resetPasswordSchema } from '../../../../utils';
import { FormLayout, Button, Input, FormTitleAndError } from '../../../../components';

const yupResolver = typeof window === "object" ? require("@hookform/resolvers/yup").yupResolver : undefined;

const defaultValues = {
    token: '',
    confirmPassword: '',
    password: ''
}

interface Iprop {
    token: string
}

const ResetPassword = ({ token }: Iprop) => {
    const router = useRouter();


    const methods = useForm<IResetPasswordRequest>({
        mode: "onChange",
        resolver: yupResolver ? yupResolver(resetPasswordSchema) : undefined,
        defaultValues
    });

    const mutation = useMutation(agent.Account.resetPassword, {
        onSuccess: (_data) => {
            toast.success("Password successfully created. You can login now!");
            router.push('/auth/login');
        },
        onError: (error: AxiosResponse<IErrorMessage>) => console.log('chrisgya error: ', error)
    });

    const onSubmit = (data: IResetPasswordRequest) => {
        data.token = token;
        mutation.mutate(data);
    }

    return (
        <FormLayout>
            <div className="smallInnerFormContainer">

                <FormTitleAndError title="CREATE NEW PASSWORD" mutation={mutation} />

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                        <Input name="password" type="password" ref={methods.register} placeholder="Password" disabled={mutation.isLoading} />
                        <Input name="confirmPassword" type="password" ref={methods.register} placeholder="Confirm Password" disabled={mutation.isLoading} />

                        <div className="flex justify-center">
                            <Button type="submit" name="Create Password" isBusy={mutation.isLoading} disabled={mutation.isLoading || Object.keys(methods.formState.dirtyFields).length < 1} />
                        </div>
                    </form>
                </FormProvider>
            </div>
            <div className="flex justify-center text-base">
                <div>
                    <p className="block mt-2">You remember your password and want to login instead? <Link href="/auth/login"><a className="font-bold text-blue-500">Login</a> </Link></p>
                </div>
            </div>
        </FormLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { token } = context.query

    return {
        props: {
            token
        },
    }
}


export default ResetPassword;