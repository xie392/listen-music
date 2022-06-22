import request from '../utils/request'

/**
 * 歌曲地址 url
 * @param params { id } 歌曲id
 * @returns 
 */
export function songUrl(params:Object){
    return request({
        url:"/song/url",
        method:"get",
        params
    })
}

/**
 * 歌曲详情
 * @param params { ids } 歌曲id
 * @returns 
 */
 export function songDetail(params:Object){
    return request({
        url:"/song/detail",
        method:"get",
        params
    })
}

/**
 * 获取歌词
 * @param params { id } 歌曲id
 * @returns 
 */
export function songLyric(params:Object){
    return request({
        url:"/lyric",
        method:"get",
        params
    })
}
