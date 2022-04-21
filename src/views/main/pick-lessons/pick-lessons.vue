<template>
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
import { defineComponent, reactive, onMounted, h } from "vue";
import { request } from "@/network/request";
import localCache from "@/utils/cache";
import { ElNotification } from "element-plus";
export default defineComponent({
  setup() {
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
    return {
      lessons4pick,
      handleDelete,
    };
  },
  onMounted() {},
});
</script>
