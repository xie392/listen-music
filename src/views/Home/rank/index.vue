<template>
    <nav-bar :title="data.title"></nav-bar>
    <van-row class="t-header">
        <img :src="data.bgUrl">
    </van-row>
    <van-row class="m-content">
        <song :song-list="data.playlist"></song>
    </van-row>
</template>

<script lang="ts" setup>
import { reactive,onActivated } from "vue";
import { useRoute } from "vue-router";
import song from "../../../components/Song/index.vue";
import { topListDetail } from "../../../api/rank";
import { useStore } from "vuex";

const route = useRoute();

const store = useStore();

const data = reactive({
    // 排行耪详情
    playlist: [],
    // 背景图
    bgUrl:'',
    // 排行榜标题
    title:'',
    // 上一个页面的id
    oldId:''
});

onActivated(()=>{
    if (route.query.id != data.oldId){
        data.bgUrl = '';
        data.playlist.splice(0);
        topList();
    }
    data.oldId = route.query.id;
})

const topList = async () => {
    await topListDetail({ id: route.query.id || '' }).then((res: any) => {
        // console.log("排行版详情", res);
        data.playlist = res.playlist.tracks || [];
        data.bgUrl = res.playlist.coverImgUrl || '';
        data.title = res.playlist.name || '';
        data.oldId = route.query.id;
    }).catch((err: any) => {
        console.log(err.message);
    });
};

</script>

<style lang="scss" scoped>
.t-header {
    width: 100%;
    height: 40vh;
    background: skyblue url(../../../assets/image/music2.png) center center no-repeat;
    overflow: hidden;
    position: relative;

    img {
        width: 100%;
        position: absolute;
        top:-4vh;
    }
}
</style>