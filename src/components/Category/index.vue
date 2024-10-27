<template>
        <el-card class="box-card-catagray">
        <el-form :inline="true">
            <el-form-item label="一级分类" style="width: 220px;">
                <el-select placeholder="Activity zone" clearable>
                    <el-option label="待开的开导开导开导开导看到的开导开导" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select placeholder="Activity zone" clearable>
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select placeholder="Activity zone" clearable>
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
        </el-form>

    </el-card>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss"></style>