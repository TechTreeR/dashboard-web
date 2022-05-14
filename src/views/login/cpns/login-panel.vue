<template>
  <div class="login-panel">
    <h1 class="title">XJTLU Management System</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> Login</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="register">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> Register</span>
        </template>
        <login-register ref="registerRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">remember me</el-checkbox>
      <el-link type="primary" @click="dialogFormVisible = true"
        >forget password</el-link
      >
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick">{{
      currentTab === "account" ? "Login" : "Register"
    }}</el-button>

    <el-dialog
      v-model="dialogFormVisible"
      title="Forget Password"
      width="360px"
    >
      <div class="register">
        <el-form label-width="80px">
          <el-form-item label="email">
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item label="code">
            <div class="get-code">
              <el-input v-model="form.code" />
              <el-button type="primary" class="get-btn" @click="getVerifyCode"
                >Get Code</el-button
              >
            </div>
          </el-form-item>
          <el-form-item label="password">
            <el-input v-model="form.password" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="
              dialogFormVisible = false;
              changeUserPW();
            "
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, h } from "vue";
import LoginAccount from "./login-account.vue";
import LoginRegister from "./login-register.vue";
import { ElNotification } from "element-plus";
import { request } from "@/network/request";

export default defineComponent({
  components: {
    LoginAccount,
    LoginRegister,
  },
  setup() {
    // 1.定义属性
    const dialogFormVisible = ref(false);
    const isKeepPassword = ref(true);
    const accountRef = ref();
    const registerRef = ref();
    const currentTab = ref("account");
    const form = reactive({
      code: "",
      email: "",
      password: [],
    });
    // 2.定义方法
    const handleLoginClick = () => {
      if (currentTab.value === "account") {
        console.log("login");

        accountRef.value?.loginAction();
        //console.log(accountRef.value);
      } else {
        console.log("Register");
        console.log(registerRef.value);
        registerRef.value?.registerUser();
      }
    };

    const getVerifyCode = () => {
      console.log("123");
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (!reg.test(form.email)) {
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
            data: { to: form.email },
          },
          (res) => {
            console.log(res.data);
            ElNotification({
              title: "The Email has been sended!!",
              message: h(
                "i",
                { style: "color: teal" },
                "Please check your email"
              ),
            });
          },
          (err) => {
            console.log(err);
          }
        );
      }
    };

    const changeUserPW = () => {
      if (
        form.email.length > 6 &&
        form.code.length === 6 &&
        form.password.length > 5
      ) {
        // 可以request
        request(
          {
            url: "/students/xcgpwd",
            method: "put",
            data: {
              email: form.email,
              password: form.password,
              verifyCode: form.code,
            },
          },
          (res) => {
            console.log(res);
            const result = res.data;
            if (result.code === 200) {
              ElNotification({
                title: "You have successfully changed your password",
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
        ElNotification({
          title: "Error",
          message: "Please enter valid user info",
          type: "error",
        });
      }
    };

    return {
      form,
      isKeepPassword,
      accountRef,
      currentTab,
      handleLoginClick,
      registerRef,
      dialogFormVisible,
      getVerifyCode,
      changeUserPW,
    };
  },
});
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}

.get-code {
  display: flex;
}

.get-btn {
  margin-left: 8px;
}
</style>
