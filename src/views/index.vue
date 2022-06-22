<template>
  <!-- <load :loading="store.getters.loading"></load> -->
  <Header></Header>
  <!-- <router-link to="/Search" tag="div" class="search">
    <span class="iconfont icon-search">&#xe627;</span>
    <span class="text">搜索你想听的歌曲</span>
  </router-link> -->
  <div class="banner">
    <van-swipe :autoplay="3000" class="list" indicator-color="white" loop>
      <van-swipe-item v-for="(image, index) in data.banners" :key="index" class="img">
        <img v-lazy="image['pic']" />
      </van-swipe-item>
    </van-swipe>
    <!-- <van-swipe class="list" :autoplay="3000" indicator-color="white">
      <van-swipe-item class="img">1</van-swipe-item>
      <van-swipe-item class="img">2</van-swipe-item>
      <van-swipe-item class="img">3</van-swipe-item>
      <van-swipe-item class="img">4</van-swipe-item>
    </van-swipe> -->
  </div>
  <div class="rank">
    <div class="title">
      <p class="title-p">排行榜</p>
      <div class="more">
        <span class="iconfont home-more">更多&#xe8f1;</span>
      </div>
    </div>
    <div class="wrap" v-for="(item, index) in data.topList" :key="index" @click="rank(item)">
      <div class="item">
        <div class="imgs">
          <img v-lazy="item['coverImgUrl']" lazy-load />
        </div>
        <div class="content">
          <p>
            {{ item['name'] }} <span class="iconfont home-more">&#xe8f1;</span>
          </p>
          <div class="txt">
            <p v-for="(ele, i) in item['tracks']" :key="i">
              {{ i + 1 }}.{{ ele['first'] }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="rank">
    <div class="title">
      <p class="title-p">推荐歌单</p>
      <div class="more">
        <span class="iconfont home-more">更多&#xe8f1;</span>
      </div>
    </div>
    <div class="recommend">
      <div class="recommend-song" v-for="(item, index) in data.recommendList" :key="index" @click="Recommend(item)">
        <div class="photo">
          <cover-image :num="item['playCount']" :pic-url="item['picUrl']"></cover-image>
        </div>
        <div class="p-txt">
          <p>{{ item['name'] }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="rank">
    <div class="title">
      <p class="title-p">听书电台</p>
      <div class="more">
        <span class="iconfont home-more">更多&#xe8f1;</span>
      </div>
    </div>
    <div class="recommend radio">
      <div class="recommend-song" v-for="(item, index) in data.radioList" :key="index"
        @click="getRadio(item.program.radio)">
        <div class="photo">
          <cover-image :num="item['program']['listenerCount']" :pic-url="item['program']['radio']['picUrl']">
          </cover-image>
        </div>
        <div class="p-txt">
          <p>{{ item['program']['radio']['name'] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "../components/Header/index.vue";
import coverImage from "../components/Image/index.vue";
import { reactive } from "vue";
import { bannerList } from "../api/banner";
import { topList } from "../api/rank";
import { recommend } from "../api/recommend";
import { radio } from "../api/radio";
import { useRouter } from "vue-router";

let data = reactive({
  // 轮播图
  banners: [],
  // 排行版
  topList: [],
  // 推荐歌单
  recommendList: [],
  // 听书电台
  radioList: []
});

// 获取轮播图数据
const banner = async () => {
  await bannerList().then((res: any) => {
    data.banners = res.banners || [];
  });
};

// 排行榜
const toplist = async () => {
  await topList().then((res: any) => {
    data.topList = res.list || [];
    data.topList.splice(3);
  });
};

// 推荐歌单
const recommendList = async () => {
  await recommend().then((res: any) => {
    data.recommendList = res.result;
  });
};

// 听书电台
const radioList = async () => {
  await radio().then((res: any) => {
    // console.log("电台", res);
    data.radioList = res.result;
    // data.radioList.splice(3);
  });
};

const router = useRouter();

// 排行榜详情
const rank = (item: any) => {
  router.push({ name: "rank", query: { id: item.id } });
};

// 推荐歌单详情
const Recommend = (item: any) => {
  router.push({ name: "recommend", query: { id: item.id } });
};

const getRadio = (item: any) => {
  // console.log("item", item);
  router.push({ name: "radio", query: { id: item.id } });
};

banner();
toplist();
recommendList();
radioList();
</script>

<style lang="scss" scoped>
.search {
  width: 90%;
  margin: 0vw auto;
  margin-top: 4.235vw;
  height: 9vw;
  border-radius: 5.333vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eeeeee8a;

  .icon-search {
    font-size: 4.267vw;
    color: #a1a4b3;
    margin-top: 0.267vw;
    font-weight: bold;
  }

  .text {
    line-height: 9vw;
    font-size: 3.733vw;
    font-weight: 400;
    margin-left: 8px;
    color: #a1a4b3;
  }
}

.banner {
  width: 100%;
  height: 30vw;
  margin-top: 4vw;
  display: flex;
  overflow: auto;

  .list {
    width: 100%;
    .img {
      display: block;
      width: 100%;
      height: 28vw;
      display: flex;
      background: url(../assets/image/music2.png) center center no-repeat;
      background-size: 26vw;
    }

    & img {
      width: 90%;
      margin: 0 auto;
      height: 30vw;
      display: block;
      border-radius: 10px;
      background: skyblue;
    }
  }
}

.rank {
  margin: 2vw auto;
  width: 90%;

  .title {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;

    .title-p {
      margin-top: 5vw;
      margin-bottom: 3vw;
      margin-left: 1vw;
      font-size: 5vw;
      font-weight: 700;
      color: #262338;
      line-height: 7.467vw;
      display: inline-block;
    }

    .more>span {
      margin-top: 5vw;
      margin-bottom: 3vw;
      margin-left: 1vw;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .wrap {
    width: 90%;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    justify-content: space-around;
    // border-bottom: 0.1px solid rgba(0, 0, 0, 0.1);

    .item:first-child {
      margin-top: 0vw;
    }

    .item {
      margin-top: 2vw;
      width: 90vw;
      max-height: 30vw;
      border-radius: 8px;
      display: flex;

      .imgs {
        background: skyblue url(../assets/image/music2.png) center center no-repeat;
        background-size: cover;
        margin-top: 2.2vw;
        width: 25vw;
        height: 25vw;
        border-radius: 15px;
        overflow: hidden;

        img {
          width: 25vw;
        }
      }

      .content {
        margin-left: 5vw;
        overflow: hidden;

        p {
          margin-top: 3vw;
          font-size: 3.733vw;
          font-weight: 500;
          color: #262338;
          line-height: 5.333vw;
          margin-bottom: 5px;
        }

        .txt p {
          padding: 0;
          margin: 0;
          font-size: 2.933vw;
          font-weight: 400;
          color: #a1a4b3;
          line-height: 4.5vw;
          margin-bottom: 0.933vw;
          width: 57.333vw;
          text-overflow: ellipsis;
          width: 53.333vw;
        }
      }
    }
  }

  span.home-more {
    color: #c1c4cd;
    font-size: 3.4vw;
  }

  .recommend {
    width: 100%;
    height: auto;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;

    .recommend-song {
      width: 30%;
      height: 160px;
      border-radius: 3vw;
      margin: 0 1.5%;

      .photo {
        width: 100%;
        height: 26vw;
        border-radius: 3vw;
        background: skyblue url(../assets/image/music2.png) center center no-repeat;
        background-size: cover;
      }

      .photo .p-txt {
        margin: 0 2.5vw;
        width: 25vw;
        height: 3vw;
        box-sizing: border-box;
      }

      .p-txt p {
        margin-top: 3vw;
        font-size: 3.6vw;
        // word-wrap:break-word;
        font-weight: 400;
        padding: 0 2.5vw;
        color: #262338;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        line-height: 5.333vw;
      }
    }
  }

  .radio {
    flex-wrap: nowrap;
    width: 100%;
    overflow-x: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    .recommend-song {
      min-width: 100px;
    }
  }
}

$color: #262338;

::v-deep(.icon-search) {
  font-size: 4.267vw;
  color: $color;
  margin-top: 0.267vw;
  font-weight: bold;
}
</style>

