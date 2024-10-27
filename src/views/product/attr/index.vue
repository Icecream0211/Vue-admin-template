<template>


    <el-card style="margin-top: 10px;">
        <el-button type="primary" icon="Plus">添加平台属性</el-button>

        <el-table border style="margin: 10px 0px;">
            <el-table-column prop="date" label="序号" type="index" width="80px" />
            <el-table-column prop="name" label="属性名称" width="120px" />
            <el-table-column prop="address" label="属性值名称" />
            <el-table-column prop="address" label="操作"  width="120px" />
        </el-table>
    </el-card>
</template>
<script setup lang="ts">

</script>

<style scoped lang="scss">
.box-card-catagray {
    width: 100%;
    height: 80px;
}
</style>