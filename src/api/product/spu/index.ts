import request  from "@/utils/request";



enum API{
     SPU_URL = '/admin/product',    
}


export const reqHashTradeMark = (page: number, limit: number) => request.get<any, any>(API.SPU_URL + `/${page}/${limit}`)
