<template>
  <div v-if="data.screenWidth > 750" class="overWidth">
    <span>请用手机端打开网页</span>
  </div>
  <load :loading="store.getters.loading"></load>
  <router-view v-slot="{ Component }" v-if="data.screenWidth < 750">
    <keep-alive>
      <component :is="Component" v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.keepAlive"/>
  </router-view>
  <div class="footer" v-if="store.getters.songId "></div>
  <player v-if="store.getters.songId && !store.getters.isVideo"></player>
 

</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";
import player from "./components/Player/index.vue";

const store = useStore();

let data = reactive({
  screenWidth: 0,
  id: 0,
})

// 视窗大小改变
let change = () => {
  data.screenWidth = document.body.clientWidth || document.documentElement.clientWidth;
}


onMounted(() => {
  change();
  window.addEventListener("resize", change);
  // localStore();
});

// 数据存储
const localStore = () => {
  // 在页面加载时读取sessionStorage里的状态信息
  const storeList = localStorage.getItem('store')
  if (storeList) {
    store.replaceState(
      Object.assign(
        {},
        store.state,
        JSON.parse(storeList)
      )
    )
  }
  // 在页面刷新时将vuex里的信息保存到sessionStorage里 beforeunload事件在页面刷新时先触发
  window.addEventListener('beforeunload', () => {
    store.commit("set_loading", true);
    localStorage.setItem('store', JSON.stringify(store.state))
  })
};
</script>

<style lang="scss">
html,
body {
  width: 100%;

  #app {
    min-width: 325px;
    max-width: 725px;
    margin: 0 auto;
    min-height: 100vh;
    font-family: PingFangSC-Regular, PingFang SC;
    position: relative;

    .overWidth {
      width: 100vw;
      height: 100vh;
      background: #fff;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 3.733vw;
    }

    .footer {
      width: 100%;
      height: 60px;
    }

  }
}
</style>
