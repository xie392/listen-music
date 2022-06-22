import request from '../utils/request'

/**
 * 密码登录
 * @param params { phone, password }
 * @returns  Object
 */
export function login(data:Object):any {
  return request({
    url: '/login/cellphone',
    method: 'post',
    data,
  })
}

/**
 * 发送验证码
 * @param params { phone }
 * @returns  Object
 */
export function getCode(params:Object):any {
  return request({
    url: '/captcha/sent',
    method: 'get',
    params
  })
}

/**
 * 验证码验证
 * @param params { phone captcha }
 * @returns 
 */
export function getLoginCode ( params:Object ):any {
  return request({
    url: '/captcha/verify',
    method: 'get',
    params
  })
}

/**
 * 获取用户信息
 * @returns 
 */
export function getInfo():any {
  return request({
    url: '/login/status',
    method: 'get',
  })
}

/**
 * 注册
 * @param data { captcha: 验证码 phone : 手机号码 password: 密码 nickname: 昵称 }
 * @returns 
 */
export function getRegister(data:Object):any {
  return request({
    url: '/register/cellphone',
    method: 'post',
    data,
  })
}

/**
 * 验证用户名是否已经被注册 
 * @param params { nickname }
 * @returns 
 */
export function getNickName(params:Object):any {
  return request({
    url: '/activate/init/profile',
    method: 'get',
    params
  })
}

/**
 * 验证用户名是否已经被注册
 * @param params  { phone }
 * @returns 
 */
export function getPhone(params:Object):any {
  return request({
    url: '/cellphone/existence/check',
    method: 'get',
    params
  })
}
