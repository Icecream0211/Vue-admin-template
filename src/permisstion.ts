import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'


console.log("守卫已经安装")

/**
 * 前置守卫
 */
router.beforeEach(async (to, from, next) => {
    nprogress.start()
    next();
});

/**
 * 后置守卫
 */
router.afterEach((to, from) => {
    console.log("路由跳转完毕")
    document.title = to.meta.title as string
    nprogress.done()
});

 