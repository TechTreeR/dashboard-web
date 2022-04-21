<template>
  <div>
    <el-row :gutter="2">
      <div class="search-bar">
        <el-input
          v-model="searchCId"
          class="w-50 m-2"
          placeholder="Type cid to find class"
          size="large"
          @change="search"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template>
        </el-input>
      </div>
    </el-row>
  </div>
  <div class="pick-lessons" @click="hi">
    <el-table :data="lessons4pick.list" stripe style="width: 100%" height="600">
      <el-table-column prop="cid" label="ID" width="120" />
      <el-table-column prop="cname" label="Class Name" width="320" />
      <el-table-column prop="tname" label="Teacher" width="160" />
      <el-table-column prop="place" label="Location" width="80" />
      <el-table-column prop="major" label="Major" width="80" />
      <el-table-column prop="capacity" label="Capacity" width="80" />
      <el-table-column label="Operation" width="120" align="right">
        <template #default="scope">
          <el-button
            v-if="!scope.row.selected"
            size="small"
            type="success"
            @click="handleDelete(scope.$index, scope.row)"
            >Add</el-button
          >
          <el-button v-else size="small" type="success" disabled>Add</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Search } from "@element-plus/icons-vue";
import { defineComponent, reactive, onMounted, h, ref } from "vue";
import { request } from "@/network/request";
import localCache from "@/utils/cache";
import { ElNotification } from "element-plus";
export default defineComponent({
  components: {
    Search,
  },
  setup() {
    const searchCId = ref("");
    const lessons4pick = reactive({
      list: [],
    });
    const getAllClass = () => {
      request(
        {
          url: "/students/courses/" + localCache.getCache("uid"),
          method: "get",
        },
        (res) => {
          lessons4pick.list = res.data.data;
          console.log(lessons4pick.list.value);
        },
        (err) => {
          console.log(err);
        }
      );
    };
    onMounted(getAllClass);
    const handleDelete = (index, row) => {
      console.log(index, row);
      row.selected = true;
      // 发送请求进行选课
      request(
        {
          url: "/students/select/" + row.cid + "/" + localCache.getCache("uid"),
          method: "put",
        },
        (res) => {
          const result = res.data;
          console.log(result);
          if (result.code === 200) {
            ElNotification({
              title: "Success",
              message: h(
                "i",
                { style: "color: teal" },
                "You have added the class successfully"
              ),
              duration: 4,
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    };
    const search = () => {
      if ("" === searchCId.value) {
        getAllClass();
      }
      console.log("search");
      console.log(searchCId.value);
      lessons4pick.list = lessons4pick.list.filter((lesson) => {
        if (lesson.cid === searchCId.value) {
          return true;
        }
        return false;
      });
    };
    return {
      lessons4pick,
      handleDelete,
      searchCId,
      search,
    };
  },
  onMounted() {},
});
</script>

<style scoped lang="less">
.search-bar {
  width: 400px;
}
</style>
