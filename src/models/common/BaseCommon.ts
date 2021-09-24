/**
 * 后端返回数据基础
 */
export interface ResponseBaseDate {
  code: number,
  msg: string
}

/**
 * 验证码数据模型
 */
export interface CaptchaImage extends ResponseBaseDate{
  icaptchaOnOffd: boolean;
  img: string;
  uuid: string;
}

/**
 * 登录请求参数
 */
export interface LoginBody {
  username: string;
  password: string;
  code: string,
  uuid: string
}

/**
 * 登录结果
 */
export interface LoginRest extends ResponseBaseDate{
  token: string;
}

/**
 * 部门信息
 */
export interface Dept{
  ancestors: null
  // children: []
  createBy: string,
  createTime: string,
  delFlag: string,
  deptId: number,
  deptName: string,
  email?: string,
  leader: string,
  orderNum: string,
  parentId: number,
  parentName?: string,
  phone: string,
  remark: string,
  // searchValue: null
  status: string,
  updateBy?: string,

}

/**
 * 用户信息
 */
export interface UserInfo {
  admin: boolean,
  avatar: string,
  createBy: string,
  createTime:string,
  delFlag:string,
  dept: Dept,
  deptId: number,
  email: string,
  loginDate: string,
  loginIp: string,
  nickName: string,
  // params: {}
  phonenumber: string,
  postIds?: number,
  remark: string,
  roleId?: number,
  roleIds?: string[]
  // roles: [,…]
  searchValue: string,
  sex: string,
  status: string,
  updateBy: string,
  updateTime: string,
  userId: number,
  userName: string,
}

/**
 * 用户返回信息
 */
export interface UserRest extends ResponseBaseDate{
  permissions: string[],
  roles: string[],
  user: UserInfo,
}
