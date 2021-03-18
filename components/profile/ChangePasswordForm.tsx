import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { agent, IChangePasswordRequest, IErrorMessage, changePasswordSchema, } from '../../utils';
import { FormLayout, FormTitleAndError, Button, Input } from '..';

const yupResolver = typeof window === "object" ? require("@hookform/resolvers/yup").yupResolver : undefined;

const defaultValues = {
    password: '',
    newPassword: '',
    confirmPassword: ''
}
const ChangePasswordForm = () => {
    const router = useRouter();

    const methods = useForm<IChangePasswordRequest>({
        mode: "onChange",
        resolver: yupResolver ? yupResolver(changePasswordSchema) : undefined,
        defaultValues
    });

    const mutation = useMutation(agent.User.changePassword, {
        onSuccess: () => {
            toast.success("Password successfully Changed. Please login now!");
            router.push('/auth/login');
        },
        onError: (error: AxiosResponse<IErrorMessage>) => console.log('chrisgya error: ', error)
    });

    const onSubmit = (data: IChangePasswordRequest) => {
        mutation.mutate(data);
    }

    return (<FormLayout hideLogo={true}>
        <div className="mx-auto shadow-2xl md:w-2/4">

            <FormTitleAndError title="CHANGE PASSWORD" mutation={mutation} />

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <Input name="password" type="password" ref={methods.register} placeholder="Password" disabled={mutation.isLoading} />
                    <Input name="newPassword" type="password" ref={methods.register} placeholder="New Password" disabled={mutation.isLoading} />
                    <Input name="confirmPassword" type="password" ref={methods.register} placeholder="Confirm New Password" disabled={mutation.isLoading} />

                    <div className="flex justify-center">
                        <Button type="submit" name="Change Password" isBusy={mutation.isLoading} />
                    </div>
                </form>
            </FormProvider>
        </div>
    </FormLayout>
    )
}

export default ChangePasswordForm;
