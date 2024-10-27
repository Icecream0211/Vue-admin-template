import request from "@/utils/request";
import type { TradeMark, TradeMarkResponseData } from './type'


enum API {
    TRADE_MARK_URL = '/admin/product/baseTrademark',
    ADD_TRADE_MARK_URL = '/admin/product/baseTrademark/save',
    UPDATE_TRADE_MARK_URL = '/admin/product/baseTrademark/update',
    DELETE_TRADE_MARK_URL = '/admin/product/baseTrademark/remove/${id}'
}


export const reqHashTradeMark = (page: number, limit: number) => request.get<any, TradeMarkResponseData>(API.TRADE_MARK_URL + `/${page}/${limit}`);

export const reqAddOrUpdateTradeMark = (data: TradeMark) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATE_TRADE_MARK_URL, data)
    } else {
        return request.post<any, any>(API.ADD_TRADE_MARK_URL, data)
    }

}


export const reqDeleteTradeMark = (id: number) => request.delete<any, any>(API.DELETE_TRADE_MARK_URL.replace('${id}', id + ''))