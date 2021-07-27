import axios from 'axios';
import { Notify } from 'quasar';
import { stringify } from 'qs';
import { getToken } from './auth';
import errorCode from './errorCode';

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: 'http://localhost:8080/api',
  // 超时
  timeout: 10000,
});
// request拦截器
service.interceptors.request.use((config) => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false;
  if (getToken() && !isToken) {
    config.headers.Authorization = `Bearer ${getToken()}`; // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = `${config.url}?`;
    const query = stringify(config.params);
    if (query.length) {
      url = `${url.split('?')[0]}?${query}`;
    } else {
      url = `${url.split('?')[0]}`;
    }
    config.params = {};
    config.url = url;
  }
  return config;
}, (error) => {
  Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use((res) => {
  // 未设置状态码则默认成功状态
  const code = res.data.code || 200;
  // 获取错误信息
  const msg = errorCode[code] || res.data.msg || errorCode.default;

  if (code === 401) {
    Notify.create({
      type: 'negative',
      message: '登录状态已过期!',
    });
    // MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
    //   confirmButtonText: '重新登录',
    //   cancelButtonText: '取消',
    //   type: 'warning',
    // }).then(() => {
    //   store.dispatch('LogOut').then(() => {
    //     location.href = '/index';
    //   });
    // }).catch(() => { });
    return Promise.reject(new Error(msg));
  }
  if (code === 500) {
    Notify.create({
      type: 'negative',
      message: msg,
    });
    return Promise.reject(new Error(msg));
  }
  if (code !== 200) {
    Notify.create({
      type: 'negative',
      message: msg,
    });
    return Promise.reject('error');
  }
  return res;
}, (error) => {
  let { message } = error;
  if (message === 'Network Error') {
    message = '后端接口连接异常';
  } else if (message.includes('timeout')) {
    message = '系统接口请求超时';
  } else if (message.includes('Request failed with status code')) {
    message = `系统接口${message.substr(message.length - 3)}异常`;
  }
  Notify.create({
    type: 'warning',
    message,
  });
  // console.error(message);
  return Promise.reject(error);
});

export default service;
