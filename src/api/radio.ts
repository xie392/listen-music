import request from '../utils/request'

/**
 * 听书电台
 * @returns 
 */
 export function radio(){
    return request({
        url:'/personalized/djprogram',
        method:'get'
    })
}

/**
 * 电台详情 
 * @param params { rid:电台id, t:时间戳 }
 */
export function radioDetail(params:Object){
    return request({
        url:"/dj/detail",
        method:'get',
        params
    })
}
