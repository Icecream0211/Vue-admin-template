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
import { constantRoute } from '@/router/routes'

let useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN()!,
      menuRoutes: constantRoute,
      username: '',
      avatar: ''

    }
  },
  // 异步|逻辑的地方
  actions: {
    //用户登录方法
    async userLogin(data: any) {
      let res: any = await reqLogin(data)
      console.log("login--resp",res)
      // success=>token
      // error=>error.message
      if (res.code === 200) {
        this.token = res.data;
        // 持久化
        SET_TOKEN(res.data)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data?.message))
      }
    },
    async userLogout() {
      let result = await reqLogout();
      console.log("退出登录", result);
      if(result.code === 200){
        this.token = '';
        this.username = '';
        this.avatar = '';
        REMOVE_TOKEN();
        return 'ok';
      }
      return Promise.reject(new Error(result.message))
    },
    async getUserInfo() {
      let result = await reqUserInfo();
      console.log("获取用户信息结果", result);
      if (result.code === 200) {
        this.username = result.data.name;
        this.avatar = result.data.avatar;
        return 'ok';
      } else {
        return Promise.reject("用户信息获取失败");
      }
    },
  }
})

export default useUserStore
