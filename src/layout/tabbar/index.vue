<template>
    <div class="tabbar">
        <div class="tabbar_left">
           <Breadcrumb></Breadcrumb>
        </div>
        <div class="tabbar_right">
            <Setting></Setting>
        </div>
    </div>
</template>
<script setup lang="ts">
import Breadcrumb from '@/layout/tabbar/breadcrumb/index.vue'
import Setting from '@/layout/tabbar/setting/index.vue';

</script>
<style scoped lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    //background-image: linear-gradient(to right,rgb(250, 247, 247),rgb(240, 230, 230),rgb(196, 165, 165));
    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
    .tabbar_right {
        display: flex;
        align-items: center;
    
    }
}
</style>