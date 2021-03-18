import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { RoleForm, FormModal, Table, AuthenticatedLayout } from "../../components";
import {
    agent,
    IErrorMessage,
    IRole,
    PAGE_RANGE,
    PAGE_SIZE,
    PERMISSION_TABLE_HEADERS,
    ROLES,
    ROLE_PERMISSIONS
} from "../../utils";

const headers = [{ key: 'name', title: 'Role Name', type: 'text' }, { key: 'description', title: 'Role Description', type: 'text' }, { key: 'createdBy', title: 'Created By', type: 'text' }, { key: 'createdAt', title: 'Created At', type: 'date' }]

function Role() {
    const [selectedRow, setSelectedRow] = useState<IRole>()
    const [searchRole, _setSearchRole] = useState<string | null>(null);
    const [pageNumber, setPageNumber] = useState(0);
    const [sorter, setSorter] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);


    const getAxiosParams = () => {
        const params = new URLSearchParams();
        if (searchRole && searchRole === '') params.append("name", searchRole);

        if (sorter) {
            const sortSplitter = sorter.split('-');
            params.append("sortField", sortSplitter[0]);
            params.append("sortDirection", sortSplitter[1]);

        }
        params.append("pageNumber", String(pageNumber));
        params.append("pageSize", String(PAGE_SIZE));

        return params;
    }

    const { isSuccess, data, isLoading, isFetching, isPreviousData } = useQuery([ROLES, searchRole, sorter, pageNumber, PAGE_SIZE], () => agent.Role.getRoles(getAxiosParams()),
        {
            keepPreviousData: true,
            onError: (error: AxiosResponse<IErrorMessage>) => toast.error(error?.data?.message)
        });
    const roleId = selectedRow?.id;
    const { isSuccess: permissionSuccess, data: permissions } = useQuery([ROLE_PERMISSIONS, roleId], () => agent.Role.getRolePermissions(roleId!),
        {
            enabled: !!roleId,
            onError: (error: AxiosResponse<IErrorMessage>) => toast.error(error?.data?.message)
        });


    return (
        <AuthenticatedLayout>
            {isSuccess &&
                <Table
                    headers={headers}
                    data={data?.content!}
                    title="Roles Management"
                    loadingData={isLoading || isFetching || isPreviousData}
                    onSelect={(selectedRole) => setSelectedRow(selectedRole)}
                    totalPages={data?.totalPages}
                    pagesRange={PAGE_RANGE}
                    onPageSelected={(selectedValue) => setPageNumber(selectedValue - 1)}
                    onMainAddButtonClick={() => setShowModal(true)}
                    onSort={(field, direction) => setSorter(`${field}-${direction}`)}
                />}

            {/* change to modal */}
            {permissionSuccess &&
                <div className='md:ml-auto md:mr-auto md:w-1/2'>
                    <Table
                        headers={PERMISSION_TABLE_HEADERS}
                        data={permissions!}
                        title="Role's Permissions"
                    /></div>}

            {showModal && <FormModal>
                <RoleForm onClose={() => setShowModal(false)} />
            </FormModal>}
        </AuthenticatedLayout>
    )
}

export default Role
