import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import {
    agent,
    PAGE_RANGE,
    PAGE_SIZE, PERMISSIONS,
    PERMISSION_TABLE_HEADERS,
    ICreateRoleRequest,
    IPermission,
    IErrorMessage,
    roleSchema,
    IRole
} from '../../utils';
import { Button, Input, Textarea } from '../formControls';
import FormTitleAndError from '../layout/FormTitleAndError';
import { Table } from '../shared';

const yupResolver = typeof window === "object" ? require("@hookform/resolvers/yup").yupResolver : undefined;

const defaultValues = {
    name: '',
    description: null,
    permissionIds: []
}

interface IProp {
    onClose: () => void;
}

const RoleForm = ({ onClose }: IProp) => {
    const [selectedRows, setSelectedRows] = useState<IPermission[]>([])
    const [allPermissionsSelected, setAllPermissionsSelected] = useState(false);
    const [searchByName, _setSearchByName] = useState<string | null>(null);
    const [pageNumber, setPageNumber] = useState(0);
    const [sorter, setSorter] = useState<string | null>(null);


    const getAxiosParams = () => {
        const params = new URLSearchParams();
        if (searchByName && searchByName !== '') params.append("name", searchByName);

        if (sorter) {
            const sortSplitter = sorter.split('-');
            params.append("sortField", sortSplitter[0]);
            params.append("sortDirection", sortSplitter[1]);

        }
        params.append("pageNumber", String(pageNumber));
        params.append("pageSize", String(PAGE_SIZE));

        return params;
    }

    const { isSuccess, data, isLoading, isFetching, isPreviousData } = useQuery([PERMISSIONS, searchByName, sorter, pageNumber, PAGE_SIZE], () => agent.Permission.getPermissions(getAxiosParams()),
        {
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            onError: (error: AxiosResponse<IErrorMessage>) => toast.error(error?.data?.message)
        });

    const methods = useForm<ICreateRoleRequest>({
        mode: "onChange",
        resolver: yupResolver ? yupResolver(roleSchema) : undefined,
        defaultValues
    });



    const mutation = useMutation(agent.Role.create, {
        onSuccess: (successData: IRole) => {
            console.log('created role', data)
            toast.success(`${successData.name} successfully created`);
            onClose();
        },
        onError: (error: AxiosResponse<IErrorMessage>) => {
            console.log('chrisgya error: ', error);
        }
    });

    const onSubmit = async (formData: ICreateRoleRequest) => {
        if (allPermissionsSelected) {
            formData.permissionIds = [-1];
        } else {
            if (selectedRows.length < 1) {
                toast.error('please select at least one permission');
                return;
            }
            formData.permissionIds = selectedRows.map(rows => rows.id);
        }
        if (!formData.description) formData.description = null;
        await mutation.mutateAsync(formData);
    }


    return (
        <div>
            <FormTitleAndError title="CREATE ROLE" mutation={mutation} />

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <div>

                        <Input name="name" type="text" placeholder="Role Name" disabled={mutation.isLoading} />

                        <Textarea name="description" placeholder="Role description" disabled={mutation.isLoading} />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <div>
                            <Button type="submit" name="Create Role" isBusy={mutation.isLoading} disabled={mutation.isLoading || Object.keys(methods.formState.dirtyFields).length < 1} />
                        </div>
                        <div>
                            <Button type="button" name="Cancel" onClick={onClose} disabled={mutation.isLoading} />
                        </div>
                    </div>

                </form>
            </FormProvider>

            {isSuccess &&
                <div className="mt-4">
                    <Table
                        headers={PERMISSION_TABLE_HEADERS}
                        data={data?.content!}
                        title="Select Permission(s)"
                        loadingData={isLoading || isFetching || isPreviousData}
                        onMultiSelect={(rows: IPermission[], checkedAll) => {
                            setAllPermissionsSelected(checkedAll)
                            setSelectedRows(rows)
                        }}
                        totalElements={data?.totalElements}
                        totalPages={data?.totalPages}
                        pagesRange={PAGE_RANGE}
                        onPageSelected={(selectedValue) => setPageNumber(selectedValue - 1)}
                        onSort={(field, direction) => setSorter(`${field}-${direction}`)}
                    /></div>}
        </div>
    )
}

export default RoleForm;