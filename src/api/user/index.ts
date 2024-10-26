/*
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-05-19 17:15:57
 * @LastEditors: Huccct
 * @LastEditTime: 2023-05-19 17:33:07
 */
// 统一管理用户相关接口
import request from '@/utils/request'

enum API {
  // 登录接口
  LOGIN_URL = '/admin/acl/index/login',
  // 获取用户信息
  USERINFO_URL = '/admin/acl/index/info',
  // 退出登录
  LOGOUT_URL = '/admin/acl/index/logout'
};


export const reqLogin =  (data:any) => request.post<any,any>(API.LOGIN_URL,data);

export const reqUserInfo = () => request.get<any,any>(API.USERINFO_URL); 

export const reqLogout = () => request.post<any,any>(API.LOGOUT_URL);