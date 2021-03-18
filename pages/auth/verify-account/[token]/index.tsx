import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { agent, IErrorMessage } from '../../../../utils';
import { FormLayout, FormTitleAndError } from '../../../../components';
import Spin from '../../../../public/Spin';

interface Iprop {
    token: string
}

const VerifyAccount = ({ token }: Iprop) => {
    const router = useRouter();

    const { mutate, isLoading } = useMutation(agent.Account.verifyAccount, {
        onSuccess: (_data) => {
            toast.success("Account successfully verified!");
        },
        onError: (error: AxiosResponse<IErrorMessage>) => {
            console.log('chrisgya error: ', error)
            toast.error(error?.data?.message);
        },
        onSettled: () => {
            router.push('/auth/login');
        }
    });

    const onSubmit = useCallback(() => { mutate(token) }, [mutate, token]);
    useEffect(() => { onSubmit(); }, [onSubmit])

    return (
        <FormLayout>
            <div className="smallInnerFormContainer">

                <FormTitleAndError title="VERIFYING ACCOUNT..." />

                {isLoading && <div className="flex justify-center">
                    <div className="w-12 h-12 text-blue-700"><Spin /></div>
                </div>}

            </div>

            <div className="flex justify-center text-base">
                <div>
                    <p className="block mt-2"><Link href="/auth/login"><a className="font-bold text-blue-500">Go Back To Login</a></Link></p>
                </div>
            </div>
        </FormLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { token } = context.query;

    return {
        props: {
            token
        },
    }
}

export default VerifyAccount;
