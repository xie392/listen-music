<template>
  <van-row class="login">
    <van-col class="top">
      <img src="../assets/m.png" />
    </van-col>
    <van-col class="middle">
      <van-field v-model="data.nickname" placeholder="请输入用户名" />
      <van-field v-model="data.phone" placeholder="请输入手机号" />
      <van-field v-model="data.password" placeholder="请输入密码" type="password" />
      <van-row class="code">
        <van-field v-model="data.code" placeholder="请输入验证码" class="input-code" />
        <van-button type="primary" class="btn-code button" @click="handCcode" v-show="!data.handClick">
          发送验证码
        </van-button>
        <van-button class="btn-code button" v-show="data.handClick" plain>{{ data.time < 10 ? `0${data.time}` :
            data.time
        }} s</van-button>
      </van-row>
      <van-button type="primary" class="button" @click="submit" v-show="!data.isLoading">
        注册
      </van-button>
      <van-button loading type="primary" class="button" loading-type="spinner" disabled v-show="data.isLoading" />
      <p class="other">
        <span @click="router.push('/login')">已有账号?登录</span>
        <span @click="router.push('/register')">注册账号</span>
      </p>
    </van-col>
    <div class="bg"></div>
  </van-row>
</template>

<script lang="ts" setup>
import { Toast } from "vant";
import { reactive } from "vue";
import { validUsername, validPassword, validNickName } from "@/utils/validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getCode, getLoginCode, getNickName, getPhone } from "@/api/user";

const data = reactive({
  phone: "",
  password: "",
  code: "",
  nickname: "",
  msg: "登录",
  // 是否正在加载
  isLoading: false,
  // 发送验证码倒计时
  time: 60,
  // 是否点击发送验证码
  handClick: false,
  // 昵称和手机号是否已经被注册
  isTrue: false,
});

const store = useStore();
const router = useRouter();

// 登录
const submit = async () => {
  if (
    data.password.length === 0 ||
    data.phone.length === 0 ||
    data.nickname.length === 0 ||
    data.code.length === 0
  ) {
    return Toast({ message: "请输入内容", position: "top" });
  }
  if (!validNickName(data.nickname)) {
    return Toast({ message: "用户名不合法", position: "top" });
  }
  if (!validPassword(data.password)) {
    return Toast({
      message: "密码必须由2~16位数字和字母组合",
      position: "top",
    });
  }

  // 登录加载
  data.isLoading = true;

  // 验证验证码
  await getLoginCode({ phone: data.phone, captcha: data.code })
    .then(async () => {
      phone();
      data.isLoading = false;
    })
    .catch(() => {
      data.isLoading = false;
      Toast({ message: "验证码输入错误", position: "top" });
    });
};

// 发送验证码
const handCcode = async () => {
  if (!validUsername(data.phone) || data.phone.length === 0) {
    return Toast({ message: "手机号输入不正确", position: "top" });
  }

  await getCode({ phone: data.phone })
    .then((res: any) => {
      if (res.code === 200) {
        Toast({ message: "发送成功", position: "top" });
        data.handClick = true;
        let timer = setInterval(() => {
          if (data.time === 0) {
            data.handClick = false;
            data.time = 60;
            clearInterval(timer);
            return;
          }
          data.time -= 1;
        }, 1000);
      }
    })
    .catch(() => {
      return Toast({ message: "发送失败", position: "top" });
    });
};

// 昵称是否已经被注册
const nickname = async () => {
  await getNickName({ nickName: data.nickname })
    .then(() => {
      Toast({ message: "昵称已存在", position: "top" });
    })
    .catch(() => {
      if (data.isTrue) {
        register();
      }
    });
};

// 手机号是否已经被注册
const phone = async () => {
  await getPhone({ phone: data.phone })
    .then(async (res: any) => {
      if (res.hasPassword) {
        data.isTrue = true;
        Toast({ message: "该手机号已被注册", position: "top" });
      } else {
        await nickname();
        data.isTrue = false;
      }
    })
    .catch((err: any) => {
      Toast({ message: err.message, position: "top" });
    });
};

// 注册
const register = async () => {
  await store
    .dispatch("LoginByCode", {
      phone: data.phone,
      password: data.password,
      captcha: data.code,
      nickName: data.nickname,
    })
    .then((res) => {
      if (res.code === 200) {
        Toast({ message: "注册成功", position: "top" });
        store.dispatch("GetInfo");
        setTimeout(() => {
          data.isLoading = false;
          router.push("/");
        }, 1000);
      }
    })
    .catch((err: any) => {
      data.isLoading = false;
      Toast({ message: err.message, position: "top" });
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
      margin-top: 15px;

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