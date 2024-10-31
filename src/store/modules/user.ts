/*
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-05-20 10:58:16
 * @LastEditors: Huccct
 * @LastEditTime: 2023-05-20 16:31:38
 */
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type { UserState } from './types/types'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { constantRoute, anyRoutes, asyncRoutes } from '@/router/routes'
import { LoginResponseData, UserInfoResponseData } from '@/api/user/type'
import router from '@/router'

//@ts-ignore
import cloneDeep from 'lodash/cloneDeep'


function filterAsyncRoute(asyncRoutes: any, routes: any) {
  return asyncRoutes.filter(
    (item: any) => {
      if (routes.includes(item.name)) {
        if (item.children && item.children.length > 0) {
          item.children = filterAsyncRoute(item.children, routes);
        }
        return true;
      }
    }
  )
}


let useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN()!,
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
      buttons:[]
    }
  },
  // 异步|逻辑的地方
  actions: {
    //用户登录方法
    async userLogin(data: any) {
      let res: LoginResponseData = await reqLogin(data)
      // success=>token
      // error=>error.message
      if (res.code === 200) {
        this.token = res.data;
        // 持久化
        SET_TOKEN(res.data)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async userLogout() {
      let result = await reqLogout();
      if (result.code === 200) {
        this.token = '';
        this.username = '';
        this.avatar = '';
        REMOVE_TOKEN();
        return 'ok';
      }
      return Promise.reject(new Error(result.message))
    },
    async getUserInfo() {
      let result: UserInfoResponseData = await reqUserInfo();
      if (result.code === 200) {
        this.username = result.data.name;
        this.avatar = result.data.avatar;
        this.buttons = result.data.buttons;
        let userAsyncRoute = filterAsyncRoute(cloneDeep(asyncRoutes), result.data.routes);
        this.menuRoutes = [...constantRoute, ...anyRoutes, ...userAsyncRoute];
        [...userAsyncRoute,...anyRoutes].forEach(item => {
          router.addRoute(item);
        });
        return 'ok';
      } else {
        return Promise.reject(result.message);
      }
    },
  }
})

export default useUserStore
