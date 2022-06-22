<template>
    <nav-bar :title="data.radioDetail.name"></nav-bar>
    <div class="radio">
        <div class="bg" v-lazy:background-image="data.radioDetail.picUrl"></div>
        <div class="top-bg"></div>
        <div class="bottom-bg"></div>
        <div class="top">
            <div class="img">
                <cover-image :pic-url="data.radioDetail.picUrl" :num="data.radioDetail.subCount"></cover-image>
            </div>
        </div>
        <div class="title">{{ data.radioDetail.name }}</div>
        <div class="sub-title"> 作者：{{ data.radioDetail.name }} </div>
        <div class="sub-title"> 时间：{{ new Date(data.radioDetail.createTime).toLocaleString() }} </div>
        <div class="bottom-list">
            <span class="iconfont">&#xe6a5;</span>
            <span class="iconfont">&#xe668;</span>
            <span class="iconfont" @click="data.show = true">&#xe891;</span>
            <span class="iconfont like">&#xe86f;</span>
            <van-popup v-model:show="data.show" closeable position="bottom" :style="{ height: '60%' }">
                <comment :id="route.query.id" :type="4"></comment>
            </van-popup>
        </div>
        <div class="sub-title">【介绍】</div>
        <div class="sub-title p" ref="text">{{ description(data.description) }}</div>
        <div class="more sub-title">展开更多</div>
    </div>
</template>

<script lang="ts" setup>
import coverImage from "../../../components/Image/index.vue";
import comment from "../../../components/Comment/index.vue";
import { radioDetail } from "../../../api/radio";
import { reactive, onActivated, ref, onMounted, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";

const data = reactive({
    // 简介
    description: '',
    oldId: '',
    // 作者信息
    creator: {
        avatarUrl: '',
        nickname: '',
        userId: '',
    },
    // 评论
    show: false,
    // 电台信息
    radioDetail: [],
    // 多余文字展开 | 收起
    moreText: false,
})

let refs:any = null;

onMounted(() => {
    let { $refs } = (getCurrentInstance() as any).proxy;
    refs = $refs;
    onLoad();
});

const route = useRoute();

// 获取电台信息
const getRadio = async () => {
    await radioDetail({ rid: route.query.id, })
        .then((res: any) => {
            console.log("获取电台信息", res);
            data.radioDetail = res.data;
            // data.title = res.data.name;
            // data.bgUrl = res.data.picUrl;
            // data.playCount = res.data.subCount;
            // data.desc = res.data.rcmdText;
            data.description = res.data.desc;
            let { avatarUrl, nickname, userId } = res.data.dj;
            data.creator = { avatarUrl, nickname, userId }
            data.oldId = route.query.id;
        });
}

// 简介
const description = (text: string) => {
    let list = text.replace(/\n/g, ' ');
    return list;
}

const onLoad = async () => {
    // var d = document.querySelector('.p');
    console.log("p", refs.text.clientHeight,refs.text.nodeValue);
}
-+

onActivated(() => {
    if (route.query.id != data.oldId) {
        data.bgUrl = '';
        getRadio();
    }
    data.oldId = route.query.id;
})

</script>

<style lang="scss" scoped>
.radio {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    padding: 30vw 3vw 0 3vw;
    box-sizing: border-box;
    text-align: center;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
        width: 0 !important
    }

    .bg {
        width: 100%;
        min-height: 100vh;
        background: rgba(0, 0, 0, 0.3);
        position: absolute;
        top: 0;
        left: 0;
        -webkit-filter: brightness(0.5); //兼容不同浏览器
        -o-filter: brightness(0.5);
        -moz-filter: brightness(0.5);
        filter: brightness(0.4); //设置亮度值，范围：0-1  
        background-repeat: no-repeat;
        background-size: cover !important;
        filter: blur(100px);
        z-index: -1;
    }

    .top-bg {
        position: absolute;
        z-index: -1;
        left: 0px;
        top: 0px;
        height: 80%;
        width: 100%;
        background-image: linear-gradient(180deg, #000, rgba(0, 0, 0, 0));
    }

    .bottom-bg {
        position: absolute;
        z-index: -1;
        left: 0px;
        bottom: 0px;
        height: 100%;
        width: 100%;
        background-image: linear-gradient(180deg, rgba(0, 0, 0, 0), #000);
    }

    .top {
        width: 100%;
        margin-bottom: 10px;

        .img {
            width: 30vw;
            height: 30vw;
            background: #d5d5d5;
            border-radius: 3vw;
            margin: 0 auto;
        }
    }


    .title {
        font-size: 3.87vw;
        color: #edebeb;
        font-weight: 700;
        line-height: 6vw;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin-bottom: 10px;
    }

    .sub-title {
        font-size: 3.57vw;
        color: #edebebbf;
        margin-bottom: 8px;
        line-height: 24px;
    }

    .p {
        text-indent: 18px;
        padding: 0 1vw;
        height: 72px;
        overflow: auto;
        box-sizing: border-box;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        float:left;
        word-wrap:break-word;
    }

    .bottom-list {
        width: 95%;
        height: 10vh;
        position: relative;
        z-index: 9;
        left: 2.5%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        & span {
            display: block;
            width: 33.33%;
            text-align: center;
            line-height: 10vh;
            font-size: 7vw;
            color: #fff;
            font-weight: 550;
        }

        & .like {
            font-weight: 580;
        }

        & .live {
            font-size: 7.8vw;
        }
    }

    .more {
        font-size: 3.5vw;
        color: rgb(25, 137, 250);
        text-decoration: underline;

        &:active {
            color: #d43c33;
        }
    }
}
</style>

