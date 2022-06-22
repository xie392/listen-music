import axios from "axios";
import { Toast } from 'vant';
import config  from './config';

const service = axios.create({
    baseURL: config.BASE_URL,
    // baseURL:"http://localhost:3000",
    timeout: 50000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8", //表单数据类型
    },
    withCredentials: true // 自动获取cookie
})


// request 拦截器 发送数据到后台服务器前拦截
service.interceptors.request.use(
    (config:any) => {
        // get请求映射params参数
        if (config.method === "get" && config.params) {
            let url = config.url + "?";
            for (const propName of Object.keys(config.params)) {
                const value = config.params[propName];
                var part = encodeURIComponent(propName) + "=";
                if (value !== null && typeof value !== "undefined") {
                    if (typeof value === "object") {
                        for (const key of Object.keys(value)) {
                            let params = propName + "[" + key + "]";
                            var subPart = encodeURIComponent(params) + "=";
                            url += subPart + encodeURIComponent(value[key]) + "&";
                        }
                    } else {
                        url += part + encodeURIComponent(value) + "&";
                    }
                }
            }
            url = url.slice(0, -1);
            config.params = {};
            config.url = url;
        }
        return config;
    },
    (error:any) => {
        console.log("request报错=>", error);
        Promise.reject(error);
    }
)

// response  拦截器 获取后台数据前拦截
service.interceptors.response.use(
    (response:any) => {
        const code = response.data.code || 200;
        // 获取错误信息
        const message = response.data.msg || "error";
        if (code !== 200) {
            return Promise.reject("error");
        }
        return response.data;
    },
    (error:any) => {
        let { message } = error;
        if (message === "Network Error") {
          message = "后端接口连接异常";
        } else if (message.includes("timeout")) {
          message = "系统接口请求超时";
        } else if (message.includes("Request failed with status code")) {
          message = "系统接口" + message.substr(message.length - 3) + "异常";
        }
        Toast({ message, duration:1000, position: "top" });
        return Promise.reject(error);
    }
)

export default service;