import { login, getRegister, getInfo } from "../../api/user";
import {  setToken, removeToken } from "../../utils/auth";

const user:Object = {
  state: {
    // token: '',
    id: '',
    info: {},
    cookie:''
  },

  mutations: {
    // set_token: (state:any, token:String) => {
    //   state.token = token;
    // },
    set_id: (state:any, id:String) => {
      state.id = id;
    },
    set_info: (state:any, info:Object) => {
      state.info = info;
    },
    set_cookie: (state:any, cookie
      :String) => {
      state.cookie = cookie;
    }
  },

  actions: {
     // 密码登录
     Login({ commit }:any, userInfo:any):any {
        const phone = userInfo.phone;
        const password = userInfo.password;

        return new Promise((resolve, reject) => {
          login({
            phone,
            password,
          })
            .then( (res:any) => {
              commit('set_cookie', res.cookie);
              resolve(res);
            })
            .catch( (error: any) => {
              reject(error);
            });
        });
     },

     // 注册
      LoginByCode({ commit }:any, userInfo:any):any {
        const phone = userInfo.phone;
        const captcha = userInfo.captcha;
        const password = userInfo.password;
        const nickname = userInfo.nickname;

        return new Promise((resolve, reject) => {
          getRegister({
            phone,
            captcha,
            password,
            nickname
          })
            .then( (res:any) => {
              commit('set_cookie', res.cookie);
              resolve(res);
            })
            .catch( (error: any) => {
              reject(error);
            });
        });
      },

      // 用户信息
      GetInfo({ commit }:any):any {
        return new Promise((resolve, reject) => {
          getInfo().then( (res:any) => {
            // console.log("用户信息", res);
            setToken('id',res.data.account.id || '');
            commit("set_info", { account: res.data.account || {}, profile: res.data.profile || {} });
            commit("set_id", res.data.account.id);        
            resolve(res);
          }).catch( (error: any) => {
            reject(error);
          });  
        })   
      },
  
  }
};

const getCookie = function(name:String) {
  console.log("getCookie", document.cookie,name);
  var match = name.match(new RegExp('(^| )__csrf=([^;]+)'));
  if (match) return match[2];
}

export default user;

