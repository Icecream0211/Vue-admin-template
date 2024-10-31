import request from "@/utils/request";
import type { RoleListResponse ,Role,MenuResponse,AclSetRequestData} from './type'



enum API {
    HAS_ROLE_URL = '/admin/acl/role/{page}/{limit}',
    ADD_ROLE_URL = '/admin/acl/role/save',
    DELETE_ROLE_URL = '/admin/acl/role/remove/',
    UPDATE_ROLE_URL = '/admin/acl/role/update',

    ALLPERMISSION_URL = '/admin/acl/permission/toAssign/',

    SETPERMISSION_URL = '/admin/acl/permission/doAssignAcl',

}





export const reqRoleList = (page: number, limit: number, roleName: string) => {

    let url = API.HAS_ROLE_URL.replace('{page}', page + '').replace('{limit}', limit + '');

    if (roleName && roleName.trim().length > 0) {
        url += '?';
        url += `roleName=${roleName}`
    }
    return request.get<any, RoleListResponse>(url);
}


export const reqAddRole = (role: Role) => request.post<any, any>(API.ADD_ROLE_URL, role);


export const reqDeleteRole = (id: number) => request.delete<any, any>(API.DELETE_ROLE_URL + `/${id}`);



export const reqUpdateRole = (role: Role) => request.put<any, any>(API.UPDATE_ROLE_URL, role);

export const reqAddOrUpdateRole = (role: Role) =>{
    return role.id ? reqUpdateRole(role) : reqAddRole(role);
}



export const reqAllPermission = (roleId:number|string) => request.get<any, MenuResponse>(API.ALLPERMISSION_URL+`${roleId}`);

export const reqDoAssignPermission = (data:AclSetRequestData) => request.post<any, any>(API.SETPERMISSION_URL, data);

