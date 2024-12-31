<template>
  <div class="search-index">
    <div class="header">
      <h2>검색량 급상승한 티커</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotSearch'
};
</script>

<style scoped>
.search-index {
  font-size: 1em;
  color: #ffffff;
  background-color: #464646; 
  border-radius: 30px; 
  padding: 2% 3% 2% 3%; 
  width: 50%; 
  text-align: left; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5); 
  line-height: 0.3; 
}

.header {
  font-size: 0.8em;
  border-bottom: 3px solid #ffffff;
}
</style>