<template>
  <div class="login-account">
    <el-form label-width="60px" :model="account" ref="formRef">
      <el-form-item label="name" prop="name">
        <el-input v-model="account.email" />
      </el-form-item>
      <el-form-item label="pw" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, h } from "vue";
import { useStore } from "vuex";
import { request } from "@/network/request";
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";
//import { ElForm } from "element-plus";
import localCache from "@/utils/cache";

//import { rules } from '../config/account-config'

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const account = reactive({
      email: "",
      password: "",
    });

    const formRef = ref();

    const loginAction = () => {
      request(
        {
          url: "/login",
          method: "post",
          data: { ...account },
        },
        (res) => {
          const result = res.data;
          console.log(result);
          if (result.code === 200) {
            ElNotification({
              title: "Welcome!!",
              message: h(
                "i",
                { style: "color: teal" },
                "Please refresh if not routered"
              ),
              duration: 0,
            });
            localCache.setCache("access_token", result.data.accessToken);
            store.dispatch("login/accountLoginAction", result);

            router.push("/main/pick-lessons");
          } else {
            ElNotification({
              title: "Error",
              message: "login fail",
              type: "error",
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
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
