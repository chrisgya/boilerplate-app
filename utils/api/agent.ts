import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { ACCESS_TOKEN } from "../constants";
import { redirectUser } from "../helper";
import { IPage } from "../interfaces/IPage";
import { ICreatePermissionRequest, IPermission, IUpdatePermissionRequest } from "../interfaces/IPermission";
import { ICreateRoleRequest, IRole, IUpdateRoleRequest } from "../interfaces/IRole";
import { IChangePasswordRequest, IUser, ILoginRequest, ILoginResponse, IResetPasswordRequest, ISignupRequest, IUpdateUserRequest, IEmailRequest, IUsernameRequest } from "../interfaces/IUser";



axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = window.sessionStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  console.log({ error })
  if (!error?.message || error?.message === "Network Error") {
    console.log('chrisgya network error')
    toast.error("Network error - make sure API is running!");
  } else {
    // const { status, data, config, headers } = error.response;
    const status = error?.response?.status;

    if (!status || status === 500) {
      toast.error("Server error - check the terminal for more info!");
    } else if (status === 401) {
      toast.info("Your session has expired, please login again");
      redirectUser(null, '/auth/login');
    }
    // else if (status === 404) {
    //   history.push("/notfound");
    // } 
    // else if (status === 400 && config.method === "get" && data.errors.hasOwnProperty("id")) {
    //   history.push("/notfound");
    // }
  }
  throw error?.response;
});

const responseBody = (response: AxiosResponse) => response.data;

// const sleep = (ms: number) => (response: AxiosResponse) =>
//   new Promise<AxiosResponse>((resolve) => setTimeout(() => resolve(response), ms));

const requests = {
  // get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, formData: FormData) => axios.post(url, formData, { headers: { "Content-type": "multipart/form-data" } }).then(responseBody)
};


const Account = {
  login: (req: ILoginRequest): Promise<ILoginResponse> => requests.post(`/auth/login`, req),
  refreshToken: (token: string): Promise<ILoginResponse> => requests.get(`/auth/refresh-token/${token}`),
  signup: (user: ISignupRequest): Promise<IUser> => requests.post(`/auth/signup`, user),
  checkUsernameExist: (username: string): Promise<boolean> => requests.get(`/auth/username-exist/${username}`),
  checkEmailExist: (email: string): Promise<boolean> => requests.get(`/auth/email-exist/${email}`),
  verifyAccount: (token: string): Promise<void> => requests.put(`/auth/verify-account/${token}`, {}),
  forgotPassword: (email: string): Promise<void> => requests.put(`/auth/forgot-password/${email}`, {}),
  requestConfirmationLink: (email: string): Promise<void> => requests.put(`/auth/request-confirmation-link/${email}`, {}),
  resetPassword: (req: IResetPasswordRequest): Promise<void> => requests.put(`/auth/reset-password/${req.token}`, req),
};



const User = {
  me: (): Promise<IUser> => requests.get("/users/me"),
  currentUserRoles: (): Promise<IRole[]> => requests.get("/users/me/roles"),
  currentUserPermissions: (): Promise<IPermission[]> => requests.get("/users/me/permissions"),
  updateUser: (req: IUpdateUserRequest): Promise<IUser> => requests.put(`/users/me`, req),
  changeEmail: (req: IEmailRequest): Promise<void> => requests.post(`/users/change-email`, req),
  changeUsername: (req: IUsernameRequest): Promise<void> => requests.post(`/users/change-username`, req),
  changePassword: (req: IChangePasswordRequest): Promise<void> => requests.post(`/users/change-password`, req),
  uploadPhoto: (formData: FormData): Promise<IUser> => requests.postForm(`/users/me/photo`, formData),
};

const Role = {
  getRoles: (params: URLSearchParams): Promise<IPage<IRole>> => axios.get(`/roles`, { params: params }).then(responseBody),
  getRole: (id: number): Promise<IRole> => requests.get(`/roles/${id}`),
  getRolePermissions: (id: number): Promise<IPermission[]> => requests.get(`/roles/${id}/permissions`),
  create: (req: ICreateRoleRequest): Promise<IRole> => requests.post(`/roles`, req),
  update: (id: number, req: IUpdateRoleRequest): Promise<void> => requests.put(`/roles/${id}`, req),
  delete: (id: number): Promise<void> => requests.del(`/roles/${id}`),
  assignPermissionsToRole: (id: number, permissionIds: number[]): Promise<IPermission[]> => requests.put(`/roles/assign-permissions/${id}`, { permissionIds }),
  removePermissionsFromRole: (id: number, permissionIds: number[]): Promise<void> => requests.put(`/roles/remove-permissions/${id}`, { permissionIds }),
};

const Permission = {
  getPermissions: (params: URLSearchParams): Promise<IPage<IPermission>> => axios.get(`/permissions`, { params: params }).then(responseBody),
  getPermission: (id: number): Promise<IPermission> => requests.get(`/permissions/${id}`),
  getPermissionRoles: (id: number): Promise<IRole[]> => requests.get(`/permissions/${id}/roles`),
  create: (req: ICreatePermissionRequest): Promise<IPermission> => requests.post(`/permissions`, req),
  update: (id: number, req: IUpdatePermissionRequest): Promise<void> => requests.put(`/permissions/${id}`, req),
};


// const Activities = {
//   list: (params: URLSearchParams): Promise<IActivitiesEnvelope> =>
//     axios.get("/activities", { params: params }).then(responseBody),
//   details: (id: string) => requests.get(`/activities/${id}`),
//   create: (activity: IActivity) => requests.post("/activities", activity),
//   update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
//   delete: (id: string) => requests.del(`/activities/${id}`),
//   attend: (id: string) => requests.post(`/activities/${id}/attend`, {}),
//   unattend: (id: string) => requests.del(`/activities/${id}/attend`),
// };


// const Profiles = {
//   get: (username: string): Promise<IProfile> => requests.get(`/profiles/${username}`),
//   uploadPhoto: (photo: Blob): Promise<IPhoto> => requests.postForm(`/photos`, photo),
//   setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
//   deletePhoto: (id: string) => requests.del(`/photos/${id}`),
//   updateProfile: (profile: Partial<IProfile>) => requests.put(`/profiles`, profile),
//   follow: (username: string) => requests.post(`/profiles/${username}/follow`, {}),
//   unfollow: (username: string) => requests.del(`/profiles/${username}/follow`),
//   listFollowings: (username: string, predicate: string) =>
//     requests.get(`/profiles/${username}/follow?predicate=${predicate}`),
//   listActivities: (username: string, predicate?: string) =>
//     requests.get(`/profiles/${username}/activities?predicate=${predicate}`),
// };

const agent = {
  User,
  Account,
  Role,
  Permission,
};

export default agent;
