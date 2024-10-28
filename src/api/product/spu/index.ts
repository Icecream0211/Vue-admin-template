import request from "@/utils/request";

import type { HasSpuResponseData, SpuData, AllTradeMarkResponse, SpuImageListResponse, SpuSaleAttrResponse, HasSaleAttrResponse,SkuData,SkuInfoData } from './type'



enum API {
    SPU_URL = '/admin/product',
    SPU_IMG_URL = '/admin/product/spuImageList/',
    ALL_TRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
    SPU_SALE_ATTR_URL = '/admin/product/spuSaleAttrList/',
    ALL_BASE_SALE_ATTR_URL = '/admin/product/baseSaleAttrList',
    SAVE_SPU_URL = '/admin/product/saveSpuInfo',
    UPDATE_SPU_URL = '/admin/product/updateSpuInfo',
    AddSKU_URL = '/admin/product/saveSkuInfo',
    GET_SKU_URL = '/admin/product/findBySpuId/',
    DELETE_SPU_URL = '/admin/product/deleteSpu/',
}


export const reqHasSpu = (page: number, limit: number, c3Id: number | string) => request.get<any, HasSpuResponseData>(API.SPU_URL + `/${page}/${limit}` + `?category3Id=${c3Id}`)


//获取所有SPU品牌

export const reqAllTrademark = () => request.get<any, AllTradeMarkResponse>(API.ALL_TRADEMARK_URL);


export const reqHasSpuImageList = (spuId: number) => request.get<any, SpuImageListResponse>(API.SPU_IMG_URL + spuId);


export const reqHasSpuSaleAttrs = (spuId: number) => request.get<any, SpuSaleAttrResponse>(API.SPU_SALE_ATTR_URL + spuId)


export const reqAllBaseSaleAttrs = () => request.get<any, HasSaleAttrResponse>(API.ALL_BASE_SALE_ATTR_URL);



export const reqAddSpu = (data: SpuData) => request.post<any, any>(API.SAVE_SPU_URL, data);

export const reqUpdateSpu = (data: SpuData) => request.post<any, any>(API.UPDATE_SPU_URL, data);


export const reqAddOrUpdateSpu = (data: SpuData) => {
    return data.id ? reqUpdateSpu(data) : reqAddSpu(data)
}



export const reqAddSku = (data:SkuData)=>request.post<any,any>(API.AddSKU_URL,data);


export const reqSkuList = (spuId:number|string) => request.get<any,SkuInfoData>(API.GET_SKU_URL+spuId);


export const reqDeleteSpu = (id: number|string) => request.delete<any, any>(API.DELETE_SPU_URL + `/${id}`);