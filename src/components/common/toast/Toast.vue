<template>
  <div v-show="visible" class="toast">{{ message }}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // visible: {
    //   type: Boolean,
    //   default: false
    // }
  },
  setup() {
    const toastData = reactive({
      message: 'default message',
      visible: false
    })

    const show = (message, duration = 2000) => {
      message = message || 'default message'
      toastData.message = message
      toastData.visible = true
      setTimeout(() => {toastData.visible = false}, duration)
    }

    return {
      ...toRefs(toastData),
      show
    }
  }
}
</script>

<style scoped>
.toast {
  padding: 5px 5px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #aedd21;
}
</style>