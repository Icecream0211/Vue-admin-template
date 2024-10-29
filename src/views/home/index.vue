<template>
  <el-card>
    <div class="box">
      <img :src="userStore.avatar" alt="" class="avatar" />
      <div class="bottom">
        <h3 class="title">{{ getTime() }}好， {{ userStore.username }}</h3>

      </div>
    </div>
  </el-card>
  <div class="bottom2">

    <DefSvgIcon name="welcome" width="500px" height="500px"></DefSvgIcon>
  </div>
</template>


<script setup lang="ts">
import { DefSvgIcon } from '@/components';
import useUserStore from '@/store/modules/user';
import { getTime } from '@/utils/time';



let userStore = useUserStore();

</script>
<style lang="scss" scoped>
.box {
  display: flex;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 20px;
  }
  .title{

  }
  .bottom{
    margin-left: 20px;
    .title{
      font-size: 30px;
      font-weight: 900;
    }
  }
}
.bottom2{
  display: flex;
  justify-content: center;
}
</style>
