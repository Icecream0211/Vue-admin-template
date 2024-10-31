<template>
    <div>
        <el-card class="box-card">
            <el-button type="primary" icon="Plus" size="default" v-has="`btn.Trademark.add`" @click="addTrademark">
                添加品牌
            </el-button>
            <!-- prop默认是用的是div，可以使用插槽-->
            <el-table style="margin: 10px 0px;" border :data="tradeMarkArr">
                <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
                <el-table-column label="品牌名称" prop="tmName"></el-table-column>
                <el-table-column label="品牌Logo">
                    <template #default="{ row, $index }">
                        <img :src="row.logoUrl" alt="图片丢失了~" style="width: 80px;height: 80px;">
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row, $index }">
                        <el-button type="primary" icon="Edit" size="small" @click="changeTradeMark(row)"></el-button>
                        <el-popconfirm :title="`确定要删除${row.tmName}品牌嘛?`" icon="Delete" @confirm="deleteTradeMark(row.id)" width="260px">
                            <template #reference>
                                <el-button type="primary" size="small" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[1, 3, 5, 7, 9]"
                layout="prev, pager, next, jumper,->,sizes,total" :total="total" @current-change="pageChange"
                @size-change="changeSize" />
        </el-card>
    </div>


    <el-dialog v-model="dialogFormVisible" :title="tradeMarkParams.id ? '修改品牌' : '添加品牌'" width="500">
        <el-form :model="tradeMarkParams" :rules="rules" ref="tradeForm">
            <el-form-item label="品牌名称" label-width="80px" prop="tmName">
                <el-input placeholder="请输入品牌名称" v-model="tradeMarkParams.tmName" autocomplete="off" />
            </el-form-item>

            <el-form-item label="品牌LoGO" label-width="80px" prop="logoUrl">

                <el-upload class="avatar-uploader" action="/fp/admin/product/fileUpload" :show-file-list="true"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="tradeMarkParams.logoUrl" :src="tradeMarkParams.logoUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>

            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogCancel">取 消</el-button>
                <el-button type="primary" @click="dialogConfirm">确 定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { UploadProps } from 'element-plus'
import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqAddOrUpdateTradeMark, reqHashTradeMark, reqDeleteTradeMark } from '@/api/product/trademark/index.ts';
import type { TradeMarkResponseData, Records, TradeMark } from '@/api/product/trademark/type'

import { ElMessage } from 'element-plus'
const pageNo = ref<number>(1);
const limit = ref<number>(3);
const total = ref<number>(0);
const tradeMarkArr = ref<Records>([])

let dialogFormVisible = ref(false)
let tradeForm = ref<any>();
let tradeMarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
});


const getHashTradeMark = async (pager = 1) => {
    pageNo.value = pager;
    let result: TradeMarkResponseData = await reqHashTradeMark(pageNo.value, limit.value);
    if (result.code === 200) {
        total.value = result.data.total;
        tradeMarkArr.value = result.data.records;
    }

}

const pageChange = (page: number) => {
    pageNo.value = page;
    getHashTradeMark(pageNo.value)
}

const changeSize = (size: number) => {
    limit.value = size;
    getHashTradeMark()
}

onMounted(() => {
    getHashTradeMark()
})
const validatorTmName = (rule: any, value: any, callback: any) => {
    if (!value || value.trim().length <= 0) {
        callback(new Error('品牌名称不能为空'))
    } else if (value.trim().length <= 2) {
        callback(new Error('品牌名称不能小于2位'))
    } else {
        callback()
    }
};

const validateLogoUrl = (rule: any, value: any, callback: any) => {
    if (value && value.trim().length > 0) {
        callback();
    } else {
        callback(new Error('请上传图片'))
    }
}
const rules = ({
    tmName: [
        { required: true, trigger: 'blur', validator: validatorTmName }
    ],
    logoUrl: [
        { required: true, validator: validateLogoUrl }
    ]
});


const addTrademark = () => {
    tradeMarkParams.tmName = '';
    tradeMarkParams.logoUrl = '';
    tradeMarkParams.id = 0;
    dialogFormVisible.value = true;

    //第一种方式
    //tradeForm.value?.clearValidate();
    nextTick(() => {
        tradeForm.value.clearValidate();
    });
}

const changeTradeMark = (row: TradeMark) => {
    nextTick(() => {
        tradeForm.value.clearValidate();
    });
    dialogFormVisible.value = true;
    //es6语法
    Object.assign(tradeMarkParams, row)
    //tradeMarkParams.id = row.id;
    //tradeMarkParams.tmName = row.tmName;
    //tradeMarkParams.logoUrl = row.logoUrl;

}

const deleteTradeMark = async (tradeMarkId: number) => {
    let result = await reqDeleteTradeMark(tradeMarkId);
    if (result.code !== 200) return ElMessage.error('删除失败');
    ElMessage.success('删除成功');
    getHashTradeMark(tradeMarkArr.value.length>1?pageNo.value:pageNo.value-1);
}

const dialogCancel = () => {
    dialogFormVisible.value = false;

}
const dialogConfirm = async () => {
    await tradeForm.value.validate();
    let result = await reqAddOrUpdateTradeMark(tradeMarkParams);
    if (result.code === 200) {
        if (tradeMarkParams.id) {
            ElMessage.success('修改品牌成功');
        } else {
            ElMessage.success('添加品牌成功');
        }
        getHashTradeMark();
    } else {
        if (tradeMarkParams.id) {
            ElMessage.error('修改品牌失败');
        } else {
            ElMessage.error('添加品牌失败');
        }
    }
    dialogFormVisible.value = false;
}



const handleAvatarSuccess: UploadProps['onSuccess'] = (response: any, uploadFile: any) => {
    tradeMarkParams.logoUrl = response.data;
    tradeForm.value.clearValidate('logoUrl')
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('仅支持图片上传!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('图片补鞥呢大于 2MB!')
        return false
    }
    return true
}




</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>