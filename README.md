# 享听音乐（移动端）

暂未完善,制作中......

# 技术栈
- Vue3 全家桶
- TypeScript 
- Vite
- Axios
- Sass
- Vant3
- ……

# 介绍
   本项目后台来自于网易云免费node服务器提供的api，本项目主要功能如下：登录，注册，播放音乐，搜索，上一首，下一首，随机播放，循环播放，点赞，收藏，评论，MV播放等功能

# 教程

1、下载 [网易云免费Api](https://gitee.com/xie392/music-server)，或者[官网下载](https://github.com/Binaryify/NeteaseCloudMusicApi) ，或者克隆：

```
git clone https://gitee.com/xie392/music-server.git
```
2、下载本项目,或克隆：

```
git clone https://gitee.com/xie392/listening-music.git
```
3、以上两步完成后，进入目录安装依赖(两个都要装):
```
npm install 
```
4、安装好后，运行网易云服务器:
```
node app.js
```
5、运行项目
```
npm run dev
```
登录注册可以正常使用，并且真实，但可能会与网易云数据不同步，一般修改过后几分钟网易云服务器才会更新