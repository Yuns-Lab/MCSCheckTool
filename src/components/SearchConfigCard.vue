<script setup>
import { ref, reactive } from "vue";

const emit = defineEmits(["start-search", "save-config"]);

const formEl = ref(null);
const rea = reactive({
    isdark: null,
});

const form = reactive({
    nickname: "未命名",
    serverip: null,
    serverport: 25565,
    servertype: "je",
});
const formRules = reactive({
    nickname: [
        {
            min: 0,
            max: 10,
            message: "长度需为 0 到 10 个字符",
            trigger: "change",
        },
    ],
    serverip: [
        {
            required: true,
            message: "请输入服务器IP地址",
            trigger: "change",
        },
    ],
    servertype: [
        {
            required: true,
            message: "请选择服务器类型",
            trigger: "change",
        },
    ],
});

const submitForm = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid, _fields) => {
        if (valid) {
            emit("start-search", form);
        }
    });
};

const matchTheme = (e) => {
    if (e.matches) {
        rea.isdark = true;
    } else {
        rea.isdark = false;
    }
};
window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", matchTheme);
matchTheme(window.matchMedia("(prefers-color-scheme: dark)"));
</script>

<template>
    <el-form
        ref="formEl"
        :model="form"
        :rules="formRules"
        label-width="auto"
        status-icon>
        <el-form-item prop="nickname">
            <template #label>
                <span>
                    服务器昵称
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="仅用于保存配置时标注"
                        placement="top">
                        <el-icon>
                            <Warning class="infoIcon" />
                        </el-icon>
                    </el-tooltip>
                </span>
            </template>
            <el-input :disabled="true" v-model="form.nickname" />
        </el-form-item>
        <el-form-item label="服务器 IP" prop="serverip">
            <el-input
                placeholder='IP 不应包含如 "https://", "tcp://" 等协议头'
                v-model="form.serverip" />
        </el-form-item>
        <el-form-item>
            <template #label>
                <span>
                    服务器端口
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="填入 0 即自动解析 srv 记录"
                        placement="top">
                        <el-icon>
                            <Warning class="infoIcon" />
                        </el-icon>
                    </el-tooltip>
                </span>
            </template>
            <el-input-number v-model="form.serverport" :min="0" :max="65535" />
            <el-button
                style="margin-left: 12px;"
                :dark="rea.isdark"
                @click="form.serverport = 0">
                设置为 SRV
            </el-button>
            <el-button
                style="margin-left: 12px;"
                :dark="rea.isdark"
                @click="form.serverport = 25565">
                设置为 Java 默认端口
            </el-button>
            <el-button
                style="margin-left: 12px;"
                :dark="rea.isdark"
                @click="form.serverport = 19132">
                设置为 Bedrock 默认端口
            </el-button>
        </el-form-item>
        <el-form-item label="服务器类型" prop="servertype">
            <el-select v-model="form.servertype" placeholder="请选择服务器类型">
                <el-option label="Java Editon" value="je" />
                <el-option label="Bedrock Editon（基岩版）" value="be" />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button
                :dark="rea.isdark"
                type="primary"
                @click="submitForm(formEl)">
                开始查询
            </el-button>
            <el-button
                :dark="rea.isdark"
                @click="$emit('save-config', form)"
                :disabled="true">
                保存配置
            </el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped lang="less">
.infoIcon {
    transform: rotateX(180deg) translate(3px, -1.5px);
}
</style>
