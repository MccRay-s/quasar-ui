import { ResponseBaseDate } from '../common/BaseCommon';

export interface Mate{
  icon: string,
  link: string,
  noCache: boolean
  title: string,
}

/**
 * 菜单信息
 */
export interface SysMenu {
  name: string,
  path: string,
  hidden: boolean,
  redirect: string
  component: string,
  alwaysShow: boolean,
  children: SysMenu[],
  meta: Mate,
}

/**
 * 路由列表
 */
export interface RouterRest extends ResponseBaseDate{
  data: SysMenu[]
}
