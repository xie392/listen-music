import request from '../utils/request'

/***
 * 获取评论
 * id : 资源 id, 如歌曲 id,mv id
 * type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型  
 *      0: 歌曲
 *      1: mv
 *      2: 歌单
 *      3: 专辑
 *      4: 电台
 *      5: 视频
 *      6: 动态
 * 可选参数
 *      pageNo:      分页参数,第 N 页,默认为 1
*       pageSize:    分页参数,每页多少条数据,默认 20
 *      sortType:    排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
 *      cursor:      当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
 * comment/new?type=0&id=1407551413&sortType=2, 
 */
export function getComment(params:Object){
    return request({
        url:"/comment/new",
        method:"get",
        params,
    })
}
