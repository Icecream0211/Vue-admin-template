import request from "@/utils/request";
import { UserListResponse,UserSearch,User,AllRoleResponseData,AssignRoleData } from "./type";



enum API {
   USER_LIST_URL = "/admin/acl/user/",
   ADD_USER_URL = '/admin/acl/user/save',
   UPDATE_USER_URL = '/admin/acl/user/update',
   DELETE_USER_URL = '/admin/acl/user/remove/',
   BATCH_REMOVE_USER_URL = '/admin/acl/user/batchRemove',
   ALL_ROLE_CANASSIGN_URL = '/admin/acl/user/toAssign/',
   ASSIGN_ROLE_URL = '/admin/acl/user/doAssignRole/',

   DO_ASSIGN_USER_ROLE_URL = '/admin/acl/user/doAssignRole',
}



export const reqUserList = (page: number, limit: number, searchObj: UserSearch) => {
    console.log(page,limit,searchObj)
    let reqUrl = API.USER_LIST_URL + `${page}/${limit}`;
    if(searchObj){
        reqUrl += '?';
        if(searchObj.name&&searchObj.name.trim().length>0){
            reqUrl += `name=${searchObj.name}`
        }
        if(searchObj.username&&searchObj.username.trim().length>0)
        reqUrl += `username=${searchObj.username}`
    }

    return request.get<any, UserListResponse>(reqUrl);
}


export const reqAddUser = (data: User) => request.post<any, any>(API.ADD_USER_URL, data);


export const reqUpdateUser = (data: User) => request.put<any, any>(API.UPDATE_USER_URL, data);

export const reqAddOrUpdateUser = (data: User) =>{
    if(data.id){
        return reqUpdateUser(data)
    }else{
        return reqAddUser(data)
    }
}


export const reqUserAllRole = (userId:number) => request.get<any, AllRoleResponseData>(API.ALL_ROLE_CANASSIGN_URL + `${userId}`);



export const reqAssignRoles = (data: AssignRoleData) => request.post<any, any>(API.DO_ASSIGN_USER_ROLE_URL, data);



export const reqDeleteUser = (id: number) => request.delete<any, any>(API.DELETE_USER_URL + `${id}`);


export const reqBatchDeleteUser = (data: number[])=>request.delete<any, any>(API.BATCH_REMOVE_USER_URL,{data})