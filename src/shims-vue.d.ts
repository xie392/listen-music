/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // import type { RouteRecordRaw } from 'vue-router'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'axios' 
declare module 'vant'
declare module 'vue'
declare module 'vuex'