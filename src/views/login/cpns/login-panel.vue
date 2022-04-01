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
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> Register</span>
        </template>
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">remember me</el-checkbox>
      <el-link type="primary">forget password</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >LOGIN</el-button
    >
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import LoginAccount from "./login-account.vue";

export default defineComponent({
  components: {
    LoginAccount,
  },
  setup() {
    // 1.定义属性
    const isKeepPassword = ref(true);
    const accountRef = ref();
    const currentTab = ref("account");

    // 2.定义方法
    const handleLoginClick = () => {
      console.log("handleLoginClick");
      if (currentTab.value === "account") {
        console.log("handleLoginClick account");

        accountRef.value?.loginAction();
        //console.log(accountRef.value);
      } else {
        console.log("phoneRef调用loginAction");
      }
    };

    return {
      isKeepPassword,
      accountRef,
      currentTab,
      handleLoginClick,
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
</style>
