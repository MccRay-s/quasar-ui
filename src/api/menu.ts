import { apiClient } from 'src/utils/ApiClient';
import { SysMenu, RouterRest } from '../models/menu/Menu';

/**
 * 获取菜单路由
 * @returns
 */
export const getRouters = async (): Promise<SysMenu[]> => {
  const { data } = await apiClient.get<void, Record<'data', RouterRest>>('/getRouters');
  return data.data;
};
