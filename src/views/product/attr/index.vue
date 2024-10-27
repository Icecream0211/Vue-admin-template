<template>

    <Category :scene="scene"></Category>
    <el-card style="margin-top: 10px;">
        <div v-show="scene == 0">
            <el-button type="primary" icon="Plus" :disabled="!categoryStore.c3Id" @click="addAttr">添加平台属性</el-button>
            <el-button type="primary" icon="Plus"  @click="open2">添加平台属性</el-button>

            <el-table border style="margin: 10px 0px;" :data="attrList">

                <el-table-column label="序号" type="index" width="80px" />
                <el-table-column label="属性名称" prop="attrName" width="120px" />
                <el-table-column label="属性值名称" prop="attrValueList">
                    <template #="{ row, $index }">
                        <el-tag v-for="attrValue in row.attrValueList" :key="attrValue.id" style="margin: 0px 5px;">{{
                            attrValue.valueName }}</el-tag>
                    </template>

                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <template #="{ row, $index }">
                        <el-button type="primary" icon="Edit" size="small" @click="updateAttr"></el-button>
                        <el-popconfirm :title="`确定要删除${row.valueName}嘛?`" icon="Delete" @confirm="deleteAttr(row.id)" width="260px">
                            <template #reference>
                                <el-button type="primary" size="small" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                        
                    </template>
                </el-table-column>


            </el-table>
        </div>
        <div v-show="scene == 1">
            <el-form :inline="true">
                <el-form-item label="属性名称">
                    <el-input type="text" placeholder="请输入属性名称" v-model="attrParams.attrName" />
                </el-form-item>

            </el-form>

            <el-button type="primary" :disabled="!attrParams.attrName" icon="Plus"
                @click="addAttrValue">添加属性值</el-button>
            <el-button type="primary" @click="cancelAttrAdd">取消</el-button>
            <el-table border style="margin: 10px 0px;" :data="attrParams.attrValueList">
                <el-table-column label="序号" type="index" width="80" align="center" />
                <el-table-column label="属性值" align="center">
                    <template #default="{ row, $index }">
                        <el-input :ref="$index" v-model="row.valueName" placeholder="请输入属性值" />
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="140" align="center" />
            </el-table>
            <el-button type="primary" @click="saveAttr">保存</el-button>
            <el-button type="primary" @click="cancelAttrAdd">取消</el-button>
        </div>
    </el-card>
</template>
<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import useCategoryStore from '@/store/modules/product';
import { reqAddOrUpdateAttr, reqAllAttrInfo,reqDeleteAttr } from '@/api/product/attr';
import { Attr } from '@/api/product/attr/type';

const attrList = ref<Attr[]>([]);

const categoryStore = useCategoryStore()


const scene = ref<number>(0)

let attrParams = reactive<Attr>({
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3,
})


const addAttrValue = () => {
    attrParams.attrValueList.push({
        attrId: attrParams.id,
        valueName: '',
        flag: true
    });
};

watch(() => categoryStore.c3Id, async () => {
    attrList.value = []
    if (!categoryStore.c3Id) return
    const { c1Id, c2Id, c3Id } = categoryStore;
    getAttrList(c1Id, c2Id, c3Id);

})

const updateAttr = () => {
    scene.value = 1;
}

const getAttrList = async (c1Id: number | string, c2Id: number | string, c3Id: number | string) => {
    console.log("获取属性列表")
    const result = await reqAllAttrInfo(c1Id, c2Id, c3Id)

    if (result.code === 200) {
        attrList.value = result.data
    }

}
const addAttr = () => {
    scene.value = 1;
    attrParams.categoryId = categoryStore.c3Id;
}

const cancelAttrAdd = () => {
    scene.value = 0;
}


const deleteAttr = async (id: number) => {
    attrParams.id = id;
    let result = await reqDeleteAttr(id);
    if (result.code === 200) {
        // 保存成功
        ElMessage({ type: 'success', message: '删除成功' });
        // 返回属性列表场景
        scene.value = 0;
        // 重新获取属性列表
        getAttrList(categoryStore.c1Id, categoryStore.c2Id, categoryStore.c3Id);
     }else{
        ElMessage({ type: 'fail', message: '删除失败' });
     }
}

const saveAttr2 = async () => {
    let response = await reqAddOrUpdateAttr(attrParams);
    console.log(response)
    if (response.code === 200) {
        scene.value = 0;
        ElMessage({
            type: 'success',
            message: '删除成功',
        })
        ElMessage.success(attrParams.id ? "修改成功" : "添加成功");
        getAttrList(categoryStore.c1Id, categoryStore.c2Id, categoryStore.c3Id);
    } else {
        ElMessage.fail(attrParams.id ? "修改失败" : "修改成功");
    }
}


const saveAttr = async () => {
  let res: any = await reqAddOrUpdateAttr(attrParams)
  if (res.code === 200) {
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    getAttrList(categoryStore.c1Id, categoryStore.c2Id, categoryStore.c3Id);
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}

</script>

<style scoped lang="scss">
.box-card-catagray {
    width: 100%;
    height: 80px;
}
</style>