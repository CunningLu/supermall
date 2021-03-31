import { reactive, toRefs } from "vue"

export default function () {
  const backTopData = reactive({
    backTopVisible: false
  })

  const backTopControl = () => {
    backTopData.backTopVisible = document.documentElement.scrollTop > 1000
  }

  const backTop = () => {
    document.documentElement.scrollTop = 0
  }

  return {
    ...toRefs(backTopData),
    backTopControl,
    backTop
  }
}