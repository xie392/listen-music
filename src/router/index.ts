import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// declare module 'vue-router'{
//   interface _RouteRecordBase {
//       hidden?: boolean | string | number
//   }
// }

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/Home/index.vue'), 
    redirect: '/home',
    meta: { 
      keepAlive: true, 
    },
    children: [
      { // 首页
        path: 'home',
        name: 'home',
        component: () => import('@/views/index.vue'),
        meta: { 
          keepAlive: true, 
        } 
      },
      { // 搜索
        path: 'search',
        name: 'search',
        component: () => import('@/views/Home/serach/index.vue'),
        meta: { 
          keepAlive: true,
        } 
      },
      { // 排行榜
        path: 'rank',
        name: 'rank',
        component: () => import('@/views/Home/rank/index.vue'),
        meta: { 
          keepAlive: true, 
        },
      },
      { // 推荐歌单
        path: 'recommend',
        name: 'recommend',
        component: () => import('@/views/Home/recommend/index.vue'),
        meta: { 
          keepAlive: true, 
        },
      },
      { // 推荐电台
        path: 'radio',
        name: 'radio',
        component: () => import('@/views/Home/radio/index.vue'),
        meta: { 
          keepAlive: true, 
        },
      }
    ]
  },
  { // 登录
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
  },
  { // 注册 
    path: '/register',
    name: 'register',
    component: () => import('@/views/register.vue'),
  },
  { // 视频
    path: '/video',
    name: 'video',
    component: () => import('@/views/Video/index.vue'),
  },
  { // 404
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes
})

export default router
