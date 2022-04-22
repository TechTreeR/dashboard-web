<template>
  <div class="register">
    <el-form label-width="70px">
      <el-form-item label="email">
        <el-input v-model="register.email" />
      </el-form-item>
      <el-form-item label="code">
        <div class="get-code">
          <el-input v-model="register.code" />
          <el-button type="primary" class="get-btn" @click="getVerifyCode"
            >Get Code</el-button
          >
        </div>
      </el-form-item>
      <el-form-item label="password">
        <el-input v-model="register.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, h, defineExpose } from "vue";
import { request } from "@/network/request";
import { ElNotification } from "element-plus";
const register = reactive({
  email: "",
  code: "",
  password: "",
});
const getVerifyCode = () => {
  console.log("123");
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  console.log(register.email);
  if (!reg.test(register.email)) {
    ElNotification({
      title: "Error",
      message: "Please enter valid email",
      type: "error",
    });
    return;
  } else {
    // 进入 发送邮件逻辑
    request(
      {
        url: "/sendCode",
        method: "post",
        data: { to: register.email },
      },
      (res) => {
        console.log(res.data);
        ElNotification({
          title: "The Email has been sended!!",
          message: h("i", { style: "color: teal" }, "Please check your email"),
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  reg.test(register.email);
  console.log("mail");
};
const registerUser = () => {
  console.log("enter register logic");
  if (
    register.email.length > 6 &&
    register.code.length === 6 &&
    register.password.length > 6
  ) {
    // 可以request
    request(
      {
        url: "/registry",
        method: "post",
        data: {
          email: register.email,
          password: register.password,
          verifyCode: register.code,
          name: "new user",
          sex: "male",
        },
      },
      (res) => {
        console.log(res);
        const result = res.data;
        if (result.code === 200) {
          ElNotification({
            title: "Congratulation! Register Sucess",
            message: h("i", { style: "color: teal" }, "Please login"),
          });
        } else {
          ElNotification({
            title: "Error",
            message: "Please enter valid user info",
            type: "error",
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  } else {
    // 输入信息有误 不可以
    console.log("haren123");
    ElNotification({
      title: "Error",
      message: "Please enter valid user info",
      type: "error",
    });
  }
};
defineExpose({
  registerUser,
});
</script>
<style scoped>
.get-code {
  display: flex;
}

.get-btn {
  margin-left: 8px;
}
</style>
