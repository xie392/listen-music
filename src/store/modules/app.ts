const app: Object = {
  state: {
    // 歌曲 id
    songId:'',
    songListId:[],
    isVideo:false,
    isPlay:false,
    songIndex:-1,
    // 歌曲列表
    songList:'',
    // 播放状态
    playStatus:true,
  },

  mutations: {
    set_songId: (state: any, songId: Object) => {
      state.songId = songId;
    },
    set_songListId: (state: any, songListId: Array<any>) => {
      state.songListId = songListId;
    },
    set_isVideo: (state: any, isVideo: Boolean) => {  
      state.isVideo = isVideo;
    },
    set_isPlay: (state: any, isPlay: Boolean) => {
      state.isPlay = isPlay;
    },
    set_songIndex: (state: any, songIndex: Number) => {
      state.songIndex = songIndex;
    },
    set_songList: (state: any, songList: Array<any>) => {
      state.songList = JSON.stringify(songList);
    },
    set_next(state: any) {
      state.songIndex = state.songIndex >= state.songList.length - 1 ? 0 : state.songIndex + 1;
      state.songId = JSON.parse(state.songList)[state.songIndex].id;
    },
    set_prev(state: any) {
      state.songIndex = state.songIndex <= 0 ? state.songList.length - 1 : state.songIndex - 1;
      state.songId = JSON.parse(state.songList)[state.songIndex].id;
    },
    set_random(state: any) {
      state.songIndex = Math.floor(Math.random() * JSON.parse(state.songList).length);
      state.songId = JSON.parse(state.songList)[state.songIndex].id;
    },
    set_playStatus(state: any) {
      state.playStatus = !state.playStatus;
    },

  },

  actions: {
    //  获取歌曲id
    setSongId: ({ commit }: any, songId: String) => {
      commit('set_songId', songId);
    },
    // 获取歌曲列表所有id
    setSongListId: ({ commit }: any, songListId: Array<any>) => {
      commit('set_songListId', songListId);
    },
    // 设置视频播放时暂停播放音乐
    setIsVideo: ({ commit }: any, isVideo: Boolean) => {
      commit('set_isVideo', isVideo);
    },
    // 设置播放状态
    setIsPlay: ({ commit }: any, isPlay: Boolean) => {
      commit('set_isPlay', isPlay);
    },
    // 设置当前播放歌曲索引
    setSongIndex: ({ commit }: any, songIndex: Number) => {
      commit('set_songIndex', songIndex);
    },
    // 设置歌曲列表
    setSongList: ({ commit }: any, songList: Array<any>) => {
      commit('set_songList', songList);
    },
    // 下一首
    setNext: ({ commit }: any) => {
      commit('set_next');
    },
    // 上一首
    setPrev: ({ commit }: any) => {
      commit('set_prev');
    },
    // 随机播放
    setRandom: ({ commit }: any) => {
      commit('set_random');
    },
    // 播放 | 暂停
    setplayStatus: ({ commit }: any) => {
      commit('set_playStatus');
    }
  },

};

export default app;