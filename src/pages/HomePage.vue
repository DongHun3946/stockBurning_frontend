<template>
  <TopNav />
  <div class="content">
    <LeftContent />
    <CenterContent />
    <RightContent />
  </div>
</template>

<script>
import TopNav from '../components/TopNav.vue'
import LeftContent from '../components/contents/LeftContent.vue'
import CenterContent from '../components/contents/CenterContent.vue'
import RightContent from '../components/contents/RightContent.vue'


export default {
  name: 'HomePage',
  props: ['ticker', 'type'],

  components: {
    TopNav,
    LeftContent,
    CenterContent,
    RightContent
  },
  data(){
    return {
      
    }
  },
  watch: {
    '$route.query': {
      handler(newQuery) { // 쿼리파라미터가 변경될 때마다 호출되는 함수
        if (newQuery.ticker === "nasdaq"){
          this.fetchDefaultData(newQuery.type);
        }
        else{
          this.fetchStockData(newQuery.ticker, newQuery.type);
        }
      },
    }
  },
  mounted() {
    
    this.$store.dispatch("refresh");
    if(this.ticker === "nasdaq" || typeof this.ticker ==="undefined"){
      this.fetchDefaultData(this.type);
    }
    else{
      this.fetchStockData(this.ticker, this.type);
    }
  },
  methods: {
    fetchDefaultData(type) {
      this.$store.dispatch("fetchDefaultInfo", { type });
    },
    fetchStockData(ticker, type) {
      this.$store.dispatch("fetchStockInfo", { ticker: ticker, type : type });
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: row;
  gap: 10px;
  /* 자식 간 간격 */
  padding: 10px;
  margin-top: 8vh;
  height: 88vh;
}
</style>