import request from "@/utils/request";
import { SkuResponseData,SkuInfoData } from "./type";



enum API {
    SKU_LIST_URL = "/admin/product/list/",
    SKU_ON_SALE_URL = "/admin/product/onSale/",
    SKU_CANCEL_SALE_URL = "/admin/product/cancelSale/",
    SKU_INFO_URL = "/admin/product/getSkuInfo/",
    DELETE_SKU_URL = "/admin/product/deleteSku/"
}



export const reqSkuList = (page: number, limit: number) => request.get<any, SkuResponseData>(API.SKU_LIST_URL + `${page}/${limit}`);


export const reqDeleteSku = (id: number) => request.delete<any, any>(API.DELETE_SKU_URL+`${id}`);




export const reqOnSale = (id: number|string) => request.get<any, any>(API.SKU_ON_SALE_URL + id);

export const reqCancelSale = (id: number|string) => request.get<any, any>(API.SKU_CANCEL_SALE_URL + id);



export const reqSkuInfo = (skuId: number) =>request.get<any, SkuInfoData>(API.SKU_INFO_URL + skuId)


 