import router from './router'
import { getToken } from "./utils/auth";
import { Toast } from 'vant';
import store from "./store/index";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/home', '/register', '/rank', '/recommend']

router.beforeEach(async (to: any, from: any, next: any) => {
    // 开启进度条
    store.dispatch("setLoading", true);
    NProgress.start();
    // 有 cookie 
    if (getToken('__csrf')) {
        if (to.path === '/login')
            next({ path: '/' });
        else
            next()

    } else {
        // 没有 cookie
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免登录白名单，直接进入
            next()
        } else {
            if (getToken('__csrf')) {
                if (to.path === '/login') {
                    next({ path: '/' });
                } else {
                    next()
                }
            } else {
                if (to.path === 'login') {
                    next() // 否则全部重定向到登录页
                } else {
                    Toast({ message: '请先登录', position: 'top' });
                    next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
                }
            }
        }
    }
})

router.afterEach(() => {
    setTimeout(() => { store.dispatch("setLoading", false) }, 500);
    // store.dispatch("setLoading", false);
    NProgress.done();
})