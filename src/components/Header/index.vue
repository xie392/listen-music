<template>
  <van-sticky :offset-top="0">
    <div class="header">
      <div class="frist-nav">
        <router-link to="/UserInfo" tag="span" class="iconfont my">
          &#xe8a0;
        </router-link>
      </div>
      <router-link to="/home" tag="div" class="nav rec">推荐</router-link>
      <router-link to="/video" tag="div" class="nav">视频</router-link>
      <router-link to="/Album" tag="div" class="nav">专辑</router-link>
      <!-- <van-icon name="search" class="search" /> -->
       <router-link to="/UserInfo" tag="i"  class="van-badge__wrapper van-icon van-icon-search search"></router-link>
    </div>
  </van-sticky>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 13vw;
  background: #d43c33;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.1vw 0 #ccc;

  .frist-nav {
    text-align: center;
    padding-top: 5px;
    box-sizing: border-box;
    width: 7%;

    .my {
      font-size: 3.6vw;
      color: #fff;
      font-weight: 600;
      line-height: 13vw;
    }
  }

  .nav {
    width: 25%;
    height: 100%;
    text-align: center;
    color: #fff;
    font-size: 3.5vw;
    letter-spacing: 0.12rem;
    line-height: 13vw;
    position: relative;
  }

  .router-link-exact-active::after {
    content: "";
    width: 7vw;
    height: 0.5vw;
    position: absolute;
    background: #fff;
    margin: auto;
    left: 0;
    right: 0;
    top: 10vw;
  }

  .search {
    margin-left: 3%;
    width: 7%;
    color: #fff;
    font-size: 4.2vw;
    font-weight: 600;
    line-height: 13vw;
    padding-top: 2px;
  }
}
</style>