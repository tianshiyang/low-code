import request from "../utils/request"

export function test(data: any) {
  return request({
    url: "api",
    method: "get",
    data: data
  })
}
