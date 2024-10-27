export interface ResponseData {
    code: number;
    message: string;
    ok: boolean;
}


export interface TradeMark {
    id?: number,
    tmName: string,
    logoUrl: string
}


export type Records = TradeMark[]


export interface TradeMarkResponseData extends ResponseData {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        orders: [],
        optimizeCountSql: boolean,
        hitCount: boolean,
        countId: null,
        maxLimit: null,
        searchCount: boolean,
        pages: number
    }
}