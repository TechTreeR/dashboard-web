<template>
  <div class="nav-left">
    <el-row class="tac">
      <el-col>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="0" disabled>
            <el-icon></el-icon>
            <span></span>
          </el-menu-item>
          <el-menu-item index="-1" disabled>
            <el-icon></el-icon>
            <span></span>
          </el-menu-item>
          <el-menu-item index="1" @click="toPickLessons">
            <el-icon><folder-opened /></el-icon>
            <span>Square</span>
          </el-menu-item>
          <el-menu-item index="2" @click="toMyLessons">
            <el-icon><document /></el-icon>
            <span>My Lessons</span>
          </el-menu-item>
          <el-menu-item index="3" @click="toChatSpace">
            <el-icon><user-filled /></el-icon>
            <span>Chat</span>
          </el-menu-item>
          <el-menu-item index="4" @click="toMySpace">
            <el-icon><setting /></el-icon>
            <span>Settings</span>
          </el-menu-item>
          <div class="exit" @click="exitSystem">
            <el-menu-item index="4">
              <el-icon><setting /></el-icon>
              <span>Log out</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import {
  Document,
  Setting,
  FolderOpened,
  UserFilled,
} from "@element-plus/icons-vue";
import localCache from "@/utils/cache";

export default defineComponent({
  components: {
    Document,
    Setting,
    FolderOpened,
    UserFilled,
  },
  setup() {
    const router = useRouter();
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const toMySpace = () => {
      console.log("hi");
      router.push("/main/my-space");
    };
    const toPickLessons = () => {
      router.push("/main/pick-lessons");
    };
    const toMyLessons = () => {
      router.push("/main/my-lessons");
    };
    const toChatSpace = () => {
      router.push("/main/chat-space");
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const exitSystem = () => {
      ElMessageBox.confirm(
        "Are you sure to exit the System. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          ElMessage({
            type: "success",
            message: "logout success",
          });
          localCache.clearCache();
          localCache.deleteCache("access_token");
          router.push("/login");
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "logout cancel",
          });
        });
    };
    return {
      handleClose,
      handleOpen,
      toMySpace,
      toPickLessons,
      toMyLessons,
      exitSystem,
      toChatSpace,
    };
  },
});
</script>

<style scoped lang="less">
.exit {
  margin-top: 360px;
}
</style>
