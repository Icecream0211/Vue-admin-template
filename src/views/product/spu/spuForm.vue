<template>
    <el-form style="margin:30px;width:60%;min-width:400px" label-width="100px">
        <el-form-item label="SPU名称" label-width="100px">
            <el-input placeholder="SPU名称" v-model="spuParams.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌" label-width="100px">
            <el-select placeholder="请选择品牌" v-model="spuParams.tmId">
                <el-option v-for="item in trademarkList" :key="item.id" :label="item.tmName"
                    :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述" label-width="100px">
            <el-input type="textarea" v-model="spuParams.description" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="SPU图片" label-width="100px">
            <el-upload v-model:file-list="spuImageList" action="/fp/admin/product/fileUpload" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handlerBeforeUpload">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
        </el-form-item>

        <el-form-item label="SPU销售属性">
            <el-select :placeholder="unSelectSaleAttr.length ? `还未选择${unSelectSaleAttr.length}个` : '无'"
                v-model="saleAttrIdAndName">
                <el-option v-for="(item, $index) in unSelectSaleAttr" :key="item.id" :label="item.name"
                    :value="`${item.id}:${item.name}`"></el-option>
            </el-select>
            <el-button type="primary" :disabled="!saleAttrIdAndName" icon="Plus" style="margin: 0px 5px;"
                @click="addSaleAttr">添加销售属性</el-button>
            <el-table border style="margin: 10px 0px;" :data="saleAttr">
                <el-table-column label="序号" type="index" width="80"></el-table-column>
                <el-table-column label="销售属性名字" prop="saleAttrName" width="120">
                </el-table-column>
                <el-table-column label="销售属性值">
                    <template v-slot="{ row, $index }">
                        <el-tag v-for="(item, index) in row.spuSaleAttrValueList" :key="row.id" closable
                            @close="row.spuSaleAttrValueList.splice(index, 1)">{{ item.saleAttrValueName }}</el-tag>

                        <el-input v-model="row.saleAttrValue" placeholder="请你输入属性值" size="small"
                            v-if="row.flag === true" style="width: 100px" @blur="toLook(row)"></el-input>
                        <el-button v-else type="primary" icon="Plus" size="small" style="margin: 0px 5px;"
                            @click="toEdit(row)"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template #="{ row, $index }">
                        <el-button type="danger" icon="Delete" size="small"
                            @click="saleAttr.splice($index, 1)"></el-button>
                    </template>
                </el-table-column>s
            </el-table>

        </el-form-item>
        <el-form-item>
            <el-button type="primary" :disabled="saleAttr.length > 0 ? false : true" @click="saveSaleAttr">保存</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-form-item>


    </el-form>
</template>
<script setup lang="ts">
import { SpuData, SpuSaleAttrValue, SpuSaleAttr, TradeMark, AllTradeMarkResponse, SpuImageListResponse, SpuSaleAttrResponse, HasSaleAttrResponse, SpuImage, HasSaleAttr } from "@/api/product/spu/type";
import { reactive, ref, computed } from "vue"
import { reqAllTrademark, reqAllBaseSaleAttrs, reqHasSpuImageList, reqHasSpuSaleAttrs, reqAddOrUpdateSpu } from "@/api/product/spu/index.ts";

import useCategoryStore from "@/store/modules/product";



let $emit = defineEmits(['changeScene']);


const cancel = () => {
    $emit('changeScene', {flag:0,params:"update"});
}


let spuParams = ref<SpuData>({
    category3Id: "",
    description: "",
    spuName: "",
    tmId: "",
    spuImageList: [],
    spuSaleAttrList: [],
});

const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile: any) => {
    dialogImageUrl.value = uploadFile.url;
    dialogVisible.value = true;
}
const handleRemove: UploadProps['onRemove'] = (uploadFile: any, uploadFiles: any) => {
}


const handlerBeforeUpload = (file: any) => {
    const isJPG = file.type === 'image/jpeg';
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJPG) {
        ElMessage.error('上传头像图片只能是 JPG 格式!');
        return false;
    }
    if (!isLt2M) {
        ElMessage.error('上传头像图片大小不能超过 2MB!');
        return false;
    }
    return true;
}

