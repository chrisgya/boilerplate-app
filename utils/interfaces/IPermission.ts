export interface IPermission {
    id: number;
    name: string;
    description: string;
    createdBy: string;
    createdAt: Date
}

export interface ICreatePermissionRequest {
    name: string;
    description: string;
}
export interface IUpdatePermissionRequest {
    name: string;
    description: string;
}