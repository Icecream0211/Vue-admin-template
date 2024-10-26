import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from './store/modules/user'
import pinia from './store'
import { SET_TOKEN, GET_TOKEN,REMOVE_TOKEN } from '@/utils/token'

let userStore = useUserStore(pinia);


/**
 * 前置守卫
 */
router.beforeEach(async (to, from, next) => {
    nprogress.start()
    let token = userStore.token;
    let username = userStore.username;
    console.log(token,username)

    if (token) {
        if (to.path == '/login') {
            next({ path: '/' });
        } else {
            if (username) {
                next();
            } else {
                console.log("获取用户信息")
                try {
                    await userStore.getUserInfo();
                    console.log("获取用户信息成功")
                    next();
                } catch (error) {
                    console.log(error)
                }
            }
        }
    } else {//未登录
        console.log("未发现token")
        console.log(GET_TOKEN())
        if (to.path == '/login') {
            next();
        } else {
            next({ path: '/login', query: { redirect: to.path } });
        }
    }

});

/**
 * 后置守卫
 */
router.afterEach((to, from) => {
    console.log("路由跳转完毕")
    document.title = to.meta.title as string
    nprogress.done()
});

