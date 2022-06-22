<template>
    <div class="loading" v-if="props.loading">
        <!-- <div class="progress" :style="{'left':`${left}%`}"></div> -->
        <van-loading type="spinner" color="#1989fa" class="load"/>
        <!-- <van-skeleton title :row="20" /> -->
    </div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue';

// let left = ref<number>(-100);

const props = defineProps({
    loading: {
        type: Boolean,
        default: true
    },
});

// let timer = setInterval(() => {
//     if (left.value >= 1 && props.loading) {
//         left.value = -100;
//         clearInterval(timer);
//     } else {
//        left.value += 10;
//     }
// }, 100);

</script>

<style lang="scss" scoped>
.loading {
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    overflow: hidden;

    // .progress {
    //     position: absolute;
    //     top: 0;
    //     left: -100%;
    //     width: 100%;
    //     height: 3px;
    //     transition: 0.5s all cubic-bezier(0, 0, 0, 1.12);
    //     background: #f36;
    // }
}  
</style>