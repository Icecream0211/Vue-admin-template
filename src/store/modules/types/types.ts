/*
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-05-20 16:28:00
 * @LastEditors: Huccct
 * @LastEditTime: 2023-05-20 16:28:38
 */
import { CategoryObj } from '@/api/product/attr/type'
import type { RouteRecordRaw } from 'vue-router'
export interface UserState {
  token: string | null,
  menuRoutes: RouteRecordRaw[],
  username?: string,
  avatar?: string,
}


export interface CategoryState{
  c1Id:number|string,
  c1Arr:CategoryObj[],
  c2Id:number|string,
  c2Arr:CategoryObj[],
  c3Id:number|string,
  c3Arr:CategoryObj[]
}

export interface ResponseData {
  code?: number
  message?: string
  ok?: boolean
}

export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}