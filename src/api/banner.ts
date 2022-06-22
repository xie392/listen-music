import request from '../utils/request'

/**
 * 获取轮播图数据
 * @param params { type =  pc 1: android 2: iphone 3: ipad }
 * @returns 
 */
export function bannerList(){
    return request({
        url:"/banner?type=1",
        method:"get",
    })
}