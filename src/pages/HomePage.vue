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
  components: {
    TopNav,
    LeftContent,
    CenterContent,
    RightContent
  }
}
</script>
<style scoped>

.content {
  display: flex;       
  flex-direction: row;
  gap: 10px;            /* 자식 간 간격 */
  padding: 10px;
  margin-top: 8vh;
  height: calc(100vh - 8vh); /* 화면 높이에서 상단 네비게이션 제외한 영역 */
}

</style>