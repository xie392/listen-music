<template>
  <van-row class="login">
    <van-col class="top">
      <img src="../assets/m.png" />
    </van-col>
    <van-col class="middle">
      <van-field v-model="data.phone" placeholder="请输入手机号" />
      <van-field v-model="data.password" placeholder="请输入密码" type="password" v-if="!data.isCode" />
      <van-row class="code" v-else>
        <van-field v-model="data.code" placeholder="请输入验证码" class="input-code" />
        <van-button type="primary" class="btn-code button" v-show="!data.handClick" @click="handCcode">
          发送验证码
        </van-button>
        <van-button class="btn-code button" v-show="data.handClick">{{ data.time }}&nbsp;s</van-button>
      </van-row>
      <van-button type="primary" class="button" @click="submit" v-show="!data.isLoading">
        登录
      </van-button>
      <van-button loading type="primary" class="button" loading-type="spinner" disabled v-show="data.isLoading" />
      <p class="other">
        <span @click="change">{{ data.msg }}</span>
        <span @click="router.push('/register')">注册账号</span>
      </p>
    </van-col>
    <div class="bg"></div>
  </van-row>
</template>

<script lang="ts" setup>
import { Toast } from "vant";
import { reactive } from "vue";
import { validUsername } from "../utils/validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getCode } from "../api/user";

const data = reactive({
  phone: "",
  password: "",
  code: "",
  msg: "验证码登录",
  // 切换验证码登录
  isCode: false,
  // 验证码按钮是否可用
  isLoginCode: false,
  // 登录按钮状态
  isLogin: false,
  // 是否正在加载
  isLoading: false,
  // 发送验证码倒计时
  time: 60,
  // 是否点击发送验证码
  handClick: false,
});

const store = useStore();
const router = useRouter();

// 登录
const submit = () => {
  if (!data.isCode) {
    if (data.password.length === 0 || data.phone.length === 0) {
      return Toast({ message: "请输入手机号或密码", position: "top" });
    }
    data.isLoading = true;
    store
      .dispatch("Login", {
        phone: data.phone,
        password: data.password,
      })
      .then((res: any) => {
        if (res.code === 200) {
          Toast({ message: "登录成功", position: "top" });
          store.dispatch("GetInfo");
          setTimeout(() => {
            data.isLoading = false;
            router.push("/");
          }, 1000);
        }
      })
      .catch((err: any) => {
        data.isLoading = false;
        Toast({ message: err.response.data.message, position: "top" });
      });
  } else {
    return
    // if (data.code.length === 0) {
    //   return Toast({ message: "请输入验证码", position: "top" });
    // }
    // data.isLoading = true;
    // store
    //   .dispatch("LoginByCode", {
    //     phone: data.phone,
    //     captcha: data.code,
    //   })
    //   .then((res) => {
    //     if (res.code === 200) {
    //       Toast({ message: "登录成功", position: "top" });
    //       store.dispatch("GetInfo");
    //       setTimeout(() => {
    //         data.isLoading = false;
    //         router.push("/");
    //       }, 1000);
    //     } else {
    //       Toast({ message: "验证码错误", position: "top" });
    //     }
    //   })
    //   .catch(() => {
    //     data.isLoading = false;
    //     Toast({ message: "请求错误", position: "top" });
    //   });
  }
};

// 验证码登录切换
const change = () => {
  return Toast({ message: "验证码接口暂不可用", position: "top" });
  // data.isCode = !data.isCode;
  // data.msg = data.isCode ? "密码登录" : "验证码登录";
};

// 发送验证码
const handCcode = () => {
  if (validUsername(data.phone)) {
    return Toast({ message: "手机号输入不正确", position: "top" });
  }
  data.isLogin = true;

  getCode({ phone: data.phone })
    .then((res: any) => {
      if (res.code === 200) {
        Toast({ message: "发送成功", position: "top" });
        data.handClick = true;
        let time = data.time;
        let timer = setInterval(() => {
          if (time === 0) {
            data.handClick = false;
            data.time = 60;
            clearInterval(timer);
            return;
          }
          data.time -= 1;
        }, 1000);
      } else {
        Toast({ message: "发送失败", position: "top" });
      }
    })
    .catch((err: any) => {
      return Toast({ message: err, position: "top" });
    });
};
</script>

<style lang="scss" scoped>
html #app .footer,
body #app .footer {
  height: 0px;
}

.login {
  width: 100%;
  height: 100vh;
  background-color: #f8f9d2;
  background-image: linear-gradient(25deg, #00053d, #562a57, #a25270, #f17f8a);
  color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 999;

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url("../assets/image/login-bg.jpg") no-repeat;
    background-size: 100%;
    filter: blur(3px);
    opacity: 0.1;
  }

  .top {
    flex: 1;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 128px;
    }
  }

  .middle {
    flex: 2.5;
    box-sizing: border-box;
    padding: 0 30px;
    position: relative;
    z-index: 9;

    .code {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
      margin-top: 30px;

      .input-code {
        flex: 60%;
        margin-top: 0px;
      }

      .btn-code {
        flex: 30%;
        margin-top: 0px;
        margin-left: 10px;
        border-radius: 5.333vw;
      }
    }

    .other {
      display: flex;
      margin-top: 20px;
      justify-content: space-between;
      font-size: 3.56vw;

      & span:active {
        color: #f36;
      }

    }
  }
}

::v-deep(.van-field) {
  width: 100%;
  height: 13vw;
  border-radius: 5.333vw;
  background: #f7f8fa;
  border: none;
  font-size: 3.833vw;
  font-weight: 400;
  color: #a1a4b3;
  box-sizing: border-box;
  margin-top: 15px;
  display: flex;
  align-items: center;

  input {
    padding: 0 10px;
    height: 100%;
  }
}

::v-deep(.button) {
  box-sizing: border-box;
  margin-top: 15px;
  width: 100%;
  height: 13vw;
  border-radius: 5.333vw;
}
</style>