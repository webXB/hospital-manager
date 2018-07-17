import Cookies from 'js-cookie'

const TOKEN = 'sid';
//获取token
export function getToken() {
  return Cookies.get(TOKEN);
}
//写入token
export function setToken(token) {
  return Cookies.set(TOKEN,token);
}
//删除token
export function removeToken() {
  return Cookies.remove(TOKEN);
}
