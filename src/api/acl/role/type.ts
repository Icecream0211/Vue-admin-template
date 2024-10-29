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

export interface MeunData{
    id:number,
    createTime: string,
    updateTime: string,
    pid: number,
    name: string,
    code: string,
    toCode: string,
    type: number,
    status: null,
    level: number,
    children?: MeunData[],
    select: boolean
}

export interface MenuResponse extends ResponseData {
  data: MeunData[]
}


export interface AclSetRequestData{
  roleId:number|string,
  permissionIdList:number[]
}