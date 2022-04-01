<template>
  <div class="login-account">
    <el-form label-width="60px" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, h } from "vue";
import { useStore } from "vuex";
import { request } from "../../../network/request";
import { ElNotification } from "element-plus";
//import { ElForm } from "element-plus";
//import localCache from '@/utils/cache'

//import { rules } from '../config/account-config'

export default defineComponent({
  setup() {
    const store = useStore();

    const account = reactive({
      name: "",
      password: "",
    });

    const formRef = ref();

    const loginAction = () => {
      if (account.name !== "test" || account.password !== "test") {
        ElNotification({
          title: "Error",
          message: "登陆失败",
          type: "error",
        });
        return;
      }
      request(
        {
          url: "/login",
          method: "post",
          data: { ...account },
        },
        (res) => {
          const result = res.data;
          console.log("登陆成功");
          ElNotification({
            title: "登陆成功",
            message: h(
              "i",
              { style: "color: teal" },
              "登陆成功" + JSON.stringify(result.data)
            ),
          });
        },
        (err) => {
          console.log(err);
        }
      );
      // 发送 axios 请求

      // 利用 vuex 处理相关信息
      console.log("123123");
      console.log({ ...account });
      // formRef.value?.validate((valid) => {
      //   console.log(...account);
      //   if (valid) {
      //     // 1.判断是否需要记住密码
      //     if (isKeepPassword) {
      //       // 本地缓存
      //       //localCache.setCache("name", account.name);
      //       //localCache.setCache("password", account.password);
      //     } else {
      //       //localCache.deleteCache("name");
      //       //localCache.deleteCache("password");
      //     }

      //     // 2.开始进行登录验证
      store.dispatch("login/accountLoginAction", { ...account });
      //     console.log(...account);
      //   }
      // });
    };

    return {
      account,
      //rules,
      loginAction,
      formRef,
    };
  },
});
</script>
