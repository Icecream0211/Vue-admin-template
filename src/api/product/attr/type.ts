
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
