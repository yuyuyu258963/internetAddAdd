import axios, { AxiosPromise } from "axios"
import { RootUrl } from "../../Constant";

axios.interceptors.response.use((res) => {
    return res;
  }, function (error:any) {
      console.dir(error);
      // if (301 === error.response.status) {
      //   (window as any).location = '/test';
      // } else {
      //   return Promise.reject(error);
      // }
    // (window as any).location = '/test';
    }
  )

/**
 * 获取图片验证码
 */
export const getImgUrl = ():AxiosPromise<any> => {
  return axios({
    method: "get",
    url: RootUrl + "loading/getImgUrl",
    headers: {
      "Content-Type": "*",

    },
  })
}

/**
 * 用于检查验证信息
 * @param {data}  data 验证要用的数据
 * @returns 请求的函数
 */
export const RunConfirm = (data:{dots:any, key:string}):AxiosPromise<any> => {
  return axios({
    headers: {
      'Content-Type': '*',
    },
    method: 'post',
    url: RootUrl+ 'loading/checkCap',
    data: JSON.stringify(data),
  })
}

/**
 * 用于验证用户的登录
 * @param {data} data ：{email,pwd,人机验证状态} 
 * @returns 
 */
export const RunLoading2 = (data:{email:string, pwd:string, status:string}) => {
  console.dir(data)
  return axios({
    method: "get",
    url: RootUrl + "loading/loading",
    headers: {
      "Content-Type": "*",
  },
    params: data
  })
}

