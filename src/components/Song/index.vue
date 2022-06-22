<template>
    <van-row class="song-title">
        <h2 class="h2">共 <span class="span">{{ props.songList.length }}</span> 首歌曲</h2>
        <div class="playall">
            <van-icon name="play" class="play" />
            <span class="all">播放全部</span>
        </div>
    </van-row>
    <van-list v-model:loading="data.loading" :finished="data.finished" finished-text="没有更多了" class="song-list"
        @load="onLoad" offset="50">
        <van-row>
            <van-col class="song" v-for="(item, index) in data.list" :key="index">
                <div class="num">{{ index + 1 }}</div>
                <div class="con">
                    <div class="song-name">{{ item['name'] }}</div>
                    <div class="singer">{{ item.ar[0].name }} </div>
                </div>
                <div class="dow">
                    <van-icon name="video" class="icon-dow" v-if="item.mv != 0" />
                    <!-- pause -->
                    <van-icon name="play-circle" class="icon-dow" @click="play(index, item.id)"
                        v-show="data.playId != item.id" />
                    <!-- play -->
                    <van-icon name="pause-circle" class="icon-dow icon-play" @click="pause"
                        v-show="data.playId == item.id" />

                </div>
            </van-col>
        </van-row>

    </van-list>

</template>

<script lang="ts" setup>
import { reactive, watch, watchEffect, onActivated, onDeactivated } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();

const route = useRoute();

const props = defineProps({
    songList: {
        type: Object,
        default: []
    },
});

type Data = {
    loading: boolean,
    finished: boolean,
    list: Array<any>,
    pageNum: number,
    playId: string | number,
    playStatus: boolean,
    playList: any,
}

const data: Data = reactive({
    loading: false,
    finished: false,
    list: [],
    pageNum: 0,
    playId: 0,
    playStatus: false,
    playList:[],
});

const onLoad = () => {
    // 异步更新数据
    setTimeout(() => {
        // 数据全部加载完成
        if (data.list.length >= props.songList.length) {
            data.finished = true;
            return;
        }
        // console.log("触发下拉",data.list);
        for (let i = data.pageNum; i < (data.pageNum + 10); i++) {
            data.list.push(props.songList[i]);
        }

        data.pageNum += 10;

        // 加载状态结束
        data.loading = false;
    }, 1000);
};


watch(() => props.songList, (newVal: any, oldVal: any) => {
    if (newVal == oldVal) return;
    data.list.splice(0);
    data.pageNum = 0;
    data.finished = false;
    data.loading = false;
    onLoad();
})

watch(()=>store.getters.songId,(newVal:any)=>{
    data.playId = newVal;
})

const play = (index: number, id: number) => {
    data.playId = id;
    if (data.playStatus) {
        store.dispatch('setplayStatus');
    }
    data.playStatus = false;
    store.dispatch('setSongId', id);
    store.dispatch('setSongIndex', index);
    if (props.songList == store.getters.songList) return;
    store.dispatch('setSongList', props.songList);
    // data.playList = props.songList;


};

const pause = () => {
    data.playId = '';
    data.playStatus = !data.playStatus;
    store.dispatch('setplayStatus');
};

</script>

<style lang="scss" scoped>
.song-title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 55px;
    box-sizing: border-box;
    padding: 0 4vw;
    border-bottom: 1px solid #cccccc45;

    .h2 {
        font-weight: 700;
        color: #262338;
        font-size: 3.68vw;
        color: #7b7985;

        .span {
            color: #262338;
            font-size: 4.48vw;
            font-weight: 600;
        }
    }

    .playall {
        display: flex;
        align-items: center;
        background: #f7f7f7;
        border-radius: 5vw;
        padding: 2vw 3vw;

        .play {
            font-size: 5vw;
            color: #7b7985;
        }

        .all {
            padding-left: 1.5vw;
            font-size: 3.68vw;
            color: #7b7985;
            font-weight: 600;
        }
    }


}

.song-list {
    width: 100%;

    .song {
        width: 100%;
        display: flex;
        align-items: center;
        min-height: 18vw;
        box-sizing: border-box;
        padding: 0 0 0 4%;

        .num {
            text-align: left;
            font-size: 4.8vw;
            font-weight: 700;
            color: #a1a4b3;
            width: 10%;
        }

        .con {
            display: flex;
            flex-direction: column;
            width: 60%;

            .song-name {
                padding-left: 2vw;
                height: 6vw;
                font-size: 4.267vw;
                font-weight: 700;
                color: #262338;
                line-height: 6vw;
                width: 100%;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .singer {
                padding-top: 1.12vw;
                padding-left: 2vw;
                font-size: 3.4vw;
                display: inline-block;
                font-weight: 400;
                color: #a1a4b3;
            }
        }

        .dow {
            width: 26%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            // background: #262338;

            .icon-dow {
                display: block;
                font-size: 5vw;
                color: #a1a4b3;
                width: 8vw;
                margin-left: 2vw;
            }

            .icon-play {
                font-size: 5.3vw;
                color: #d43c33;
            }
        }
    }
}
</style>