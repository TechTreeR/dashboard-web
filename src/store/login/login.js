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
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    },
  },
  mutations: {
    changeToken(state, token) {
      state.token = token;
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {
    accountLoginAction({ commit }, payload) {
      // 1. 存储用户信息 状态
      console.log("hello vuex");
      console.log(payload);
      console.log("hi");
      commit("changeUserInfo", payload.data.student);
      // 2.转到main
    },
    loadLocalLogin() {},
  },
};

export default loginModule;
