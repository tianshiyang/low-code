export namespace ReqRes {
  export interface ResponseResult<T = any> {
    success: boolean,
    content: T
  }

  // 数据列表类数据
  export interface ResListData {
    list: Array<Object>
    total: number
  }

}
