import router from "@/router";

const loginModule = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      permissions: [],
    };
  },
  getters: {},
  mutations: {},
  actions: {
    accountLoginAction(payload) {
      // 1. 存储用户信息 状态
      console.log("hello vuex");
      console.log(payload);
      // 2.转到main
      router.push("/main");
    },
    loadLocalLogin() {},
  },
};

export default loginModule;
