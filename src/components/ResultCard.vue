<script setup>
import { nextTick, reactive, ref } from "vue";
import { applyAnimation } from "../aniref.js";

/*
    * type: "je" | "be"
    online: true | false
    ip: string
    port: number
    hostname: string
    protocol.name: string
    gamemode: string // only if type==be
    motd.html: string[]
    players.online: number
    players.max: number
*/

const data = reactive({
    loadFinish: false,
    online: false,
    ip: null,
    port: null,
    hostname: null,
    raw_hostname: null,
    protocol_name: null,
    gamemode: null,
    motd_html: [],
});
const players_online = ref(0);
const players_online_ani = applyAnimation(players_online);
const players_max = ref(0);
const players_max_ani = applyAnimation(players_max);

const fetchData = (formData) => {
    const serverip = formData.serverip,
        serverport = formData.serverport,
        servertype = formData.servertype;
    let server = null,
        uri = null;
    if (serverport == 25565 || serverport == 19132) {
        server = serverip;
    } else {
        server = `${serverip}:${serverport}`;
    }
    data.raw_hostname = server;
    if (servertype === "je") {
        uri = `https://api.mcsrvstat.us/3/${server}`;
    } else if (servertype === "be") {
        uri = `https://api.mcsrvstat.us/bedrock/3/${server}`;
    } else {
        throw new Error(`Invaild server type: ${servertype}`);
    }
    data.loadFinish = false;
    fetch(uri)
        .then((res) => {
            return res.json();
        })
        .then((result) => {
            console.log({
                uri: uri,
                ...result,
            });
            data.online = result.online;
            data.port = result.port;
            data.hostname = result.hostname;
            players_online.value = 0;
            players_max.value = NaN;
            if (data.online) {
                data.ip = result.ip;
                data.protocol_name = result.protocol.name;
                data.gamemode = result.gamemode;
                data.motd_html = result.motd.html;
                players_online.value = result.players.online;
                players_max.value = result.players.max;
            }
            data.loadFinish = true;
            console.log(data);
            nextTick(() => {
                document.getElementById("linefirst").innerHTML =
                    data.motd_html[0] || "-";
                if (data.motd_html.length > 1) {
                    document.getElementById("linesecond").innerHTML =
                        data.motd_html[1];
                    document.getElementById("linesecond").style.display =
                        "flex";
                } else {
                    document.getElementById("linesecond").style.display =
                        "none";
                }
            });
        })
        .catch((err) => {
            console.error(err);
        });
};

defineExpose({
    fetchData,
});

const rea = reactive({
    theme: null,
});

// Theme Change Detector
const matchTheme = (e) => {
    if (e.matches) {
        rea.theme = "light";
    } else {
        rea.theme = "dark";
    }
};
window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", matchTheme);
matchTheme(window.matchMedia("(prefers-color-scheme: dark)"));
</script>

<template>
    <div class="result-card-empty" v-if="!data.loadFinish">
        <el-empty description="请先查询任意服务器信息~" />
    </div>
    <div class="result-card" v-if="data.loadFinish">
        <el-row :gutter="100">
            <el-col :span="5">
                <el-card class="avatarCard">
                    <div class="avatar">
                        <el-skeleton-item
                            variant="image"
                            style="width: 120px; height: 120px" />
                        <img
                            v-if="data.online"
                            :src="`https://api.mcsrvstat.us/icon/${data.raw_hostname}`" />
                    </div>
                </el-card>
            </el-col>
            <el-col :span="19" style="text-align: center">
                <el-card class="basicCard">
                    <el-row
                        style="
                            height: 120px;
                            display: flex;
                            align-items: center;
                        ">
                        <el-col :span="8" style="text-align: center">
                            <el-statistic :value="``">
                                <template #title>
                                    <span class="statictitle">服务器状态</span>
                                </template>
                                <template #suffix>
                                    <el-tag
                                        :effect="rea.theme"
                                        v-if="data.online === true"
                                        type="success">
                                        在线
                                    </el-tag>
                                    <el-tag
                                        :effect="rea.theme"
                                        v-else
                                        type="danger">
                                        离线
                                    </el-tag>
                                </template>
                            </el-statistic>
                        </el-col>
                        <el-col :span="8" style="text-align: center">
                            <el-statistic :value="data.protocol_name || `-`">
                                <template #title>
                                    <span class="statictitle">服务器版本</span>
                                </template>
                            </el-statistic>
                        </el-col>
                        <el-col :span="8" style="text-align: center">
                            <el-statistic :value="players_online_ani">
                                <template #title>
                                    <span class="statictitle">在线人数</span>
                                </template>
                                <template #suffix>
                                    <span>
                                        / {{ Number.parseInt(players_max_ani) }}
                                    </span>
                                </template>
                            </el-statistic>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <br />
        <el-row style="height: 120px; display: flex; align-items: center">
            <el-col :span="24">
                <el-card>
                    <template #header>
                        <span>服务器 MOTD</span>
                    </template>
                    <span class="motd" id="linefirst"></span>
                    <span class="motd" id="linesecond"></span>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped lang="less">
.result-card-empty{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.avatarCard {
    width: 160px;
    height: 160px;
    div.avatar {
        position: relative;
        .el-skeleton__item {
            position: absolute;
            z-index: 1;
            width: 120px;
            height: 120px;
        }
        img {
            position: absolute;
            z-index: 2;
            border-radius: 4px;
            width: 120px;
            height: 120px;
        }
    }
}

.basicCard {
    height: 160px;
    span.statictitle {
        font-size: 24px;
    }
    .el-tag {
        transform: translateX(-3px);
    }
}

.motd {
    display: flex;
    justify-content: center;
    align-items: center;
    &#linesecond{
        margin-top: 12px;
    }
}
</style>
