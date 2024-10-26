/*
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-05-20 10:58:16
 * @LastEditors: Huccct
 * @LastEditTime: 2023-05-20 16:31:38
 */
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import type { LoginForm, LoginResponseData } from '@/api/user/type'
import type { UserState } from './types/types'
import { SET_TOKEN, GET_TOKEN,REMOVE_TOKEN } from '@/utils/token'
import { constantRoute } from '@/router/routes'

let useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN()!,
      menuRoutes: constantRoute,
      username:'',
      avatar:''

    }
  },
  // 异步|逻辑的地方
  actions: {
    //用户登录方法
    async userLogin(data: LoginForm) {
      let res: LoginResponseData = await reqLogin(data)
      console.log(res)
      // success=>token
      // error=>error.message
      if (res.code === 200) {
        this.token = res.data?.token as string
        // 持久化
        SET_TOKEN(res.data?.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data?.message))
      }
    },
    async userLogout() {
      this.token = '';
      this.username = '';
      this.avatar = '';
      REMOVE_TOKEN();
    },
    async getUserInfo() {
      let result = await reqUserInfo();
      console.log("获取用户信息结果",result);
      if (result.code === 200) {
        this.username = result.data?.checkUser?.username;
        this.avatar = result.data?.checkUser?.avatar;
        return 'ok';
      }else{
        return Promise.reject("用户信息获取失败");
      }
     },
     async userInfo() {
      const res: userInfoResponseData = await reqUserInfo()

      if (res.code === 200) {
        this.username = res.data.name as string
        this.avatar = res.data.avatar as string

        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoute),
          res.data.routes,
        )
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]
        dynamicRoutes = [...userAsyncRoute, anyRoute] // 记录动态添加的路由
        dynamicRoutes.forEach((route) => {
          router.addRoute(route) // 动态添加路由
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
  }
})

export default useUserStore
