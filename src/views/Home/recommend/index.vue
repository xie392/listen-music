<template>
    <nav-bar :title="data.title"></nav-bar>
    <van-row class="t-header">
        <div class="t-bg" v-lazy:background-image="data.bgUrl"></div>
        <div class="t-list">
            <div class="left-list">
                <div class="img">
                    <cover-image :pic-url="data.bgUrl" :num="data.playCount"></cover-image>
                </div>
            </div>
            <div class="right-list">
                <div class="top-title">{{ data.title }}</div>
                <div class="btns">
                    <div class="avatar">
                        <img v-lazy="data.creator.avatarUrl" />
                    </div>
                    <span class="nickname">{{ data.creator.nickname }}</span>
                    <van-icon name="plus" class="follow">关注作者</van-icon>
                    <!-- <van-icon  class="follow">已关注</van-icon> -->
                </div>
                <div class="bottom-title">
                    {{ data.description }}
                </div>
            </div>
        </div>
        <div class="bottom-list">
            <span class="iconfont">&#xe6a5;</span>
            <span class="iconfont">&#xe668;</span>
            <span class="iconfont">&#xe891;</span>
            <span class="iconfont like">&#xe86f;</span>
            <!-- <span class="iconfont live" v-show="live" @click="getLive">&#xe8c3;</span> -->

            <!-- <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
            <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
                <Comment :id="id" :type="type"></Comment>
            </van-popup> -->
        </div>
    </van-row>
    <van-row class="m-content">
        <song :song-list="data.playlist"></song>
    </van-row>
</template>

<script lang="ts" setup>
import coverImage from "../../../components/Image/index.vue";
import song from "../../../components/Song/index.vue";
import { reactive, onDeactivated, onActivated } from "vue";
import { recommendDetail } from "../../../api/recommend";
import { useRoute } from "vue-router";

const route = useRoute();

type infinite = {
    playlist: Array<any>,
    bgUrl: string,
    title: string,
    creator: {
        avatarUrl: string,
        nickname: String,
        userId:string,
    },
    description: string,
    playCount: number,
    oldId: any
}

const data:infinite = reactive({
    // 推荐歌单列表
    playlist: [],
    // 背景图
    bgUrl: '',
    // 推荐歌单标题
    title: '',
    // 作者信息
    creator: {
        avatarUrl: '',
        nickname: '',
        userId:'',
    },
    // 歌单描述
    description: '',
    // 播放总数
    playCount:0,
    // 上一个页面的id
    oldId:''
});

onActivated(()=>{
    if (route.query.id != data.oldId){
        data.bgUrl = '';
        data.playlist.splice(0);
        recommend();
    }
    data.oldId = route.query.id;
})

// 推荐详情
const recommend = async () => {
    await recommendDetail({ id: route.query.id || '' }).then((res: any) => {
        data.playlist = res.playlist.tracks || [];
        data.bgUrl = res.playlist.coverImgUrl || '';
        data.title = res.playlist.name || '';    
        data.description = res.playlist.description || '';
        data.playCount = res.playlist.playCount || 0;
        let  { avatarUrl,nickname, userId }= res.playlist.creator || {};
        data.creator = { avatarUrl,nickname, userId };
    }).catch((err: any) => {
        console.log(err.message);
    });
};

recommend();

// // 清除数据
// onDeactivated(() => {
//     data.playlist = [];
// });

</script>

<style lang="scss" scoped>
.t-header {
    width: 100%;
    height: 40vh;
    background: skyblue url(../../../assets/image/music2.png) center center no-repeat;
    overflow: hidden;
    position: relative;

    .t-bg {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        position: absolute;
        top: 0;
        left: 0;
        -webkit-filter: brightness(0.5); //兼容不同浏览器
        -o-filter: brightness(0.5);
        -moz-filter: brightness(0.5);
        filter: brightness(0.5); //设置亮度值，范围：0-1
    }

    .t-list {
        position: relative;
        z-index: 9;
        width: 100%;
        height: 20vh;
        margin-top: 10vh;
        display: flex;
        color: #fff;

        .left-list {
            width: 40%;
            height: 100%;
            display: flex;
            justify-content: center;

            .img {
                width: 90%;
                height: 100%;
            }
        }

        .right-list {
            width: 60%;
            height: 20vh;

            .top-title {
                font-size: 4.3vw;
                color: #edebeb;
                font-weight: 700;
                line-height: 6vw;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                min-height: 12vw;
            }

            .btns {
                width: 95%;
                padding-top: 3vw;
                display: flex;
                align-items: center;

                .avatar {
                    width: 10vw;
                    height: 10vw;
                    margin-right: 1.5vw;
                    border-radius: 50%;
                    background: #cccccc70 url(../../../assets/image/music2.png) center center no-repeat;
                    overflow: hidden;

                    &>img {
                        width: 100%;
                    }
                }

                .nickname {
                    color: #d5d5d5;
                    padding-right: 1.5vw;
                    width: 30%;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    font-size: 3.5vw;
                }

                .follow {
                    border: 1px solid #ffffff4d;
                    display: block;
                    padding: 1.5vw 2.4vw;
                    font-size: 3.4vw;
                    color: #fff;
                    font-weight: 600;
                    border-radius: 8vw;
                }

                .isfollow {
                    color: #d3c5c5c7;
                    padding: 1vw 3vw;
                }
            }

            .bottom-title {
                width: 95%;
                font-size: 3.7vw;
                color: #fff;
                padding-top: 4vw;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
        }
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

}
</style>

