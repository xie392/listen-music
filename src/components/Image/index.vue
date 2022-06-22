<template>
    <div class="image">
        <img v-lazy="props.picUrl" />
        <div class="play-total">
            <van-icon name="play" class="play-cir">{{ total }}</van-icon>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
    num: {
        type: Number || String,
        default: 0
    },
    picUrl: {
        type: String,
        default: ""
    },
});

const total = computed(() => {
    let num = props.num;
    let count = num > 100000000 ? (num / 100000000).toFixed(1) + "亿" : 
                num > 10000 ? (num / 10000).toFixed(1) + "万" : num;
    return count;
})

</script>

<style lang="scss" scoped>
.image {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background: #cccccc70 url(../../assets/image/music2.png) center center no-repeat;
    border-radius: 3vw;;

    & img {
        width: 100%;
        height: 100%;
        border-radius: 3vw;
    }

    .play-total {
        display: flex;
        position: absolute;
        z-index: 2;
        bottom: 0;
        left: 0;
        border-radius: 0 3vw 0 3vw;
        height: 7vw;
        max-width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background-color: rgba(0, 0, 0, 0.3);
        align-items: center;
        justify-content: space-evenly;
        padding-right: 10px;

        .play-cir {
            color: #fff;
            font-size: 3.5vw;
            padding-top: 1vw;
            padding-left: 2vw;
            padding-right: 3vw;
            line-height: 7vw;
        }
    }

}
</style>