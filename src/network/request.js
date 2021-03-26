import axios from 'axios'

export function request(config) {
  // 初始化：新建一个axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 3000
  })

  // 拦截：请求request
  instance.interceptors.request.use(conf => {
    return conf
  }, err => console.log(err))

  // 拦截：响应response
  instance.interceptors.response.use(result => {
    return result.data
  }, err => console.log(err))

  // 返回：发送真实请求
  return instance(config)
}