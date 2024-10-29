import request from "@/utils/request";
import type { RoleListResponse } from './type'



enum API{
    HAS_ROLE_URL = '/admin/acl/role/{page}/{limit}',
    
}





export const reqRoleList = (page: number, limit: number) => request.get<any, RoleListResponse>(API.HAS_ROLE_URL.replace('{page}',page+'').replace('{limit}',limit+''))

