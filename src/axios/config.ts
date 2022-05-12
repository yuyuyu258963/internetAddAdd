
// 当前的接口联调环境
export const isLocal = process.env.NODE_ENV === "development";
export const isDev = false;     // 连接开发环境 设为true
export const isMock =false;     // 使用本地数据时为true
export const isTest = false;    //使用nginx联调时， 设为false， 使用proxy联调时， 设为true

export const rootURL = isLocal ? (isMock ? '/mock' : isTest ? '/mock/test' : isDev ? '/mock/dev' : '') : '';


export const ServerCode = {
  SUCCESS:        200,
  CONTINUE:       400,
  WRONG_PARAM:    401,
  WRONG_REQUEST:  402,
  WRONG_TOKEN:    403,
  FORBIDDEN: 403,
}

export const ServerCodeMap =  {
  [ServerCode.SUCCESS]: "成功",
  [ServerCode.CONTINUE]: "继续",
  [ServerCode.WRONG_PARAM]: "参数格式出错",
  [ServerCode.WRONG_REQUEST]: "请求出错",
  [ServerCode.WRONG_TOKEN]: "拒绝访问", 
  [ServerCode.FORBIDDEN]: "请求地址出错", 
  
}
