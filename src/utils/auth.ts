import Cookies from 'js-cookie'

// const TokenKey = 'Token'

export function getToken(TokenKey:string) {
  return Cookies.get(TokenKey)
}

export function setToken(TokenKey:string,token:any) {
  return Cookies.set(TokenKey, token)
}

export function removeToken(TokenKey:string) {
  return Cookies.remove(TokenKey)
}