<script setup>
import { ref } from "vue";
import CustomHeader from "./components/CustomHeader.vue";
import ResultCard from "./components/ResultCard.vue";
import SearchConfigCard from "./components/SearchConfigCard.vue";
import HistoryCard from "./components/HistoryCard.vue";

const result = ref(null);
const handleStartSearch = (formData) => {
    result.value.fetchData(formData);
};
</script>

<template>
    <el-container class="container-main">
        <el-header>
            <custom-header />
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
                        <ResultCard ref="result" />
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <div class="row-column">
                        <el-card style="grid-area: card1;">
                            <template #header>
                                <div class="card-header">
                                    <span>配置查询项</span>
                                </div>
                            </template>
                            <SearchConfigCard
                                @start-search="handleStartSearch" />
                        </el-card>
                        <el-card style="grid-area: card2;">
                            <template #header>
                                <div class="card-header">
                                    <span>保存的服务器</span>
                                </div>
                            </template>
                            <HistoryCard />
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<style scoped lang="less">
.container {
    height: calc(100vh - 70px);
    .el-row {
        height: 100%;
    }
}

.el-card {
    height: 100%;
}

div.row-column {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 330px 1fr;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    grid-template-areas:
        "card1"
        "card2";
}
</style>
