<template>
  <div class="my-class">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
    >
      <div class="input-box">
        <el-form-item label="Student name" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="Sex" prop="sex">
          <el-input v-model="ruleForm.sex" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item label="Major" prop="major">
          <el-input v-model="ruleForm.major" />
        </el-form-item>
      </div>

      <el-form-item>
        <el-button size="small" type="success" @click="saveSelfInfoChange"
          >Save</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import localCache from "@/utils/cache";
import { request } from "@/network/request";
import { reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";

const ruleForm = reactive({
  name: "",
  sex: "",
  email: "",
  major: "",
});
const saveSelfInfoChange = () => {
  if (
    "" === ruleForm.email ||
    "" === ruleForm.major ||
    "" === ruleForm.name ||
    "" === ruleForm.sex
  ) {
    return;
  }
  request(
    {
      url: "/students/update",
      method: "put",
      data: {
        id: localCache.getCache("uid"),
        email: ruleForm.email,
        major: ruleForm.major,
        name: ruleForm.name,
        sex: ruleForm.sex,
      },
    },
    (res) => {
      ElMessage({
        message: "Congrats, you have saved your Information.",
        type: "success",
      });
      console.log(res);
    },
    (err) => {
      console.log(err);
    }
  );
};
const getStu = () => {
  request(
    {
      url: "/students/selectById/" + localCache.getCache("uid"),
      method: "get",
    },
    (res) => {
      const stu = res.data.data;
      ruleForm.name = stu.name;
      ruleForm.sex = stu.sex;
      ruleForm.email = stu.email;
      ruleForm.major = stu.major;
      console.log(stu);
    },
    (err) => {
      console.log(err);
    }
  );
};
onMounted(getStu);
</script>

<style scoped lang="less">
.input-box {
  width: 400px;
}
</style>
