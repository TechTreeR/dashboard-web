<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true" plain
      >Send Comment</el-button
    >
  </div>
  <el-table
    :data="commentsAll.comments"
    style="width: 100%"
    :row-class-name="tableRowClassName"
  >
    <el-table-column prop="cname" label="Class Name" width="150" />
    <el-table-column prop="sname" label="Student Name" width="160" />
    <el-table-column prop="comment" label="Content" width="480" />
    <el-table-column prop="createdTime" label="Date" width="280" />
  </el-table>

  <el-dialog v-model="dialogFormVisible" title="Shipping address">
    <el-form :model="form">
      <el-form-item label="Class name" :label-width="formLabelWidth">
        <el-select v-model="form.cid" placeholder="Please select a class">
          <el-option
            v-for="(item, index) in form.lessons"
            :key="index"
            :label="item.cname"
            :value="item.cid"
          ></el-option>
          <!--<el-option label="Zone No.2" value="beijing" />-->
        </el-select>
      </el-form-item>
      <el-form-item label="Comment" :label-width="formLabelWidth">
        <el-input
          v-model="form.commentContent"
          :rows="4"
          type="textarea"
          placeholder="Please input"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="
            dialogFormVisible = false;
            sendComment();
          "
          >Publish</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import localCache from "@/utils/cache";
import { reactive, ref, onMounted } from "vue";
import { request } from "@/network/request";
import dayjs from "dayjs";
const dialogFormVisible = ref(false);
const form = reactive({
  className: "",
  commentContent: "",
  lessons: [],
});

var commentsAll = reactive({
  comments: [],
});

const tableRowClassName = ({ rowIndex }) => {
  if (rowIndex % 2 === 1) {
    return "";
  } else if (rowIndex % 2 === 0) {
    return "success-row";
  }
  return "";
};

const getAllComments = () => {
  request(
    {
      url: "/students/courses/" + localCache.getCache("uid"),
      method: "get",
    },
    (res) => {
      form.lessons = res.data.data;
    },
    (err) => {
      console.log(err);
    }
  );
  request(
    {
      url: "/comments/all",
      method: "get",
    },
    (res) => {
      var list = res.data.data;
      list.forEach((item) => {
        item.createdTime = dayjs(item.createdTime)
          .add(8, "hour")
          .format("YYYY-MM-DD HH:mm:ss");
        console.log(item.createdTime);
      });
      commentsAll.comments = list;
    },
    (err) => {
      console.log(err);
    }
  );
  console.log(commentsAll.comments);
};
onMounted(getAllComments);
const sendComment = () => {
  console.log(form.commentContent, form.cid);
  var uid = localCache.getCache("uid");
  request(
    {
      url: "/comments/add",
      method: "put",
      data: {
        cid: form.cid,
        sid: uid,
        comment: form.commentContent,
      },
    },
    (res) => {
      console.log(res);
      getAllComments();
    },
    (err) => {
      console.log(err);
    }
  );
};
</script>

<style>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
