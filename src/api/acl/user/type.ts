
export interface UserSearch {
    username: string,
    name: string
}




export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}


export interface User {
    createTime?: string,
    id?: number|string,
    username: string,
    password: string,
    name: string,
    headImg?: string,
    roleName?: string,
    token?: string,
    updateTime?: string,
    phone?: null | string,

}



export interface UserListResponse extends ResponseData {
    data: {
        records: User[],
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number

    }
}



export interface RoleData{
    id?: number | string;
    roleName: string;
    createTime?: string;
    updateTime?: string;
}


export interface AllRoleResponseData extends ResponseData {
    data:{
        assignRoles: RoleData[],
        allRolesList: RoleData[]
    } 
}



export interface AssignRoleData {
    userId: number | string;
    roleIdList: number[]
}