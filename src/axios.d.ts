import * as axios from 'axios'

declare module 'axios' {
  // response响应返回的数据接口
  interface AxiosInstance {
    <T>(config: AxiosRequestConfig): Promise<T>
  }
  // request 请求的接口
  interface AxiosRequestConfig {
    isMock?: boolean
    mock?: string
  }
}
