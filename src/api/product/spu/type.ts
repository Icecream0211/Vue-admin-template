export interface ResponseData {
  code: number;
  message?: string;
  ok: boolean;
}


export interface SpuData{
    id?:number;
    spuName:string;
    description:string;
    category3Id:number|string;
    tmId:number|string;
    spuSaleAttrList:null|SpuSaleAttr[];
    spuImageList:null|SpuImage[];
}


export interface HasSpuResponseData extends ResponseData{
    data:{
        records:SpuData[],
        total:number,
        size:number,
        current:number,
        searchCount:boolean,
        pages:number
    }
}


export interface TradeMark {
    id?: number,
    tmName: string,
    logoUrl: string
}


export interface AllTradeMarkResponse extends ResponseData {
    data: TradeMark[]
}



export interface SpuImage {
     id?:number,
     imgName:string,
     imgUrl:string,
     createTime?:string,
     updateTime?:string,
     spuId?:number,
     name?:string,
     url?:string
} 

export interface SpuImageListResponse extends ResponseData {
    data:SpuImage[]
}



export interface SpuSaleAttrValue{
        baseSaleAttrId: number|string,
        id?: number,
        isChecked?:String,
        saleAttrName?:string
        saleAttrValueName: string
        spuId?: number
}


export interface SpuSaleAttr{
    baseSaleAttrId: number|string,
    id?: number,
    saleAttrName: string,
    spuId?: number,
    spuSaleAttrValueList: SpuSaleAttrValue[],
    isChecked?:String|null,
    flag?:boolean,
    saleAttrValue?:string
}

export interface SpuSaleAttrResponse extends ResponseData{
    data:SpuSaleAttr[]
}


export interface HasSaleAttr{
    id:number,
    name:string
}

export interface HasSaleAttrResponse extends ResponseData{
    data:HasSaleAttr[]
}








