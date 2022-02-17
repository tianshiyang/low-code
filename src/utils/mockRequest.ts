import { AxiosRequestConfig } from "axios"
import request from "../utils/request"

interface MockRequest extends AxiosRequestConfig {
  isMock: boolean,
  mock: string
}

function mockRequest(params: MockRequest) {
  if (params.isMock) {
    params.url = params.mock
  }
  const {isMock, mock, ...data} = params
  console.log(data)
  return request(data)
}
export default mockRequest
