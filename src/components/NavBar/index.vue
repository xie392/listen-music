<template>
    <van-sticky :offset-top="0" @scroll="scroll">
        <van-nav-bar :title="data.showTitle ? props.title : ''" left-arrow fixed :border="false"
            :style="{ 'background': `${data.bgColor}` }" @click-left="handBack">
            <template #right>
                <van-icon name="share-o" size="18" v-show="data.showTitle" />
            </template>
        </van-nav-bar>
    </van-sticky>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
    title: {
        type: String,
        default: "排行版"
    },
    back: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['getBack'])

const data = reactive({
    // 背景颜色
    bgColor: 'ragb(0,0,0,0)',
    // 是否显示标题
    showTitle: false
});

const router = useRouter();

const handBack = () => {
    if (props.back) 
        router.back();
    else
        emit("getBack");
};

// 页面滚动时触发
const scroll = (e: any) => {
    if (e.scrollTop > 0) {
        data.showTitle = true;
        data.bgColor = '#d43c33';
    } else {
        data.showTitle = false;
        data.bgColor = 'rgba(0,0,0,0)';
    }
};

</script>

<style lang="scss" scoped>
::v-deep(.van-nav-bar) {
    height: 50px;

    .van-nav-bar__content {
        height: 100%;

        .van-nav-bar__title {
            font-size: 4.08vw;
            color: #fff;
            letter-spacing: 1.5px;
        }
    }

    .van-icon,
    .van-nav-bar__text {
        color: #fff;
        font-size: 4.9265vw;
    }

    .van-icon:active,
    .van-nav-bar__text:active {
        color: #f36;
    }
}
</style>