<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

</script>
<template>
  <div class="box">
    <img src="../../assets/images/error_images/404.png" alt="">
    <button @click="router.push('/')">返回首页</button>
  </div>
</template>

<style lang="scss" scoped>
.box{
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
}

button{
  width: 50px;
  height: 40px;
  background: #fff;
}
</style>
