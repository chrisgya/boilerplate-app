import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { Button } from '../../components/formControls';
import { agent, IErrorMessage } from '../../utils';

type emailType = { email: string }

const RequestConfirmationLink = (prop: emailType) => {

    const [hide, setHide] = useState<boolean>(false);

    const methods = useForm();

    const mutation = useMutation(agent.Account.requestConfirmationLink, {
        onSuccess: (_data) => {
            toast.success("Confirmation link sent to registered email address!");
        },
        onError: (error: AxiosResponse<IErrorMessage>) => {
            console.log('chrisgya error: ', error)
            toast.error(error?.data?.message);
        },
        onSettled: () => {
            methods.reset();
            setHide(true);
        }
    });

    return (
        hide ? null : <Button type="button" onClick={() => mutation.mutate(prop.email)} name="Request Confirmation Link" isBusy={mutation.isLoading} disabled={mutation.isLoading} />

    )
}

export default RequestConfirmationLink;