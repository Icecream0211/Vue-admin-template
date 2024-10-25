
<template>
  <h1>home</h1>
</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import  useUserStore from '@/store/modules/user';

const userStore = useUserStore();

onMounted(() => {
  userStore.getUserInfo();
  console.log('home');
})
</script>
<style lang="scss" scoped></style>
