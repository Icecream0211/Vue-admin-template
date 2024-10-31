<template>
    <el-card>
        <el-form inline :inline="true" class="search_form" ref="searchForm">
            <el-form-item label="用户名:">
                <el-input placeholder="请输入用户名" v-model="keyWord" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :disabled="!keyWord"  @click="getUserList">查询</el-button>
                <el-button type="default" @click="clearinput">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin:10px 0">
        <el-button type="primary" icon="Plus" size="small"  @click="addUser">添加</el-button>
        <el-button type="danger" icon="Delete" :disabled="!multipleSelection.length" size="small" @click="batchDeleteUser">批量删除</el-button>
        <el-table :data="userList" border style="margin: 10px 0px;" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="80" />
            <el-table-column prop="id" label="#" width="80" align="center" type="index" />
            <el-table-column prop="id" label="Id" align="center" width="120" />
            <el-table-column prop="username" label="用户名" align="center" width="120" />
            <el-table-column prop="name" label="名字" align="center" width="250">
            </el-table-column>
            <el-table-column prop="roleName" label="角色" align="center">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center" width="250">

            </el-table-column>
            <el-table-column prop="updateTime" label="更新时间" align="center" width="250">

            </el-table-column>
            <el-table-column prop="prop" label="操作" fixed="right" align="center" width="300">
                <template #="{ row, $index }">
                    <el-button type="primary" icon="User" size="small" @click="assignRole(row)">分配角色</el-button>
                    <el-button type="primary" icon="Edit" size="small" @click="editUser(row)">编辑</el-button>
                    <el-button type="primary" icon="Delete" size="small" @click="deleteUser(row.id)">删除</el-button>

                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="margin: 5px 0px;" v-model:current-page="pagination.currentPage"
            v-model:page-size="pagination.pageSize" :page-sizes="[3, 5, 7, 9]" size="5" :background="true"
            layout="prev, pager, next, jumper,->,total, sizes" :total="pagination.total" @size-change="handleSizeChange"
            @current-change="getUserList" />





        <el-drawer v-model="drawer">
            <template #header>
                <h4>{{ userForm.id ? "修改用户" : "添加用户" }}</h4>
            </template>
            <template #default>
                <el-form label-width="120px" :model="userForm" :rules="rules" ref="userFormRef">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="userForm.username" placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item label="用户昵称" prop="name">
                        <el-input v-model="userForm.name" placeholder="请输入用户昵称" />
                    </el-form-item>
                    <el-form-item v-if="!userForm.id" label="密码" prop="password">
                        <el-input v-model="userForm.password" placeholder="请输入密码" />
                    </el-form-item>
                </el-form>
            </template>


            <template #footer>
                <div style="flex: auto">
                    <el-button type="primary" @click="saveorUpdate">确定</el-button>
                    <el-button @click="cancel">取消</el-button>
                </div>
            </template>

        </el-drawer>


        <el-drawer v-model="assignRoleDrawer">
            <template #header>
                <h4>分配角色</h4>
            </template>
            <template #default>
                <el-form label-width="120px" :model="userForm" :rules="rules" ref="userFormRef">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="userForm.username" disabled="true" />
                    </el-form-item>

                    <el-form-item label="角色列表">
                        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
                            全选
                        </el-checkbox>
                        <el-checkbox-group v-model="assignedRoleArr" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="(role,index) in allRoleArr" :key="index" :label="role" >
                                {{ role.roleName }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
            </template>


            <template #footer>
                <div style="flex: auto">
                    <el-button type="primary" @click="confirmAssign">确定</el-button>
                    <el-button @click="cancelAssign">取消</el-button>
                </div>
            </template>

        </el-drawer>

    </el-card>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
import { reqUserList, reqAddOrUpdateUser,reqUserAllRole,reqAssignRoles,reqDeleteUser,reqBatchDeleteUser } from '@/api/acl/user'
import { UserSearch, UserListResponse, User, AllRoleResponseData, RoleData,AssignRoleData } from '@/api/acl/user/type.ts'
import type { FormInstance } from 'element-plus'
import { nextTick } from 'vue';

let keyWord = ref('');

let pagination = reactive({
    currentPage: 1,
    pageSize: 3,
    total: 0
});

onMounted(() => {
    getUserList();
})

let userList = ref<User[]>([])

let layoutSettingStore = useLayoutSettingStore();
const clearinput = () => {
    layoutSettingStore.changeRefresh(!layoutSettingStore.refresh);
}



const validateUsername = (rule: any, value: string, callback: any) => {

    if (!value || value.trim().length <= 0) {
        callback(new Error('用户名不能为空'))
    }

    if (value.trim().length >= 5) {
        callback()
    } else {
        callback(new Error('用户名至少两位'))
    }

}

const validatename = (rule: any, value: string, callback: any) => {
    if (!value || value.trim().length <= 0) {
        callback(new Error('用户昵称不能为空'))
    }
    if (value.trim().length >= 5) {
        callback()
    } else {
        callback(new Error('用户名至少两位'))
    }

}

const validatePassword = (rule: any, value: string, callback: any) => {
    if (value.trim().length >= 6) {
        callback()
    } else {
        callback(new Error('密码至少六位'))
    }
}

let rules = reactive({
    username: [
        { required: true, validator: validateUsername, trigger: 'blur' }
    ],
    name: [
        { required: true, validator: validatename, trigger: 'blur' }
    ],
    password: [
        { required: true, validator: validatePassword, trigger: 'blur' }
    ]
});

const getUserList = async (page = 1) => {
    let result = await reqUserList(pagination.currentPage, pagination.pageSize, keyWord.value);
    if (result.code === 20000 || result.code === 200) {
        pagination.currentPage = result.data.current;
        pagination.total = result.data.total;
        userList.value = result.data.records;
    }
}

const handleSizeChange = (size: number) => {
    pagination.pageSize = size;
    getUserList();
}

let userFormRef = ref();
let drawer = ref(false);

let assignRoleDrawer = ref(false);

let userForm = ref<User>({
    id: "",
    name: "",
    password: "",
    username: ""
});
const addUser = () => {
    /**
     * 这个动作，会触发  form表单中的值修改，所以如果要初始化数据，最好使用blur
     * 
     */
    userForm.value = {
        id: "",
        name: "",
        password: "",
        username: ""
    };
    /**
     * 第一次点击的时候，userFormRef还是undefined，无法使用任何方法
     * 所以需要使用nextTick
     */
    nextTick(() => {
        userFormRef.value.resetFields();
    });
    drawer.value = true;
}


const editUser = async (row: User) => {
    drawer.value = true;
    nextTick(() => {
        userFormRef.value.resetFields();
    });
    Object.assign(userForm.value, row);

}
const cancel = () => {
    drawer.value = false;
}


const saveorUpdate = async () => {
    await userFormRef.value.validate();
    let result: any = await reqAddOrUpdateUser(userForm.value);
    if (result.code == 200) {
        drawer.value = false;
        getUserList();
        ElMessage.success("添加成功");
        window.location.reload();
    } else {
        ElMessage.error("添加失败");
    }
}


let allRoleArr =  ref<RoleData[]>([]);
let assignedRoleArr = ref<RoleData[]>([]);


const assignRole = async (row: User) => {
    Object.assign(userForm.value, row);

    let res: AllRoleResponseData = await reqUserAllRole(row.id as number);
    if (res.code === 200) {
        allRoleArr.value = res.data.allRolesList;
        assignedRoleArr.value = res.data.assignRoles;
        assignRoleDrawer.value = true;

    }


}


const cancelAssign =  async () => {
    assignRoleDrawer.value = false;
}
const confirmAssign = async() => {
    const assignRoleIds = assignedRoleArr.value.map(item => {
        return item.id as number;
    });
    let assignRoleData:AssignRoleData = {
        userId: userForm.value.id as number,
        roleIdList: assignRoleIds
    }
    let result = await reqAssignRoles(assignRoleData);
    if (result.code === 200) {
        assignRoleDrawer.value = false;
        ElMessage.success("分配角色成功")
        getUserList(pagination.currentPage);
    }else{
        ElMessage.error("分配角色失败");

    }
}


let isIndeterminate = ref(true);
let checkAll = ref(false);


const handleCheckAllChange = (val: boolean) => {
    assignedRoleArr.value = val ? allRoleArr.value : []
    isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: RoleData[]) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === allRoleArr.value.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < allRoleArr.value.length
}






const deleteUser = async(id: number) => {
    let result = await reqDeleteUser(id);
    if(result.code == 200){
        ElMessage.success('删除成功')
    }else{
        ElMessage.error('删除失败');
    }
    getUserList(userList.value.length>1?pagination.currentPage:pagination.currentPage-1);
}

let multipleSelection = ref<User[]>([]);

const handleSelectionChange = (val: User[]) => {
    multipleSelection.value = val
}

const batchDeleteUser = async() => {

    if(multipleSelection.value.length == 0){
        ElMessage.warning('请选择要删除的数据');
        return;
    }
    let result = await reqBatchDeleteUser(multipleSelection.value.map(item=>{return item.id as number}));
    if(result.code == 200){
        ElMessage.success('删除成功')
    }else{
        ElMessage.error('删除失败');
    }
    getUserList(userList.value.length>1?pagination.currentPage:pagination.currentPage-1);
}
</script>
<style scoped lang="scss">
.search_form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>