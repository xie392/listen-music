const getters = {
    token: (state:any) => state.user.token,
    info: (state:any) => state.user.info,
    loading: (state:any) =>  state.loading.loading,
    songId: (state:any) => state.app.songId,
    isVideo: (state:any) => state.app.isVideo,
    songIndex: (state:any) => state.app.songIndex,
    songList: (state:any) => state.app.songList,
    playStatus: (state:any) => state.app.playStatus,
}

export default getters