<template>
    <el-card>
        <el-form :inline="true" class="search_form">
            <el-form-item label="角色名称">
                <el-input placeholder="请输入角色名称" v-model="keyword" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="Search" @click="getRoleList">查询</el-button>
                <el-button type="primary" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 5px 0px;">
        <el-button type="primary" icon="Plus" size="small" @click="addNewRoleDialog">添加角色</el-button>
        <el-table :data="roleList" border style="margin: 10px 0px;" @selection-change="">
            <el-table-column type="selection" width="80" />
            <el-table-column prop="id" label="#" width="80" align="center" type="index" />
            <el-table-column prop="id" label="Id" align="center" width="120" />
            <el-table-column prop="roleName" label="角色名称" align="center" />

            <el-table-column prop="createTime" label="创建时间" align="center" width="250">

            </el-table-column>
            <el-table-column prop="updateTime" label="更新时间" align="center" width="250">

            </el-table-column>
            <el-table-column prop="prop" label="操作" fixed="right" align="center" width="300">
                <template #="{ row, $index }">
                    <el-button type="primary" icon="User" size="small" @click="assignPermission(row)">分配权限</el-button>
                    <el-button type="primary" icon="Edit" size="small" @click="updateRole(row)">编辑</el-button>
                    <el-button type="primary" icon="Delete" size="small" @click="deleteRole(row)">删除</el-button>

                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="margin: 5px 0px;" v-model:current-page="pagination.currentPage"
            v-model:page-size="pagination.pageSize" :page-sizes="[3, 5, 7, 9]" size="5" :background="true"
            layout="prev, pager, next, jumper,->,total, sizes" :total="pagination.total" @size-change="handleSizeChange"
            @current-change="getRoleList" />
    </el-card>



    <el-dialog v-model="dialogFormVisible" :title="roleForm.id ? '修改' : '新增'" width="500">
        <el-form :model="roleForm" :rules="rules" ref="roleFormRef">
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="roleForm.roleName" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmAddOrUpdateRole">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>



    <el-drawer v-model="drawerVisiable">
        <template #header>
            <h4>菜单选择</h4>
        </template>
        <template #default>
            <el-tree ref="treeRef" style="max-width: 600px" :data="menuArr" show-checkbox node-key="id" default-expand-all
                :default-checked-keys="checkedIdArr" :props="defaultProps" />
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="drawCancelClick">取消</el-button>
                <el-button type="primary" @click="drawConfirmClick">确定</el-button>
            </div>
        </template>
    </el-drawer>




</template>
<script setup lang="ts">
import { ref, reactive, onMounted, nextTick, computed } from 'vue'
import { reqRoleList, reqAddRole, reqDeleteRole, reqAddOrUpdateRole, reqAllPermission,reqDoAssignPermission } from '@/api/acl/role/index'
import { RoleListResponse, Role, MenuResponse, MeunData,AclSetRequestData } from '@/api/acl/role/type'
import useLayoutSettingStore from '@/store/modules/setting';



const dialogFormVisible = ref(false)

let roleForm = reactive({
    id: '',
    roleName: ''
})

let keyword = ref('');

let pagination = reactive({
    currentPage: 1,
    pageSize: 3,
    total: 0
});


let layoutSettingStore = useLayoutSettingStore();
const handleSizeChange = (val: number) => {
    pagination.pageSize = val;
    getRoleList();
};

let drawerVisiable = ref(false);


onMounted(() => {
    getRoleList();
});

let roleList = ref<Role[]>([]);

const getRoleList = async (current = 1) => {
    let result: RoleListResponse = await reqRoleList(pagination.currentPage, pagination.pageSize, keyword.value);
    if (result.code === 20000 || result.code === 200) {
        pagination.currentPage = result.data.current;
        pagination.total = result.data.total;
        roleList.value = result.data.records;
    }
};


const reset = () => {
    layoutSettingStore.changeRefresh(!layoutSettingStore.refresh)
}

let roleFormRef = ref();

const addNewRoleDialog = () => {
    dialogFormVisible.value = true;
    Object.assign(roleForm, {
        roleName: '',
        id: 0,
    });
    /**
     * 这一句不行，会造成文本框无法输入
     */
    // roleForm = {
    //     roleName: '',
    //     id: ''
    // }
    nextTick(() => {
        roleFormRef.value.resetFields();
        //roleFormRef.value.clearValidate('roleName')
    })

}
const confirmAddOrUpdateRole = async () => {
    await roleFormRef.value.validate();
    const result = await reqAddOrUpdateRole(roleForm);
    if (result.code === 20000 || result.code === 200) {
        ElMessage.success('添加成功');
        dialogFormVisible.value = false;
        getRoleList();
    }
}

const validateRoleName = (rule: any, value: string, callback: any) => {
    if (value && value.trim().length > 2) {
        callback();
    } else {
        return callback(new Error('角色名不能为空,且最少2位'));
    }
}

const rules = {
    roleName: [{ required: true, validator: validateRoleName, trigger: 'blur' }],
}



const deleteRole = async (row: Role) => {
    let result = await reqDeleteRole(row.id as number);
    if (result.code == 200) {
        ElMessage.success('删除成功');
        getRoleList();
    } else {
        ElMessage.error('删除失败');
    }
}


const updateRole = async (row: Role) => {
    Object.assign(roleForm, row);
    dialogFormVisible.value = true;
}


let menuArr = ref<MeunData[]>([]);

let checkedIdArr = ref<number[]>([]);

const assignPermission = async (row: Role) => {
    checkedIdArr.value = [];
    menuArr.value = [];
    Object.assign(roleForm, row);
    let result: MenuResponse = await reqAllPermission(row.id as number);

    if (result.code === 200) {
        drawerVisiable.value = true;
        menuArr.value = result.data;
        filterSelectArr(menuArr.value, checkedIdArr.value);
    }

}

const drawCancelClick = () => {
    drawerVisiable.value = false;
}

let treeRef = ref();
const drawConfirmClick = async () => {

    let arr1:number[] = treeRef.value.getCheckedKeys();
    let arr2:number[] = treeRef.value.getHalfCheckedKeys();

    checkedIdArr.value = [...arr1, ...arr2];
    console.log(checkedIdArr.value);
    let requestData:AclSetRequestData = {
        permissionIdList: checkedIdArr.value,
        roleId: roleForm.id
    }


    let result = await reqDoAssignPermission(requestData);
    if (result.code === 200) {
        ElMessage.success("分配权限成功");
        drawerVisiable.value = false;
        window.location.reload();
    } else {
        ElMessage.error("分配权限失败");
    }

}


const defaultProps = {
    children: 'children',
    label: 'name',
}


const filterSelectArr = (dataArr: MeunData[], checkedIdArr: number[]) => {
    if (dataArr.length == 0) return;
    dataArr.forEach(item => {
        if (item.children && item.children.length > 0) {
            filterSelectArr(item.children, checkedIdArr);
        } else {
            if (item.level == 4 && item.select) {
                checkedIdArr.push(item.id);
            }
        }
    });
}

</script>
<style scoped lang="scss">
.search_form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>