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
      <el-table-column prop="place" label="Location" width="90" />
      <el-table-column prop="major" label="Major" width="80" />
      <el-table-column prop="capacity" label="Capacity" width="90" />
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
      <el-table-column width="120" align="right">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="findFriends(scope.$index, scope.row)"
            >Classmates</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogVisible"
      :title="classmates.header"
      width="30%"
      :before-close="handleClose"
    >
      <div v-for="stu in classmates.friends" :key="stu.id">{{ stu.email }}</div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
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
    var dialogVisible = ref(false);
    const searchCId = ref("");
    const lessons4pick = reactive({
      list: [],
      forSelect: [],
    });
    var classmates = reactive({
      header: "123",
      friends: [],
    });
    const getAllClass = () => {
      request(
        {
          url: "/students/courses/" + localCache.getCache("uid"),
          method: "get",
        },
        (res) => {
          lessons4pick.list = res.data.data;
          lessons4pick.forSelect = res.data.data;
          console.log(lessons4pick.list.value);
        },
        (err) => {
          console.log(err);
        }
      );
    };
    onMounted(getAllClass);
    const handleDelete = (index, row) => {
      if (localCache.getCache("cnum") >= 4) {
        console.log("太多了");
        ElNotification({
          title: "Warn",
          message: h(
            "i",
            { style: "color: teal" },
            "You have chosen more than 4 classes"
          ),
          type: "warning",
          duration: 4000,
        });
        return;
      }
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
            row.selected = true;
            localCache.setCache("cnum", localCache.getCache("cnum") + 1);
            ElNotification({
              title: "Success",
              message: h(
                "i",
                { style: "color: teal" },
                "You have added the class successfully"
              ),
              duration: 4000,
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    };
    const findFriends = (index, row) => {
      // 获取 friends
      classmates.header = row.cname;
      request(
        {
          url: "/students/classmates/" + row.cid,
          method: "get",
        },
        (res) => {
          console.log(res.data.data);
          classmates.friends = res.data.data;
        },
        (err) => {
          console.log(err);
        }
      );

      dialogVisible.value = true;
      console.log(index, row);
    };
    const search = () => {
      lessons4pick.list = lessons4pick.forSelect;
      if ("" === searchCId.value) {
        getAllClass();
      }
      console.log("search");
      console.log(searchCId.value);
      var tempList = [];
      lessons4pick.list.forEach((lesson) => {
        tempList.push(
          lesson.cid + lesson.cname + lesson.tname + lesson.place + lesson.major
        );
      });
      var ids = [];
      tempList.forEach((l, index) => {
        if (l.includes(searchCId.value)) {
          ids.push(index);
        }
      });
      lessons4pick.list = lessons4pick.list.filter((lesson, index) => {
        console.log(lesson);
        if (ids.indexOf(index) > -1) {
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
      findFriends,
      dialogVisible,
      classmates,
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
