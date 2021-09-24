import { getToken } from 'src/utils/auth';

export interface UserStateInterface {
  token: string;
  name: string,
  avatar: string,
  roles: string[],
  permissions: string[],
}

function state(): UserStateInterface {
  return {
    token: getToken(),
    name: 'test',
    avatar: '',
    roles: [],
    permissions: [],
  };
}

export default state;
