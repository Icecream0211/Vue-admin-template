<template>
    <Category></Category>
    <el-card style="margin:10px 0">

        <el-button type="primary" icon="Plus" :disabled="!categoryStore.c3Id" plain>添加SPU</el-button>
        <el-table :data="spuDataArr" border style="margin: 5px 0px;">
            <el-table-column label="序号"></el-table-column>
            <el-table-column label="SPU名称"></el-table-column>
            <el-table-column label="SPU描述"></el-table-column>
            <el-table-column label="操作"></el-table-column>


        </el-table>
    </el-card>


</template>
<script setup lang="ts">
import { ref,watch } from 'vue'
import useCategoryStore from '@/store/modules/product';
import { reqHashSpu, reqDeleteSpu } from '@/api/product/spu/index';

const spuDataArr = ref([]);

let categoryStore = useCategoryStore();

watch(()=>categoryStore.c3Id,async()=>{



});


</script>
<style scoped lang="scss"></style>