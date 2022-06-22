<template>
    <Header></Header>
    <div class="video">
       <video :src="url" class="player"></video>
    </div>
</template>

<script lang="ts" setup>
import Header from "../../components/Header/index.vue";
import { reactive } from "vue";

const data = reactive({
    url:'http://vodkgeyttp8.vod.126.net/cloudmusic/MjQ3NDQ3MjUw/89a6a279dc2acfcd068b45ce72b1f560/533e4183a709699d566180ed0cd9abe9.mp4?wsSecret=9b5809e365d5d9620d64251fcd40428f&wsTime=1654916941',
})

</script>


<style lang="scss" scoped>
.video {
    background: black;
    height: calc(100vh - 13vw);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .player {
        width: 100%;
        min-height: 400px;
    }
}
</style>