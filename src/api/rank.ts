import request from '../utils/request'

/**
 * 排行榜
 * @returns 
 */
export function topList(){
    return request({
        url:'/toplist/detail',
        method:'get'
    })
}

/**
 * 该排行榜详情
 * @param params { id }
 * @returns 
 */
export function topListDetail(params:Object){
    return request({
        url:'/playlist/detail',
        method:'get',
        params
    })
}