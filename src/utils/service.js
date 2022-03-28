import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'

let loadingInstance
// 创建一个 axios 实例
const service = axios.create({
  // baseURL: 'http://150.158.44.141:3000',
  // 部署在vercel上需要额外增加一个参数realIP
  baseURL: 'https://api.jinlx.cc',
  // baseURL: '/api',
  params: { realIP: '182.139.155.157' },
  timeout: 15000,
  // 允许携带cookie
  withCredentials: true
})

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // config.params.cookie = document.cookie
    loadingInstance = ElLoading.service({ background: '#ffffff' })
    return config
  },
  err => {
    // 对请求错误做些什么
    return Promise.reject(err)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    // 只要是 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    loadingInstance.close()
    return response.data
  },
  err => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什
    loadingInstance.close()
    if(err.response.status === 301)
      ElMessage.error('需要登录')
    return Promise.reject(err)
  }
)

export default service