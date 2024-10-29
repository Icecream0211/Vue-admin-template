export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}


export interface RoleListResponse extends ResponseData {
    data: Role[]
}


export interface Role {
    id?: number | string,
    roleName: string,
    roleDesc: string,
    remark: null | string
    updateTime: string,
    createTime: string
}