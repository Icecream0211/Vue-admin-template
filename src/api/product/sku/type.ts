export interface ResponseData{
    code:number,
    message:string
    ok:boolean
}





export interface SkuAttr {
    attrId: number | string,
    valueId: number | string
}



export interface SkuSaleAttr {
    saleAttrValueId: number | string,
    saleAttrId: number | string
}

export interface SkuData {
    category3Id: number | string,
    spuId: number | string,
    tmId: number | string,
    weight: string | number,
    price: number | string,
    skuAttrValueList?: SkuAttr[],
    skuDesc: string,

    skuName: string,

    id?:number|string,
    isSale?:number,
    skuDefaultImg: string,
    skuImageList?: [],
    skuSaleAttrValueList?: SkuSaleAttr[]
}







export interface SkuResponseData extends ResponseData {
    data: {
        records:SkuData[],
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number
    }

}



export interface SkuInfoData extends ResponseData {
    data: SkuData
}