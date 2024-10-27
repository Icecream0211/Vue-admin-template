
<template>
   <el-button :plain="true" @click="open2">Success</el-button>

</template>


<script setup lang="ts">
 
const open2 = () => {
  ElMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  })
}
</script>
<style lang="scss" scoped></style>
