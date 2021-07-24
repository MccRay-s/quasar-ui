import axios from 'axios';
import { Notify } from 'quasar';

import type {
  AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance,
} from 'axios';
// const baseUrl = 'http://localhost:8080/api';

const service: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-type': 'application/json',
  },
  timeout: 30000,
});

// request拦截器
service.interceptors.request.use((config:AxiosRequestConfig) => {
  // 是否需要设置 token
  // const isToken = (config.headers || {}).isToken === false;
  // if (getToken() && !isToken) {
  //   config.headers.Authorization = `Bearer ${getToken()}`; // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    // const url = 'qqq';
    // for (const propName of Object.keys(config.params)) {
    //   const value = config.params[propName];
    //   const part = `${encodeURIComponent(propName)}=`;

    //   if (value !== null && typeof (value) !== 'undefined') {
    //     if (typeof value === 'object') {
    //       for (const key of Object.keys(value)) {
    //         const params = `${propName}[${key}]`;
    //         const subPart = `${encodeURIComponent(params)}=`;
    //         url += `${subPart + encodeURIComponent(value[key])}&`;
    //       }
    //     } else {
    //       url += `${part + encodeURIComponent(value)}&`;
    //     }
    //   }
    // }
    // url = url.slice(0, -1);
    // config.params = {};
    // config.url = url;
  }
  return config;
}, (error : AxiosError) => {
  console.error(error);
  // const errStatus:number = error.response?.status || 0;
  // Notify.create({
  //   message: `请求错误:[${errStatus}]`,
  //   type: 'warning',
  // });
  // Promise.reject(error);
});

service.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(response);
    // const { message: msg, success } = data;
    // if (success) {
    //   return Promise.resolve(data);
    // }
    // message.error(msg);
    return Promise.resolve(response);
  },
  (error: AxiosError) => {
    if (error.response) {
      const status: number = error.response.status || -1;
      Notify.create({
        message: `请求错误:[${status}]`,
        type: 'warning',
      });
    }
    return Promise.resolve(error);
  },
);

export default service;
