<!-- 音乐播放器 @author xie392 -->
<template>
    <div class="min-player" v-show="!data.play">
        <div class="left">
            <div :class="['cover-img', 'play', { 'pause': !store.getters.playStatus }]"
                :style="{ background: `url(${data.coverImg})` }" @click="data.play = true">
            </div>
        </div>
        <div class="middle">
            <h3>{{ data.songName }}</h3>
            <p>{{ data.singerName }}</p>
        </div>
        <div class="right">
            <span class="iconfont" @click="prev">&#xe64c;</span>
            <span class="iconfont" @click="playStatus">{{ store.getters.playStatus ? '&#xe64d;' : '&#xe649;' }}</span>
            <span class="iconfont" @click="next">&#xe64a;</span>
        </div>
    </div>

    <div class="max-player" v-show="data.play">
        <div class="play-bg" :style="{ background: `url(${data.coverImg})` }"></div>
        <span class="iconfont comeback" @click="data.play = false">&#xe772;</span>
        <div class="shade"></div>
        <div class="top-shade"></div>
        <div class="content">
            <div class="top-title">
                <h4>{{ data.songName }}</h4>
                <p>{{ data.singerName }}</p>
            </div>
            <!-- 唱片模式 -->
            <div class="music" v-show="!data.lrcMode" @click="data.lrcMode = !data.lrcMode">
                <img :src="data.coverImg" ref="play" :class="['play', { 'pause': !store.getters.playStatus }]" />
            </div>
            <!-- 歌词模式 -->
            <div class="lyric" v-show="data.lrcMode" @click="data.lrcMode = !data.lrcMode">
                <div class="lyric-show">
                    <ul class="lyric-list" :style="{ transform: 'translateY(' + data.lyricTop + ')' }">
                        <li v-for="(item, index) in data.lyric" :key="index"
                            :class="{ active: data.currentRow == index + 1 }">
                            {{ item.text }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="bottom-btn">
                <div class="bar">
                    <span class="left-time"> {{ filterTime(data.timeLeft) }}</span>
                    <div class="step">
                        <van-slider v-model="data.value" @input="inputchanage" @change="sliderchange" bar-height="2px"
                            active-color="#ee0a24" button-size="13px" />
                    </div>
                    <span class="right-time">{{ filterTime(data.timeRight) }}</span>
                </div>
                <div class="play-btn">
                    <!-- 随机播放 -->
                    <span class="iconfont little" @click="data.random = !data.random">
                        {{ data.random ? '&#xe634;' : '&#xe6af;' }}
                    </span>
                    <!-- 循环播放 -->
                    <!-- <span class="iconfont little"  @click="random">&#xe6af;</span> -->
                    <!-- 随机播放 -->
                    <!-- <span class="iconfont">&#xe6a7;</span> -->
                    <!-- 上一首 -->
                    <span class="iconfont" @click="prev">&#xe64c;</span>
                    <!-- 暂停 -->
                    <span class="iconfont play-b" @click="playStatus">{{ store.getters.playStatus ? '&#xe64d;' :
                            '&#xe649;'
                    }}</span>
                    <!-- 播放 -->
                    <!-- <span class="iconfont play-b">&#xe64d;</span> -->
                    <!-- 下一首 -->
                    <span class="iconfont" @click="next">&#xe64a;</span>
                    <!-- 喜欢 -->
                    <span class="iconfont littl">&#xe86f;</span>
                    <!-- <span class="iconfont little live">&#xe8c3;</span> -->
                </div>
            </div>
        </div>
    </div>
    <audio ref="audio" autoplay controls :src="data.url" hidden @loadeddata="loadeddataFun"></audio>

</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import { songUrl, songLyric } from "../../api/song";
import { useStore } from "vuex";

const store = useStore();

const data = reactive({
    // 歌曲 Id
    songId: 0,
    // 歌曲 url
    url: "",
    // 歌曲名称
    songName: "",
    // 歌手名称
    singerName: "",
    // 歌曲封面
    coverImg: "",
    // 歌曲左侧时间
    timeLeft: "0",
    // 歌曲右侧时间
    timeRight: "0",
    // 小型播发器-false | 大型播发器-true
    play: false,
    // 播放进度
    value: 0,
    // 随机-true | 顺序-false 默认顺序
    random: false,
    // 上一首-true | 下一首-false
    randomPlay: true,
    // 歌词模式-true | 唱片模式-false
    lrcMode: false,
    // 歌词
    lyric: [],
    //歌词高亮
    currentRow: 0,
    // 歌词向上移动
    lyricTop: "0vw",
})

data.songId = store.getters.songId;

let index = store.getters.songIndex;

let songList = JSON.parse(store.getters.songList);

let timer: any = null;

const audio = ref(null);

// 获取歌曲信息
const getSongDetail = async () => {
    data.songName = songList[index].name;
    data.singerName = songList[index].ar[0].name;
    data.coverImg = songList[index].al.picUrl;
    await songUrl({ id: data.songId }).then((res: any) => {
        data.url = res.data[0].url;
    })
    await songLyric({ id: data.songId }).then((res: any) => {
        formatLyric(res.lrc.lyric);
    })
}

// 音乐加载完成后,获取音乐数据
const loadeddataFun = async () => {
    let duration = audio.value.duration;
    data.timeRight = duration;
    data.timeLeft = 0;
    data.value = 0;
    getTime();
};

// 播放
const playStatus = () => { store.dispatch('setplayStatus'); }

const play = () => {
    if (store.getters.playStatus) {
        audio.value.play();
        getTime();
    } else {
        audio.value.pause();
        clearInterval(timer);
    };
}

// 下一首
const next = () => {
    data.randomPlay = true;
    random();
}

// 上一首
const prev = () => {
    data.randomPlay = false;
    random();
}

// 定时器
const getTime = () => {
    timer = setInterval(() => {
        if (audio.value.currentTime != null) {
            let currentTime = audio.value.currentTime || 0; //实时变化时间
            let duration = audio.value.duration || 0; //总时间
            data.value = currentTime;
            data.timeLeft = currentTime;
            // 计算滚动条值
            data.value = (currentTime / duration) * 100;
            if (data.value == 100) {
                clearInterval(timer);
                random();
            }
        }
    }, 999);
};

// 过滤时间
const filterTime = (time: number) => {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    if (min == 0 && sec == 0)
        return "0:00";
    else
        return min + ":" + (sec < 10 ? "0" + sec : sec);
}

// 进度条
const sliderchange = async () => {
    var duration = (audio.value.duration * data.value) / 100;
    data.timeLeft = duration; //修改页面数据
    audio.value.currentTime = duration; //修改播放时间
    getTime();
}

// 滚动条滑动
const inputchanage = async () => {
    clearInterval(timer);
}

// 随机 | 顺序播放
const random = async () => {
    // 随机播放
    if (data.random) {
        store.dispatch('setRandom');
    } else {
        if (data.randomPlay) {
            store.dispatch('setNext');
        } else {
            store.dispatch('setPrev');
        }
    }
};

// 处理歌词结构
const formatLyric = async (text: string) => {
    data.lyric = [];
    let arr = text.split("\n"); //把原歌词切割成字符串
    let row = arr.length; //获取数组长度
    for (let i = 0; i < row; i++) {
        let temp_row = arr[i]; //[00:00.000] 作词 : MK王逸杰
        let temp_arr = temp_row.split("]"); //[00:00.000 , 作词 : MK王逸杰
        let lyrictext: any = temp_arr.pop(); //删除数组最后一个,返回值
        temp_arr.map((el) => {
            type obj = {
                text: string,
                time: number | string
            }
            let obj: obj = {
                text: '',
                time: '',
            };
            // [00:00.000 => [00,00.000]
            let time_arr: Array<any> = el.substring(1, el.length - 1).split(":");
            let s = time_arr[0] * 60 + Math.ceil(time_arr[1]); //把分钟变成秒
            obj.text = lyrictext;
            obj.time = s;
            if (lyrictext.length > 0) {
                data.lyric.push(obj); //每一行歌词处理后放入数组中
            }
        });
    }
    if (data.lyric.length == 0) {
        data.lyric.push({
            text: "暂无歌词",
            time: 0,
        });
    }
    // console.log(this.lyric);
}

watch(() => [store.getters.songId, data.timeLeft], (newVal: any) => {
    for (let i = 0; i < data.lyric.length; i++) {
        if (data.timeLeft <= data.lyric[i].time) {
            data.lyricTop = -7 * i + "vw";
            data.currentRow = i;
            break;
        }
    }
    if (data.songId != newVal[0]) {
        //歌词高亮
        data.songId = newVal[0];
        index = store.getters.songIndex;
        songList = JSON.parse(store.getters.songList);
        getSongDetail();
    }
})

watch(() => store.getters.playStatus, () => {
    play();
})

getSongDetail();

</script>

<style lang="scss" scoped>
.min-player {
    width: 100%;
    height: 60px;
    position: fixed;
    background: #fff;
    z-index: 99;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;

    .left {
        width: 20%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .cover-img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #ccc url('../../assets/image/music2.png') center center no-repeat;
            background-size: cover !important;
            box-shadow: 0 0 5px rgba(204, 204, 204, 0.525);
        }
    }

    .middle {
        width: 45%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        h3 {
            font-weight: 560;
            font-size: 4vw;
            line-height: 7vw;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        p {
            font-weight: 500;
            font-size: 3.2vw;
            line-height: 6vw;
        }
    }

    .right {
        width: 35%;
        height: 9vw;
        position: absolute;
        right: 0;
        margin: auto;
        top: 0;
        bottom: 0;
        display: flex;
        justify-items: center;
        z-index: 99;

        span {
            z-index: 100;
            display: block;
            padding: 0 1.2vw;
            font-size: 9vw;
            font-weight: 400;
        }
    }
}

.max-player {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transform-origin: center center;
    background: #333;

    .play-bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        // -webkit-filter: brightness(0.8); //兼容不同浏览器
        // -o-filter: brightness(0.8);
        // -moz-filter: brightness(0.8);
        // filter: brightness(0.8); //设置亮度值，范围：0-1
        z-index: 9;
        filter: blur(50px);
        background-size: 100% !important;
    }

    .comeback {
        color: #fff;
        font-size: 6vw;
        font-weight: bold;
        position: absolute;
        left: 4vw;
        top: 4vw;
        z-index: 400;
    }

    .shade {
        position: absolute;
        z-index: 300;
        left: 0px;
        bottom: 0px;
        height: 60%;
        width: 100%;
        background-image: linear-gradient(180deg, rgba(0, 0, 0, 0), #000);
    }

    .top-shade {
        position: absolute;
        z-index: 300;
        left: 0px;
        top: 0px;
        height: 50%;
        width: 100%;
        background-image: linear-gradient(180deg, #000, rgba(0, 0, 0, 0));
    }

    .content {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 305;

        .top-title {
            width: 100vw;
            height: 15vw;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            h4,
            p {
                width: 50vw;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-align: center;
                color: #fff;
                line-height: 6vw;
            }

            h4 {
                font-size: 4.5vw;
            }

            p {
                font-size: 3.2vw;
            }
        }

        .music {
            width: 75vw;
            height: 75vw;
            border-radius: 50%;
            margin: 20vw auto;
            overflow: hidden;
            background: rgba(0, 0, 0, 0.3) url('../../assets/image/music2.png') center center no-repeat;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                width: 90%;
                height: 90%;
                border-radius: 50%;
            }
        }

        .lyric {
            width: 100%;
            height: 50%;
            margin: 20vw auto;
            display: flex;
            overflow: hidden;
            justify-content: center;
            align-items: center;
            background: rgba(0, 0, 0, 0.02);

            .lyric-show {
                width: 98%;
                margin: 0 auto;
                height: 7vw;
                position: relative;

                .lyric-list {
                    tab-size: center;
                    list-style: none;
                    width: 98%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    transform: translateY(0vw);
                    transition: 0.5s all linear;

                    & li {
                        font-size: 3.68vw;
                        padding: 0 2vw;
                        box-sizing: border-box;
                        color: #fff;
                        width: 98vw;
                        height: 7vw;
                        text-align: center;
                        line-height: 7vw;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-family: Arial, Helvetica, sans-serif;
                    }

                    & li.active {
                        transform: scale(1.3);
                        color: #d43c33;
                    }
                }
            }
        }

        .bottom-btn {
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0;
            height: 45vw;
            z-index: 450;

            .bar {
                height: 20vw;
                width: 90vw;
                display: flex;
                margin: 0 auto;
                align-items: center;
                justify-content: center;

                span {
                    display: block;
                    width: 5vw;
                    color: #fff;
                    font-size: 3.4vw;
                    text-align: center;
                }

                .step {
                    width: 80vw;
                    margin: 0vw 3vw;
                    padding: 0vw 0vw 0vw 2.2vw;
                }
            }

            .play-btn {
                height: 20vw;
                margin: 0 auto;
                width: 100vw;
                display: flex;
                align-items: center;
                justify-content: space-evenly;

                &>span.iconfont {
                    font-size: 9vw !important;
                    color: #fff;
                    font-weight: 550 !important;
                }

                span.little {
                    font-family: 600;
                }

                span.play-b {
                    font-size: 12vw !important;
                }
            }
        }
    }

}

// 播放
.play {
    animation: rotate 15s linear infinite forwards;
}

// 暂停
.pause {
    animation-play-state: paused;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>