let trademarkList = ref<TradeMark[]>([]);
let spuImageList = ref<SpuImage[]>([]);
let saleAttr = ref<SpuSaleAttr[]>([]);
let hasSaleAttrList = ref<HasSaleAttr[]>([]);

let saleAttrIdAndName = ref("");

let unSelectSaleAttr = computed(() => {
    let unselectArr = hasSaleAttrList.value.filter(item => {
        return saleAttr.value.every(item1 => {
            return item.name !== item1.saleAttrName
        })
    })
    return unselectArr;
})

const initHasSpuData = async (spu: SpuData) => {
    spuParams.value = spu;
    let result: AllTradeMarkResponse = await reqAllTrademark();
    if (result.code === 200) {
        trademarkList.value = result.data
    }
    console.log(result)
    let result1: SpuImageListResponse = await reqHasSpuImageList(spu.id as number);
    if (result1.code === 200) {
        spuImageList.value = result1.data.map((item) => { return { ...item, name: item.imgName, url: item.imgUrl } });
    }


    let result2: SpuSaleAttrResponse = await reqHasSpuSaleAttrs(spu.id as number);
    if (result2.code === 200) {
        saleAttr.value = result2.data
    }

    let result3: HasSaleAttrResponse = await reqAllBaseSaleAttrs();
    if (result3.code === 200) {
        hasSaleAttrList.value = result3.data
    }
}

const initAddSpu = async (c3Id: number) => {
    Object.assign(spuParams.value, {
        category3Id: "",
        description: "",
        spuName: "",
        tmId: "",
        spuImageList: [],
        spuSaleAttrList: [],
    });
    spuImageList.value = [];
    saleAttr.value = [];
    saleAttrIdAndName.value = '';
    spuParams.value.category3Id = c3Id;
    let result: AllTradeMarkResponse = await reqAllTrademark();
    if (result.code === 200) {
        trademarkList.value = result.data
    }

    let result3: HasSaleAttrResponse = await reqAllBaseSaleAttrs();
    if (result3.code === 200) {
        hasSaleAttrList.value = result3.data
    }
}


const addSaleAttr = () => {
    const [baseSaleAttrId, saleAttrName] = saleAttrIdAndName.value.split(':');
    let newSaleAttr: SpuSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
    }
    saleAttr.value.push(newSaleAttr);
    saleAttrIdAndName.value = '';
}


const toEdit = (row: SpuSaleAttr) => {
    row.flag = true;
    row.saleAttrValue = ''
}

const toLook = (row: SpuSaleAttr) => {
    const { baseSaleAttrId, saleAttrValue } = row;
    let newSaleAttrValue: SpuSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: saleAttrValue as string,
    };
    if (saleAttrValue?.trim() === '') {
        ElMessage({
            type: 'error',
            message: '属性值不能为空的',
        });
        row.flag = false;
        return;
    }
    let repeat = row.spuSaleAttrValueList.find((item) => {
        return item.saleAttrValueName === saleAttrValue;
    });
    if (repeat) {
        ElMessage({
            type: 'error',
            message: '属性值重复',
        });
        row.flag = false;
        return;
    }
    row.spuSaleAttrValueList.push(newSaleAttrValue);
    row.flag = false;
}


const saveSaleAttr = async () => {

    spuParams.value.spuImageList = spuImageList.value.map((item: any) => {
        return {
            imgName: item.name,
            imgUrl: (item.response && item.response.data) || item.url,
        }
    });

    spuParams.value.spuSaleAttrList = saleAttr.value;
    console.log(spuParams.value);

    let result = await reqAddOrUpdateSpu(spuParams.value);
    if (result.code === 200) {
        ElMessage({ type: 'success', message: spuParams.value.id ? '修改SPU成功' : '添加SPU成功' });
        // 通知父组件回到场景0
        $emit('changeScene', spuParams.value.id? { flag: 0, params: 'update' } : { flag: 0, params: 'add' });
        Object.assign(spuParams, blackSpuData);
        // 清除数据
    } else {
        ElMessage({ type: 'error', message: spuParams.value.id ? '修改SPU失败' : '添加SPU失败' });
    }


}

defineExpose({ initHasSpuData, initAddSpu })

</script>
<style scoped lang="scss"></style>