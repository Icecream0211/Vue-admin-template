<template>
    <div class="logo">
        <img :src="setting.logo" v-if="setting.logoShow" />
        <p>{{ setting.title }}</p>
    </div>
</template>
<script setup lang="ts">
import setting from '@/setting'


</script>
<style scoped lang="scss">
.logo{
    width: 100%;
    height: $base-menu-logo-hight;
    color: white;
    display: flex;
    align-items: center;
    padding: 20px;
    img{
        width: 40px;
        height: 40px;
    }
    p{
        font-size: $base-menu-logo-text-size;
        margin-left: 20px;
    }
}
</style>