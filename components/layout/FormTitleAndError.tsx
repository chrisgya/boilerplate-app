import { AxiosResponse } from 'axios';
import React from 'react'
import { UseMutationResult } from 'react-query';
import { ErrorMessage } from '../shared';
import { RequestConfirmationLink } from '../shared';
import { IErrorMessage } from '../../utils';

type propType = {
    title: string,
    email?: string,
    mutation?: UseMutationResult<any, AxiosResponse<IErrorMessage>, any, unknown>
}

const FormTitleAndError = (prop: propType) => {
    return (
        <>
            <p className="mx-auto my-2 text-sm capitalize"> {prop.title}</p>
            {prop.mutation && prop.mutation.isError && <ErrorMessage message={prop.mutation?.error?.data?.message} reset={prop.mutation.reset} />}
            {prop.mutation && prop.mutation.isError && prop.mutation?.error?.data?.message === 'please confirm your email' && prop.email && <RequestConfirmationLink email={prop.email} />}
        </>
    )
}

export default FormTitleAndError;
