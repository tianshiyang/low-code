import qs from "qs"
import { ReqRes } from "../req-res"
import request from "../utils/request"

// 登陆功能
export function login(data: any) {
  return request({
    url: "login",
    method: "get",
    data: data,
    isMock: true,
    mock: "http://yapi.honganhome.com/mock/9/api/get/stocktake/list.json"
  })
}

// 获取商品详情
export function getGoodsInfo(data: any) {
  return <Promise<ReqRes.ResListData>>request({
    url: "get/goods-info" + qs.stringify(data),
    method: "get",
    data: data,
    isMock: true,
    mock: "http://yapi.honganhome.com/mock/170/api/delivery/get/ticket/list.json"
  })
}
