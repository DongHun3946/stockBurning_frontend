<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import './assets/styles.css';

export default {
  name: 'App',
};
</script>

<style>
  /* 전체 레이아웃 */
  #app {
    display: flex;
    flex-direction: column; /* 상단 네비게이션과 콘텐츠를 수직으로 나눔 */
    height: 95vh;
  }
</style>
