import { createVNode } from '@vue/runtime-core';
import { render } from '@vue/runtime-dom';
import Toast from './Toast.vue'

const toast = {}

toast.install = (app) => {
  console.log(app);
  // 组件构造器
  // const toastConstructor = app.extend(Toast)

  Toast.show = ()=> {console.log(111);}

  const div = document.createElement('div')

  // 渲染虚拟节点为真实结点，并挂载到真实 dom 中
  render(createVNode(Toast), div)
  document.body.appendChild(div)

  

  app.config.globalProperties.$toast1 = Toast
} 

export default toast