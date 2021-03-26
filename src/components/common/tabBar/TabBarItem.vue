<template>
  <div @click="tabBarClick"></div>
</template>

<script>
export default {
  name: '11',
  props: {
    path: String
  },
  data() {
    return {}
  },
  methods: {
    tabBarClick() {
      this.$router.replace(this.path)
    }
  }
}
</script>

<style>

</style>