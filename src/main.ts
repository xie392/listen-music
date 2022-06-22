import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局样式
import "@/assets/css/style.scss"
// 字体图标
import "@/assets/font/iconfont.css"
// Vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 图片懒加载
import { Lazyload } from 'vant'

// 路由白名单
import './permission'

// 全局加载组件
import load from '@/components/Loading/index.vue'
// 全局导航栏组件
import NavBar from '@/components/NavBar/index.vue'


// app.config.globalProperties.$Loading = function (Loading:any) {
//     Loading
// };

const app = createApp(App);

app.use(Vant);
app.use(Lazyload);
app.component('load', load)
app.component('NavBar', NavBar)


app.use(store).use(router).mount('#app');

