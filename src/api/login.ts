import { apiClient } from 'src/utils/ApiClient';
import {
  CaptchaImage, LoginRest, LoginBody, UserRest,
} from 'src/models/common/BaseCommon';

/**
 * 获取验证码
 * @returns
 */
export const getCodeImg = async (): Promise<CaptchaImage> => {
  const { data } = await apiClient.get<void, Record<'data', CaptchaImage>>('/captchaImage');
  return data;
};

/**
 * 用户登录
 * @param body
 * @returns
 */
export const login = async (body: LoginBody): Promise<LoginRest> => {
  const { data } = await apiClient.post<LoginBody, Record<'data', LoginRest>>('/login', body);
  return data;
};

/**
 * 获取用户详细信息
 * @returns 用户信息
 */
export const getInfo = async (): Promise<UserRest> => {
  const { data } = await apiClient.get<void, Record<'data', UserRest>>('/getInfo');
  return data;
};
