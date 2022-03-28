<template>
  <nav>
    <el-button type="primary" @click="handleClick">Primary</el-button>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { request } from "./network/request";

export default defineComponent({
  setup() {
    const handleClick = () => {
      console.log("123123");
      request(
        {
          url: "/students/getAll",
          method: "get",
        },
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    };

    return { handleClick };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
