import request from '../utils/request'

/**
 * 推荐歌单
 * @returns 
 */
export function recommend(){
    return request({
        url:'/personalized?limit=6',
        method:'get'
    })
}

/**
 * 推荐歌单详情
 * @param params { id }
 * @returns 
 */
export function recommendDetail(params:Object){
    return request({
        url:'/playlist/detail',
        method:'get',
        params
    })
}

