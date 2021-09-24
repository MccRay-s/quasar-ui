import { Cookies } from 'quasar';

const TokenKey = 'Admin-Token';

export function getToken():string {
  return Cookies.get(TokenKey);
}

export function setToken(token:string):void {
  Cookies.set(TokenKey, token);
}

export function removeToken(): void {
  Cookies.remove(TokenKey);
}
