<template>
    <div class="part1">
        <div class="title">
            <div class="title-1"></div>
            <div class="title-2"></div>
            <p class="title-3">실시간 커뮤니티 상승 의견이 많은 종목</p>
        </div>
        <div class="content">
            <li v-for="(dto, index) in BullishTop5Tickers" :key="dto.ticker" class="ticker-item">
                <span class="ticker-rank">{{ index + 1 }}.</span>
                <div class="ticker-content">
                    <div class="ticker-name">
                        {{ dto.ticker }}
                    </div>
                    <div class="ticker-empty"></div>
                    <div class="ticker-count">
                        <div class="section1" :class="{ 'big-font': dto.bullishCnt > dto.bearishCnt }">
                            <div class="section1-top">
                                상승
                            </div>
                            <div class="section1-bottom">
                                {{ dto.bullishCnt }}
                            </div>
                        </div>
                        <div class="section2">
                            <span v-if="dto.bullishCnt > dto.bearishCnt"> {{ '>'}} </span>
                            <span v-else-if="dto.bullishCnt < dto.bearishCnt"> {{ '<'}} </span>
                            <span v-else-if="dto.bullishCnt === dto.bearishCnt"> {{ '=' }} </span>
                        </div>
                        <div class="section3" :class="{ 'big-font': dto.bearishCnt > dto.bullishCnt }">
                            <div class="section3-top">
                                하락
                            </div>
                            <div class="section3-bottom">
                                {{ dto.bearishCnt }}
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "Discuss_part1",
    data() {
        return {
            BullishTop5Tickers: [],
        };
    },
    methods: {
        async getTop5Ticker() {
            const response = await axios.get("http://localhost:8081/api/bullish/top3");
            this.BullishTop5Tickers = response.data;
        }
    },
    mounted() {
        this.getTop5Ticker();
    },
};
</script>

<style scoped>
.part1 {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    color: #ffffff;
    background-color: #555454;
    border-radius: 30px;
    padding: 1% 3% 1% 3%;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
}

.title {
    flex: 1;
    color: #b4c5ee;
    display: flex;
    flex-direction: row;
    font-size: 16px;
    font-weight: bold;
    align-items: center;
    /* background-color: rgb(211, 158, 78); */
}
.title-1 {
    flex: 1;
    width: 20%;
    height: 40%;
    border-radius: 50%;
    background-color: #42ca54;
    
    display: flex;
    align-items: center;
    justify-content: center;
    animation: blink 2s infinite;
}
.title-2 {
    flex: 0.3;
    /* background-color: #b5c075; */
}
.title-3 {
    flex: 16;
    /* background-color: #d43131; */
}
.content {
    flex: 8;
    display: flex;
    flex-direction: column;
    /* background-color: rgb(176, 69, 185); */
}

.ticker-item {
    flex: 1;
    background-color: #3a3a3a;
    color: #f1f1f1;
    padding: 3%;
    margin: 1% auto;
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    font-size: 1.1em;
    transition: background-color 0.3s;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
}

.ticker-item:hover {
    background-color: #575757;
    cursor: pointer;
}

.ticker-rank {
    flex: 0.3;
    font-weight: bold;
    font-size: 30px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    /* background-color: #e68536; */
}

.ticker-content {
    flex: 2;
    /* background-color: #9640e6; */
    display: flex;
    flex-direction: column;
}

.ticker-name {
    flex: 1;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 1000;
    color: #c7c6c6;
    /* background-color: #d8c247; */
}
.ticker-empty{
    flex:0.4;
    /* background-color: #4f87ee; */
}
.ticker-count {
    flex: 2;
    font-weight: bold;
    /* background-color: #47d860; */
    display: flex;
    flex-direction: row;
}

.section1 {
    flex: 3;
    font-size: 15px;
    color: #d43131;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    /* background-color: #c95959; */
}

.section1-top {
    flex: 1;
    /* background-color: #bad362; */
}

.section1-bottom {
    flex: 1;
    /* background-color: #52704f; */
}

.section2 {
    flex: 1;
    /* background-color: #e2a140; */
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center; 
}

.section3 {
    flex: 3;
    display: flex;
    font-size: 15px;
    color: #4f87ee;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    /* background-color: #5683e4; */
}

.section3-top {
    flex: 1;
    /* background-color: #bad362; */
}

.section3-bottom {
    flex: 1;
    /* background-color: #52704f; */
}
.big-font {
    font-size: 23px;  /* 기존보다 더 큰 폰트 */
}
@keyframes blink {
    0% {
        opacity: 1; /* 완전 불투명 (표시됨) */
    }
    50% {
        opacity: 0; /* 완전 투명 (사라짐) */
    }
    100% {
        opacity: 1; /* 다시 나타남 */
    }
}
</style>