<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-05-19 17:38:16
 * @LastEditors: Huccct
 * @LastEditTime: 2023-05-20 20:19:50
-->
<script setup lang="ts">
import { User, Lock, Warning } from '@element-plus/icons-vue'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'
// VerifyCode import
import image1 from '@/assets/images/verifyCode/0050.png'
import image2 from '@/assets/images/verifyCode/0254.png'
import image3 from '@/assets/images/verifyCode/1580.png'
import image4 from '@/assets/images/verifyCode/2927.png'
import image5 from '@/assets/images/verifyCode/3812.png'
import image6 from '@/assets/images/verifyCode/4294.png'
import image7 from '@/assets/images/verifyCode/6061.png'
import image8 from '@/assets/images/verifyCode/6102.png'
import image9 from '@/assets/images/verifyCode/9322.png'
import image10 from '@/assets/images/verifyCode/9041.png'

let $router = useRouter()
let loading = ref(false)
import useUserStore from '@/store/modules/user'
let useStore = useUserStore()
let loginForms = ref()

const currentCodeImageIndex = ref(0)

const codeImageUrls = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  // 添加其他验证码图片的路径
]

const codeImageUrl = computed(() => {
  return codeImageUrls[currentCodeImageIndex.value]
})
// console.log(codeImageUrls[0])

const refreshCodeImages = () => {
  currentCodeImageIndex.value =
    (currentCodeImageIndex.value + 1) % codeImageUrls.length
}
const loginForm = reactive({
  username: 'admin',
  password: '123456',
  verifyCode: '',
})


const login = async () => {
  let result = await loginForms.value.validate()
  console.log(result)
  loading.value = true
  try {
    await useStore.userLogin(loginForm)
    $router.push('/')
    ElNotification({
      type: 'success',
      message: '登陆成功',
      title: `Hi, ${getTime()}好`,
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}

const rules = {
  username: [
    {trigger: 'blur',message: '请输入用户名',required:true},
    {required:true,min:5,max:10,message:"账号长度至少5位,最长10位",trigger:"change"}
  ],
  password: [
    {required:true,trigger: 'blur',message: '密码不能为空',},
    {required:true,min:6,max:15,message:"密码长度最少6,最长15位",trigger:"change"}
  ]
}

// ../../assets/images/0050.png
</script>
<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-card class="login_form">
          <h1>Hello</h1>
          <el-form :model="loginForm" :rules="rules" ref="loginForms">
            <el-form-item prop="username">
              <el-input
                :prefix-icon="User"
                v-model="loginForm.username"
                clearable
                placeholder="Username"
                size="large"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                :prefix-icon="Lock"
                show-password
                v-model="loginForm.password"
                size="large"
                placeholder="Password"
                clearable
              ></el-input>
            </el-form-item>
          </el-form>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  position: fixed;
  .login_form {
    position: relative;
    width: 55%;
    background-image: url(@/assets/images/login_form.png);
    top: 25vh;
    left: 10vw;
    padding: 10px;
    h1 {
      background: linear-gradient(to right, blue, rgb(35, 60, 70));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 40px;
      text-align: left;
      font-weight: 700;
      margin-bottom: 40px;
      margin-top: -10px;
    }
    .login_btn {
      width: 100%;
    }
  }
}
.el-card {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
</style>
