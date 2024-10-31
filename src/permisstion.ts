import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from './store/modules/user'
import pinia from './store'

let userStore = useUserStore(pinia);


/**
 * 前置守卫
 */
router.beforeEach(async (to, from, next) => {
    nprogress.start()
    let token = userStore.token;
    let username = userStore.username;
    if (token) {
        if (to.path == '/login') {
            next({ path: '/' });
        } else {
            if (username) {
                next();
            } else {
                try {
                    await userStore.getUserInfo();
                    /**
                     * 异步路由没加载完，使用next()会造成页面刷新的时候，重新获取用户信息是页面白屏。
                     * 使用 next({...to}),可以在路由加载完成后，再跳转
                     */
                    next({...to});
                } catch (error) {
                    await userStore.userLogout();
                    next({ path: '/login', query: { redirect: to.path } });
                    console.log(error)
                }
            }
        }
    } else {//未登录
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
    document.title = to.meta.title as string
    nprogress.done()
});

