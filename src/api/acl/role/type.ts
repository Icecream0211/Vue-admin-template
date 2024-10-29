export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}


export interface RoleListResponse extends ResponseData {
    data:{
        records: Role[],
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number
    }
}


export interface Role {
    id?: number | string,
    roleName: string,
    roleDesc?: string,
    remark?: null | string
    updateTime?: string,
    createTime?: string
}