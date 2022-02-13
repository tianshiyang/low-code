import request from "../utils/request"

export function test(data: any) {
  console.log("test")
  return request({
    url: "api",
    method: "get",
    data: data
  })
}
