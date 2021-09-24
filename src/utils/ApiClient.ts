import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Notify } from 'quasar';
import { getToken } from 'src/utils/auth';
import { ResponseBaseDate } from 'src/models/common/BaseCommon';

// headers
const headers: Readonly<Record<string, string | boolean>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Credentials': true,
  'X-Requested-With': 'XMLHttpRequest',
  Authorizatio: '',
};

class ApiClient {
  private instance: AxiosInstance | null = null;

  private get api(): AxiosInstance {
    return this.instance != null ? this.instance : this.initAPI();
  }

  initAPI() {
    const http = axios.create({
      baseURL: 'http://localhost:9080/api',
      headers,
      withCredentials: true,
    });

    http.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
      try {
        const token = getToken();
        if (token != null) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      } catch (error) {
        throw new Error('error');
      }
    }, (error) => Promise.reject(error));

    http.interceptors.response.use(
      (response: AxiosResponse) => {
        const data:ResponseBaseDate = response.data as ResponseBaseDate;
        if (data.code !== 200) {
          const message = data.msg || this.handleError(data.code);
          Notify.create({
            type: 'warning',
            message,
            position: 'top',
          });
          return Promise.reject(new Error(message));
        }
        return response;
      },
      (e) => {
        const error = e as Error;
        let { message } = error;
        if (message === 'Network Error') {
          message = '网络连接异常';
        } else if (message.includes('timeout')) {
          message = '请求超时';
        } else if (message.includes('Request failed with status code')) {
          message = `系统接口${message.substr(message.length - 3)}异常`;
        }
        Notify.create({
          type: 'warning',
          message,
          position: 'top',
        });
        return error;
      },
    );
    this.instance = http;
    return http;
  }

  request<T, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.api.request(config);
  }

  get<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.api.get<T, R>(url, config);
  }

  post<T, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.api.post<T, R>(url, data, config);
  }

  put<T, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.api.put<T, R>(url, data, config);
  }

  delete<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.api.delete<T, R>(url, config);
  }

  // eslint-disable-next-line class-methods-use-this
  private handleError(code: number): string {
    let message = '';
    switch (code) {
      case 500: {
        message = '服务器内部错误，请反馈给管理员';
        break;
      }
      case 403: {
        message = '当前操作没有权限';
        break;
      }
      case 401: {
        message = '认证失败，无法访问系统资源';
        break;
      }
      case 429: {
        message = '访问过于频繁';
        break;
      }
      default:
    }
    return message;
  }
}

export const apiClient = new ApiClient();
