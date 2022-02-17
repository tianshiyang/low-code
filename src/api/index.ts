import mockRequest from "../utils/mockRequest"

export function test(data: any) {
  return mockRequest({
    url: "api",
    method: "get",
    data: data,
    isMock: true,
    mock: "http://yapi.honganhome.com/mock/9/api/get/stocktake/list.json"
  })
}
