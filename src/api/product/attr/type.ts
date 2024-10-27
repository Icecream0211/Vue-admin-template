
export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}


export interface CategoryObj{
    id:number|string,
    name:string,
    category1Id?:number|string,
    category2Id?:number|string,
    category3Id?:number|string
}



export interface CategoryResponseData extends ResponseData{
    data:CategoryObj[]
}


export interface AttrValue{
    id?:number,
    valueName:string,
    attrId?:number,
    flag?:boolean,
    attrValueId?:number
}

export type AttrValueList  = AttrValue[];

export interface Attr{
    id?:number,
    attrName:string,
    categoryId:number|string,
    categoryLevel:number,
    attrValueList:AttrValueList
}

export type AttrList = Attr[];

export interface AttrResponseData extends ResponseData{
    data:AttrList
}