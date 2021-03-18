export interface IRole {
    id: number;
    name: string;
    description: string;
    createdBy: string;
    createdAt: Date
}

export interface ICreateRoleRequest {
    name: string;
    description: string | null;
    permissionIds: number[];
}
export interface IUpdateRoleRequest {
    name: string;
    description: string | null;
    permissionIds: number[];
}