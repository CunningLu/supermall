<template>
  <router-view #default="{ Component }">
    <keep-alive exclude="Detail">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <main-tab-bar />
</template>

<script>
import MainTabBar from '@/components/content/mainTabBar/MainTabBar.vue'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "assets/global.css";
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
