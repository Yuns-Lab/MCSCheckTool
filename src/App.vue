<script setup>
import CustomHeader from "./components/CustomHeader.vue";
</script>

<template>
    <el-container class="container-main">
        <el-header>
            <custom-header @logoClick="open_close_sidebar" />
        </el-header>
        <el-main class="container">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-card>
                        <template #header>
                            <div class="card-header">
                                <span>查询到的信息</span>
                            </div>
                        </template>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <div class="row-column">
                        <el-card>
                            <template #header>
                                <div class="card-header">
                                    <span>配置查询项</span>
                                </div>
                            </template>
                        </el-card>
                        <el-card>
                            <template #header>
                                <div class="card-header">
                                    <span>历史查询记录</span>
                                </div>
                            </template>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<style scoped lang="less">
.container {
    height: calc(100vh - 60px);
    .el-row{
        height: 100%;
    }
}

.el-card {
    height: 100%;
}

div.row-column {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>
