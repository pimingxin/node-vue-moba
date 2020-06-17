<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <div style="display: flex;justify-content: center;">
            <div @click="getCaptcha" v-html="svgCaptche"></div>
          </div>
          <div @click="getCaptcha">看不清楚,点击切换验证码</div>
          <el-input v-model="model.captcha"></el-input>
        </el-form-item>
        <el-form-item class="loginButton">
          <el-button type="primary" @click="this.$router.push('/')">注册</el-button>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      svgCaptche: ""
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      console.log(res.data);
      localStorage.token = res.data.token;
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登录成功"
      });
    },
    async getCaptcha() {
      const res = await this.$http.get("captcha");
      this.svgCaptche = res.data;
    }
  },
  created() {
    this.getCaptcha();
  }
};
</script>

<style>
.login-card {
  width: 25rem;
  margin: 6rem auto;
}
.loginButton .el-form-item__content {
  display: flex;
  justify-content: space-between;
}
</style>