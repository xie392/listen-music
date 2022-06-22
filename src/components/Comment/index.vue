<template>
    <div class="all-comment">
        <van-skeleton title avatar :row="2" :loading="data.loading">
            <div class="comment" v-if="data.comments != 0">
                <div class="left">
                    <div class="avatar"></div>
                </div>
                <div class="right">
                    <div class="top">名字</div>
                    <div class="middle">评论评论评论评论评论评论评论评论评论评论评论评论评论评论
                        评论评论评论评论评论评论评论评论评论评论评论评论评论评论
                        评论评论评论评论评论评论评论评论评论评论评论评论评论评论
                        评论评论评论评论评论评论评论评论评论评论评论评论评论评论
                        评论评论评论评论评论评论评论评论评论评论评论评论评论评论
                    </div>
                    <div class="bottom">
                        <div class="time">
                            <span class="createTime">2022-05-20</span>
                            <span class="reply">回复</span>
                        </div>
                        <div class="mode">点赞</div>
                    </div>
                    <div class="more">展开更多</div>
                </div>
            </div>
            <div class="comment empty" v-else>
                <van-empty image-size="20vh" description="暂无评论" />
            </div>
            <div class="footer-btn">
                <van-field v-model="data.keyword" placeholder="留下你精彩的评论吧" />
                <button class="submit">发送</button>
            </div>
        </van-skeleton>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { getComment } from "../../api/comment";

const props = defineProps({
    id: {
        type: String,
        default: '965180319'
    },
    type: {
        type: Number,
        default: 4
    }
});

const data = reactive({
    // 骨架条显示隐藏
    loading: false,
    // 分页
    pageNo: 1,
    // 评论
    comments: [],
    // 评论
    keyword: ''
});

const comment = async (pageNo: number) => {
    await getComment({
        id: props.id,
        type: props.type,
        sortType: 2,
        pageNo
    }).then((res: any) => {
        console.log("评论:", res);
        data.comments = data.comments.concat(res.comments)
        console.log(data.comments);
    })
}

comment(data.pageNo);
</script>

<style lang="scss" scoped>
.all-comment {
    width: 100%;
    min-height: 40vh;
    position: relative;

    .comment {
        width: 100%;
        height: 100%;
        display: flex;

        .left {
            width: 40px;
            height: 100%;

            .avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #ddd;
            }
        }

        .right {
            width: calc(100% - 48px);
            margin-left: 8px;
            height: auto;
            font-size: 3.78vw;

            .top {
                width: 100%;
                font-weight: 600;
                color: #807d7d;
                margin-bottom: 8px;
            }

            .middle {
                width: 100%;
                line-height: 20px;
                font-size: 3.78vw;
                margin-bottom: 8px;
                // display: -webkit-box;
                // -webkit-box-orient: vertical;
                // -webkit-line-clamp: 3;
                // max-height: 60px;
                // overflow: hidden;

            }

            .bottom {
                width: 100%;
                padding: 0 8px 0 0;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;

                .time {
                    .createTime {
                        color: #ccc;
                    }

                    .reply {
                        margin-left: 10px;
                        color: #3333338a;
                    }
                }
            }

            .more {
                width: 100%;
            }
        }
    }

    .empty {
        align-items: center;
        justify-content: center;
    }

    .footer-btn {
        width: 100%;
        height: 55px;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 99;
        display: flex;
        align-items: center;
        box-shadow: 1px 0 3px #3333333b;
        padding: 0 3vw;
        box-sizing: border-box;

        ::v-deep(.van-cell) {
            height: 80%;
            width: 78%;
            border-radius: 5vw 0 0 5vw;
            background: #f5f5f5;
        }

        .submit {
            width: 20%;
            height: 75%;
            border-radius: 0px 5vw 5vw 0px;
            background: #f5f5f5;
            outline: none;
            border: none;
            font-size: 3.78vw;
            letter-spacing: 2px;
            color: #333333de;
            font-weight: 500;

            &:active {
                color: #f36;
            }
        }
    }
}
</style>
