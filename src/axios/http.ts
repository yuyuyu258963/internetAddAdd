import axios , { AxiosError, AxiosInstance, Method } from 'axios';
import qs from 'qs'
import { notification } from 'antd';
import {rootURL, ServerCode, ServerCodeMap} from "./config"
import { RequestConfig, ResponseConfig, ResponseError } from './interface';


let PUBLIC_PATH_HOST = '';
const service: AxiosInstance = axios.create({
  baseURL: PUBLIC_PATH_HOST + rootURL,
  timeout: 20000,      // 请求超时
  withCredentials: true,  // 允许携带cookie
})

const source: {[key:string]: any} = {} ; //cancelToken 的存储
let requestList: string[] = [];
service.interceptors.request.use(
  (config: any) => {
    config.url = `/api${config.url}`;
    if (/get/i.test(config.method)) {
      // 检测是否存在该请求
      const requestIndex = requestList.findIndex( el => el === config.url );
      if (requestIndex > -1) {
        source[config.url]("终止请求");
        requestList.splice(requestIndex, 1);
      }
      config.cancelToken = new axios.CancelToken(function executor(c) {
        source[config.url] = c;
      })
      requestList.push(config.url);
    }
    return config;
  },
  error => {
    // 请求错误时做一些事
    return Promise.reject(error);
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    //  获取请求的api
    const request = response.config.url;
    const method = response.config.method;
    if (/get/i.test(method as Method)) {
      // 请求完成后，将此请求从请求列表中移除
      const requestIndex = requestList.findIndex(el => el === request) ;
      if (requestIndex > -1) {
        requestList.splice(requestIndex, 1);
        delete source[request as string];
      }
    }
    // 以下判断的是:接口的状态码( data.code )
    const res = response.data;
    if(res.code === ServerCode.SUCCESS) return response.data;
    return Promise.reject({ data: res, response });
  },
  err => {
    // 统一错误拦截
    return Promise.reject(err);
    
  }
)

function isResponseError<R>(x:any):ResponseError<R> {
  return x.data;
}
function isAxiosError<R>(x: any): x is AxiosError<R> {
  return x.response;
}

const errHandel: <R>(err: AxiosError<R> | ResponseError<R>) => Promise<R> = err => {
  // 判断上下文是接口状态码还是“HTTP状态码"
  let errResult = {};
  let code =  -1;
  let message = '';
  if (isAxiosError(err) && err.response) {
    code = err.response.status;
    message = ServerCodeMap[code];
  }
  if (isResponseError(err)) {
    // @ts-ignore:
    code = err?.data.code;
    // @ts-ignore:
    message = err?.data.message;
  }
  const ERR_MESSAGE = message || ServerCodeMap[code];
  switch (code) {
    case ServerCode.CONTINUE:
      notification.warning({
        message: ERR_MESSAGE
      });
      break;
    case ServerCode.WRONG_REQUEST: //TODO  // code 402 message弹窗(mbo写的是412，但是后端没有412的处理)
      notification.warning({
          message: message
      });
      break;
    default:
      notification.error({
          message: ERR_MESSAGE
      });
      console.error(message);
  }
  if (isResponseError(err)) {
    // @ts-ignore;
    errResult = err.data;
  }
  return Promise.reject(errResult);
}

const response: <R>(axiosObj: Promise<ResponseConfig<R>>) => Promise<R> = axiosObj => {
  return axiosObj.then(res => res.data).catch(err => errHandel(err));
}

/**
 * 四种请求方式
 * @param url       接口地址
 * @param data      接口参数（注：get后续将放入“含有params的对象”才能接到url；delete后续将放入“含有data属性的对象”才能通过payload传输）
 * @param headers   接口所需header配置
 * @param baseURL   接口所需网关
 */

export const get: <R>(req: RequestConfig) => Promise<R> = ({ url, data, headers, gateWay }) =>
response(
    service.get(url, {
        params: data,
        headers,
        // @ts-ignore
        gateWay,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false });
        }
    })
);
export const post: <R>(req: RequestConfig) => Promise<R> = ({ url, data, headers, gateWay }) =>
 // @ts-ignore
response(service.post(url, data, { headers, gateWay }));
export const put: <R>(req: RequestConfig) => Promise<R> = ({ url, data, headers, gateWay }) =>
 // @ts-ignore
response(service.put(url, data, { headers, gateWay }));
export const del: <R>(req: RequestConfig) => Promise<R> = ({ url, data, headers, gateWay }) =>
 // @ts-ignore
response(service.delete(url, { data, headers, gateWay }));

export default service;
