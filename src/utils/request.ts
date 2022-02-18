import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElLoading, ElNotification } from 'element-plus'
import { INotificationHandle } from 'element-plus/lib/el-notification/src/notification.type'

let Loading: INotificationHandle

axios.defaults.baseURL = "http://localhost:4000/api"

// 配置post请求默认请求头
axios.defaults.headers.post['Content-Type'] = "application/json"
// 创建axios实例
const server = axios.create({
  timeout: 1000, // 默认请求超时时间
})

// 添加请求拦截器
server.interceptors.request.use(
  (config: AxiosRequestConfig<any>) => {
    // get请求加token
    if (["get", "GET"].includes(<string>config.method)) {
      config.data.token = localStorage.getItem("token")
    }
    // post请求加token
    if (["post", "POST"].includes(<string>config.method)) {
      config.data = config.data + `&token=${localStorage.getItem("token")}`
    }
    // 请求加loading
    Loading = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    return config
  },
  // 请求失败
  err => {
    let str: string = `请求失败，${err}`
    Loading = ElNotification({
      title: '请求错误',
      message: str,
      type: 'error',
    })
    return Promise.reject(err)
  }
  )

// 响应拦截器
server.interceptors.response.use((res) => {
  Loading.close()
  return Promise.resolve(res.data.content)
}, err => {
  Loading.close()
  return Promise.reject(err)
})
export default server
