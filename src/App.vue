<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { request } from "./network/request";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

export default defineComponent({
  components: {
    ElConfigProvider,
  },
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

    return { handleClick, zhCn };
  },
});
</script>

<style>
.app {
  height: 100%;
}
</style>
